<?php
/**
 * Part of the Caffeinated PHP packages.
 *
 * MIT License and copyright information bundled with this package in the LICENSE file
 */
namespace Radic\Laraval;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Contracts\Config\Repository;
use Illuminate\Contracts\Container\Container;
use Illuminate\Contracts\Routing\UrlGenerator;
use Radic\Laraval\Contracts\Factory as LaravalContract;

/**
 * This is the JQValidation.
 *
 * @package        Radic\Laraval
 * @author         Caffeinated Dev Team
 * @copyright      Copyright (c) 2015, Caffeinated
 * @license        https://tldrlegal.com/license/mit-license MIT License
 * @method string local(string $selector, array $opts = [], array $rules = [], array $data = []) - shorthand for make($strategy, $rules)->create($selector, $options, $data)
 * @method string ajax(string $selector, array $opts = [], array $rules = [], array $data = []) - shorthand for make($strategy, $rules)->create($selector, $options, $data)
 */
class Factory implements LaravalContract
{
    /**
     * @var \Illuminate\Contracts\Container\Container
     */
    protected $container;

    /**
     * @var \Sebwite\Support\Filesystem
     */
    protected $files;

    /**
     * @var array
     */
    protected $laravalConfig;

    /**
     * @var \Illuminate\Contracts\Routing\UrlGenerator
     */
    protected $url;

    /**
     * @var mixed
     */
    protected $strategies;

    protected $initView = 'laraval::init';

    /** Instantiates the class
     *
     * @param \Illuminate\Contracts\Container\Container  $container
     * @param \Sebwite\Support\Filesystem           $files
     * @param \Illuminate\Contracts\Config\Repository    $configRepository
     * @param \Illuminate\Contracts\Routing\UrlGenerator $url
     */
    public function __construct(Container $container, Filesystem $files, Repository $configRepository, UrlGenerator $url)
    {
        $this->container     = $container;
        $this->files         = $files;
        $this->laravalConfig = $configRepository->get('laraval');
        $this->url           = $url;

        $this->strategies = $this->config('strategies');
    }

    /**
     * config
     *
     * @param null $key
     * @param null $default
     * @return mixed
     */
    public function config($key = null, $default = null)
    {
        return $key ? array_get($this->laravalConfig, $key, $default) : $this->laravalConfig;
    }

    /**
     * Create new validation using the given strategy
     *
     * @param       $strategy
     * @param array $rules
     * @return \Radic\Laraval\Strategies\ValidationStrategy
     */
    public function make($strategy, array $rules = [ ])
    {
        return $this->container->make($this->strategies[ $strategy ], [
            'factory'   => $this,
            'container' => $this->container,
            'rules'     => $rules
        ]);
    }

    /**
     * Returns javascript code that will extend the default settings on $.validator.defaults
     *
     * @param array $defaults
     * @return string
     */
    public function init($defaults = [ ])
    {
        $defaults = array_replace_recursive(
            $this->config('client_defaults'),
            $defaults
        );

        return view($this->initView, compact('defaults'))->render();
    }

    /**
     * Shorthand for make($strategy, $rules)->create($selector, $options)
     *
     * @param       $strategy
     * @param       $selector
     * @param array $rules
     * @param array $options
     * @return string
     */
    public function create($strategy, $selector, array $rules = [ ], array $options = [ ])
    {
        return $this->make($strategy, $rules)->create($selector, $options);
    }

    /**
     * Adds a new strategy
     *
     * @param $name
     * @param $strategyClass
     */
    public function extend($name, $strategyClass)
    {
        $this->strategies[ $name ] = $strategyClass;
    }

    /**
     * Checks if a strategy exists
     *
     * @param $name
     * @return bool
     */
    public function hasStrategy($name)
    {
        return isset($this->strategies[ $name ]);
    }



    /**
     * Dynamically call the default driver instance.
     *
     * @param  string  $method
     * @param  array   $parameters
     * @return mixed
     */
    public function __call($method, $parameters)
    {
        //$fa->local(0=$selector, 1=$opts = [], 2=$rules = [], 3=$data = []);
        if ($this->hasStrategy($method)) {
            $selector = $parameters[0];
            $options = isset($parameters[1]) ? $parameters[1] : [];
            $rules = isset($parameters[2]) ? $parameters[1] : [];
            $data = isset($parameters[3]) ? $parameters[1] : [];
            return $this->make($method, $rules)->create($selector, $options, $data);
        } else {
            throw new \BadMethodCallException("Method [{$method}] does not exist. Neither does a validation strategy with this name");
        }
    }

    /**
     * get initView value
     *
     * @return string
     */
    public function getInitView()
    {
        return $this->initView;
    }

    /**
     * Set the initView value
     *
     * @param string $initView
     * @return Factory
     */
    public function setInitView($initView)
    {
        $this->initView = $initView;

        return $this;
    }
}
