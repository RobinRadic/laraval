<?php
/**
 * Part of the Caffeinated PHP packages.
 *
 * MIT License and copyright information bundled with this package in the LICENSE file
 */
namespace Radic\Laraval\Http\Controllers\Demo;

/**
 * This is the DemoController.
 *
 * @package        Radic\Laraval
 * @author         Caffeinated Dev Team
 * @copyright      Copyright (c) 2015, Caffeinated
 * @license        https://tldrlegal.com/license/mit-license MIT License
 */
class LocalDemoController extends DemoController
{
    public function __construct()
    {
        parent::__construct('local');
    }

    public function show()
    {
        return view('laraval::demo.local', [
            'current' => 'local',
            'laraval' => $this->laraval
        ]);
    }
}
