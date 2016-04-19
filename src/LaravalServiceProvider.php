<?php

namespace Radic\Laraval;

use Sebwite\Support\ServiceProvider;

/**
 * The main service provider
 *
 * @author        Caffeinated
 * @copyright     Copyright (c) 2015, Caffeinated
 * @license       https://tldrlegal.com/license/mit-license MIT
 * @package       Radic\Laraval
 */
class LaravalServiceProvider extends ServiceProvider
{
    protected $dir = __DIR__;

    protected $configFiles = [ 'laraval' ];

    protected $viewDirs = [ 'views' => 'laraval' ];

    protected $assetDirs = [ 'assets' => 'laraval' ];

    protected $providers = [
        Providers\RouteServiceProvider::class
    ];

    protected $provides = [ 'laraval' ];

    protected $singletons = [
        'laraval' => Factory::class
    ];

    protected $aliases = [
        'laraval' => Contracts\Factory::class
    ];


    /**
     * {@inheritdoc}
     */
    public function boot()
    {
        $app = parent::boot();
    }

    /**
     * {@inheritdoc}
     */
    public function register()
    {
        $app = parent::register();

    }
}
