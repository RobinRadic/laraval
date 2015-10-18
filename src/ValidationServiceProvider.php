<?php

namespace Radic\LaravelJqueryValidation;

use Caffeinated\Beverage\ServiceProvider;

/**
 * The main service provider
 *
 * @author        Caffeinated
 * @copyright     Copyright (c) 2015, Caffeinated
 * @license       https://tldrlegal.com/license/mit-license MIT
 * @package       Radic\LaravelJqueryValidation
 */
class ValidationServiceProvider extends ServiceProvider
{
    protected $dir = __DIR__;

    protected $configFiles = [ 'laravel-jquery-validation' ];

    protected $viewDirs = [ 'views' => 'laravel-jquery-validation' ];

    protected $assetDirs = [ 'assets' => 'laravel-jquery-validation' ];

    protected $providers = [
        \Caffeinated\Beverage\BeverageServiceProvider::class,
        \Radic\LaravelJqueryValidation\Providers\ConsoleServiceProvider::class,
        \Radic\LaravelJqueryValidation\Providers\RouteServiceProvider::class
    ];

    protected $provides = [ 'laraval' ];

    protected $singletons = [
        'laraval' => Laraval::class
    ];

    protected $aliases = [
        'laraval' => Contracts\Laraval::class
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
