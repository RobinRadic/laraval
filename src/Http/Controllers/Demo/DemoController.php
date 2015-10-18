<?php
/**
 * Part of the Caffeinated PHP packages.
 *
 * MIT License and copyright information bundled with this package in the LICENSE file
 */
namespace Radic\LaravelJqueryValidation\Http\Controllers\Demo;

use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Radic\LaravelJqueryValidation\Contracts\Laraval;

/**
 * This is the DemoController.
 *
 * @package        Radic\LaravelJqueryValidation
 * @author         Caffeinated Dev Team
 * @copyright      Copyright (c) 2015, Caffeinated
 * @license        https://tldrlegal.com/license/mit-license MIT License
 */
class DemoController extends Controller
{
    use ValidatesRequests;

    /**
     * @var \Radic\LaravelJqueryValidation\Laraval|\Radic\LaravelJqueryValidation\Contracts\Laraval
     */
    protected $jqValidation;

    /**
     * @var array
     */
    protected $rules = [
        'title' => 'required|max:15|alpha_num',
        'body'  => 'required|max:255|alpha_dash',
        'json' => 'json',
        'ip' => 'ip',
        'age' => 'required|between:18,30|numeric',
        'born' => 'required|date|after:1/1/2000',
        'died' => 'required|date|after:born',
        'between_dates' => 'between:1/1/2000,1/1/2010|date',

        'email' => 'required|email',
        'url' => 'required|url',
        'is_admin' => 'boolean',
        'active' => 'boolean'
    ];

    /** Instantiates the class
     *
     * @param \Radic\LaravelJqueryValidation\Contracts\Laraval $jqValidation
     */
    public function __construct(Laraval $laraval)
    {
        $this->laraval = $laraval;
    }

    public function local()
    {
        return view('laravel-jquery-validation::demo', [
            'laraval' => $this->laraval->ajax($this->rules)
        ]);
    }

    public function ajax()
    {
        return view('laravel-jquery-validation::demo', [
            'laraval' => $this->laraval->ajax($this->rules)
        ]);
    }

    public function store(Request $request)
    {
        $this->validate($request, $this->rules);

        ///ddd($this, $this->errorBag());

        return \Response::json($this->errorBag());
        //$this->show();
    }

    public function demo2()
    {

        return view('laravel-jquery-validation::demo2', [
            'rules' => $this->rules
        ]);
    }
}
