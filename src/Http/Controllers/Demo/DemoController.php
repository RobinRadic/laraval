<?php
/**
 * Part of the Caffeinated PHP packages.
 *
 * MIT License and copyright information bundled with this package in the LICENSE file
 */
namespace Radic\Laraval\Http\Controllers\Demo;

use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Radic\Laraval\Traits\ValidatesWithLaraval;

/**
 * This is the DemoController.
 *
 * @package        Radic\Laraval
 * @author         Caffeinated Dev Team
 * @copyright      Copyright (c) 2015, Caffeinated
 * @license        https://tldrlegal.com/license/mit-license MIT License
 */
class DemoController extends Controller
{
    use ValidatesRequests;
    use ValidatesWithLaraval;

    /**
     * @var array
     */
    protected $rules = [
        'title'         => 'required|max:15|alpha_num',
        'body'          => 'required|max:255|alpha_dash',
        'json'          => 'json',
        'ip'            => 'ip',
        'age'           => 'required|between:18,30|numeric',
        'born'          => 'required|date|after:1/1/2000',
        'died'          => 'required|date|after:born',
        'between_dates' => 'after:1/1/2000|before:1/1/2010|date',

        'email'    => 'required|email',
        'url'      => 'required|url',
        'is_admin' => 'boolean',
        'active'   => 'boolean'
    ];

    /**
     * @var \Radic\Laraval\ValidationMode
     */
    protected $laraval;

    public function __construct($mode)
    {
        $this->laraval = $this->makeLaraval($mode, $this->rules);
    }

    public function store(Request $request)
    {
        $this->validate($request, $this->rules);

        return \Response::json($this->errorBag());
    }
}
