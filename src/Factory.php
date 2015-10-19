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

    protected $configRepository;

    protected $url;

    protected $modes;

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

        $this->modes = $this->config('modes');
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
     * Create new validation mode
     *
     * @param       $mode
     * @param array $rules
     * @return \Radic\Laraval\ValidationMode
     */
    public function make($mode, array $rules = [ ])
    {
        return $this->container->make($this->modes[ $mode ], [
            'factory' => $this,
            'rules'   => $rules
        ]);
    }

    public function extend($name, $modeClass)
    {
        $this->modes[ $name ] = $modeClass;
    }

    public function hasMode($name)
    {
        return isset($this->modes[ $name ]);
    }
}
