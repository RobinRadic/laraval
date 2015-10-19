<?php

namespace Radic\Laraval\Providers;

use Caffeinated\Beverage\ConsoleServiceProvider as BaseConsoleProvider;

/**
* This is the ConsoleServiceProvider.
*
* @author        Caffeinated
* @copyright  Copyright (c) 2015, Caffeinated
* @license      https://tldrlegal.com/license/mit-license MIT
* @package      Radic\Laraval
*/
class ConsoleServiceProvider extends BaseConsoleProvider
{
    /**
     * @var  string
     */
    protected $namespace = 'Radic\\Laraval\\Console';

    /**
     * @var  string
     */
    protected $prefix = 'radic.laraval.commands.';

    /**
     * @var  array
     */
    protected $commands = [
        'test'   => 'Test'
    ];
}
