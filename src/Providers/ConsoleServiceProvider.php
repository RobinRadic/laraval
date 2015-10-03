<?php

namespace Radic\LaravelJqueryValidation\Providers;

use Caffeinated\Beverage\ConsoleServiceProvider as BaseConsoleProvider;

/**
* This is the ConsoleServiceProvider.
*
* @author        Caffeinated
* @copyright  Copyright (c) 2015, Caffeinated
* @license      https://tldrlegal.com/license/mit-license MIT
* @package      Radic\LaravelJqueryValidation
*/
class ConsoleServiceProvider extends BaseConsoleProvider
{
    /**
     * @var  string
     */
    protected $namespace = 'Radic\\LaravelJqueryValidation\\Console';

    /**
     * @var  string
     */
    protected $prefix = 'radic.laravel-jquery-validation.commands.';

    /**
     * @var  array
     */
    protected $commands = [
        'test'   => 'LaravelJqueryValidationTest'
    ];
}
