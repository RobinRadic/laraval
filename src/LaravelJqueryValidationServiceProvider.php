<?php

namespace Radic\LaravelJqueryValidation;

use Caffeinated\Beverage\ServiceProvider;

/**
* The main service provider
*
* @author        Caffeinated
* @copyright  Copyright (c) 2015, Caffeinated
* @license      https://tldrlegal.com/license/mit-license MIT
* @package      Radic\LaravelJqueryValidation
*/
class LaravelJqueryValidationServiceProvider extends ServiceProvider
{
    protected $dir = __DIR__;

    protected $configFiles = [ 'radic.laravel-jquery-validation' ];

    protected $providers = [
        \Caffeinated\Beverage\BeverageServiceProvider::class,
        \Radic\LaravelJqueryValidation\Providers\ConsoleServiceProvider::class
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
