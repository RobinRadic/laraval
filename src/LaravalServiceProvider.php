<?php

namespace Radic\Laraval;

use Caffeinated\Beverage\ServiceProvider;
use Collective\Html\HtmlBuilder;
use Illuminate\Contracts\Foundation\Application;

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
        \Caffeinated\Beverage\BeverageServiceProvider::class,
        \Radic\Laraval\Providers\ConsoleServiceProvider::class,
        \Radic\Laraval\Providers\RouteServiceProvider::class
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

        if (class_exists('Collective\Html\HtmlServiceProvider') && $this->app->make('config')->get('laraval.enable_form_builder')) {
            $app->register('Collective\Html\HtmlServiceProvider');
            $app->booted(function () use ($app) {
                $this->registerFormBuilder();
            });
        }

    }

    protected function registerFormBuilder()
    {
        $app = $this->app;
        $app->forgetInstance('form');
        if (!$app->bound('html')) {
            $this->app->singleton('html', function ($app) {
            
                return new HtmlBuilder($app['url']);
            });
        }
        $app->singleton('form', function (Application $app) {
            return new Html\FormBuilder($app['html'], $app['url'], $app['session'], $app['laraval']);
        });
        $app->alias('form', Html\FormBuilder::class);

    }
}
