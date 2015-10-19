<?php
/**
* Part of the Caffeinated PHP packages.
*
* MIT License and copyright information bundled with this package in the LICENSE file
 */
namespace Radic\Laraval\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * This is the Laraval.
 *
 * @package        Radic\Laraval
 * @author    Caffeinated Dev Team
 * @copyright Copyright (c) 2015, Caffeinated
 * @license   https://tldrlegal.com/license/mit-license MIT License
 */
class Laraval extends Facade
{
    /**
     * {@inheritDoc}
     */
    public static function getFacadeAccessor()
    {
        return 'laraval';
    }
}
