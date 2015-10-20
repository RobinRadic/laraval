<?php
/**
 * Part of the Caffeinated PHP packages.
 *
 * MIT License and copyright information bundled with this package in the LICENSE file
 */
namespace Radic\Laraval;

use Caffeinated\Beverage\Filesystem;
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
 */
class Factory implements LaravalContract
{
    /**
     * @var \Illuminate\Contracts\Container\Container
     */
    protected $container;

    /**
     * @var \Caffeinated\Beverage\Filesystem
     */
    protected $files;

    /**
     * @var \Illuminate\Contracts\Config\Repository
     */
    protected $configRepository;

    /**
     * @var \Illuminate\Contracts\Routing\UrlGenerator
     */
    protected $url;

    /**
     * @var mixed
     */
    protected $strategies;

    /** Instantiates the class
     *
     * @param \Illuminate\Contracts\Container\Container  $container
     * @param \Caffeinated\Beverage\Filesystem           $files
     * @param \Illuminate\Contracts\Config\Repository    $configRepository
     * @param \Illuminate\Contracts\Routing\UrlGenerator $url
     */
    public function __construct(Container $container, Filesystem $files, Repository $configRepository, UrlGenerator $url)
    {
        $this->container        = $container;
        $this->files            = $files;
        $this->configRepository = $configRepository;
        $this->url              = $url;

        $this->strategies = $this->config('modes');
    }


    /**
     * getConfig
     *
     * @return mixed
     */
    protected function getConfig()
    {
        $config = $this->configRepository->get('laraval');
        foreach ($config[ 'routes' ] as $id => &$routeName) {
            $routeName = $this->url->route($routeName);
        }

        return $config;
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
        return $key ? array_get($this->getConfig(), $key, $default) : $this->getConfig();
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
            'factory' => $this,
            'rules'   => $rules
        ]);
    }

    /**
     * init the validator with defaults
     */
    public function init($defaults = [])
    {
        $defaults = array_replace_recursive(
            $this->config('client_defaults'),
            $defaults
        );
        return view('laraval::init', compact('defaults'));
    }

    public function create($strategy, $selector, array $rules = [ ], array $options = [ ])
    {

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
     * form
     *
     * @return \Radic\Laraval\Html\FormBuilder
     */
    public function form()
    {
        return $this->container->make('form');
    }
}
