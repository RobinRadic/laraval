<?php
/**
 * Part of the Caffeinated PHP packages.
 *
 * MIT License and copyright information bundled with this package in the LICENSE file
 */
namespace Radic\Laraval\Traits;

/**
 * This is the ValidatesWithLaravel.
 *
 * @author    Caffeinated Dev Team
 * @copyright Copyright (c) 2015, Caffeinated
 * @license   https://tldrlegal.com/license/mit-license MIT License
 */
trait ValidatesWithLaraval
{
    /**
     * getLaravalFactory
     *
     * @return \Radic\Laraval\Contracts\Factory
     */
    protected function getLaravalFactory()
    {
        return app('Radic\Laraval\Contracts\Factory');
    }

    /**
     * getLaraval
     *
     * @param null  $mode
     * @param array $rules
     * @return \Radic\Laraval\ValidationMode
     * @throws \Exception
     */
    protected function makeLaraval($mode, array $rules = [ ])
    {
        return $this->getLaravalFactory()->make($mode, $rules);
    }
}
