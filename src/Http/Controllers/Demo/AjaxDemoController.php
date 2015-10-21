<?php
/**
 * Part of the Caffeinated PHP packages.
 *
 * MIT License and copyright information bundled with this package in the LICENSE file
 */
namespace Radic\Laraval\Http\Controllers\Demo;

use Illuminate\Http\Request;

/**
 * This is the DemoController.
 *
 * @package        Radic\Laraval
 * @author         Caffeinated Dev Team
 * @copyright      Copyright (c) 2015, Caffeinated
 * @license        https://tldrlegal.com/license/mit-license MIT License
 */
class AjaxDemoController extends DemoController
{
    public function show()
    {
        return view('laraval::demo.ajax', [
            'current' => 'ajax',
            'rules' => $this->rules
        ]);
    }

    public function ajaxValidate(Request $request)
    {
        return $this->laraval->make('ajax', $this->rules)->validate($request);
    }
}
