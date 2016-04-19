<?php
/**
 * Part of the Caffeinated PHP packages.
 *
 * MIT License and copyright information bundled with this package in the LICENSE file
 */
namespace Radic\Laraval\Contracts;

/**
 * This is the JQValidation.
 *
 * @package        Radic\Laraval
 * @author         Caffeinated Dev Team
 * @copyright      Copyright (c) 2015, Caffeinated
 * @license        https://tldrlegal.com/license/mit-license MIT License
 */
interface Factory
{

    /**
     * Create new validation using the given strategy
     *
     * @param       $strategy
     * @param array $rules
     * @return \Radic\Laraval\Strategies\ValidationStrategy
     */
    public function make($strategy, array $rules = []);

    /**
     * extend method
     *
     * @param $name
     * @param $classPath
     *
     * @return mixed
     */
    public function extend($name, $classPath);

    /**
     * config
     *
     * @param null $key
     * @param null $default
     * @return mixed
     */
    public function config($key = null, $default = null);

    /**
     * Returns javascript code that will extend the default settings on $.validator.defaults
     *
     * @param array $defaults
     * @return string
     */
    public function init($defaults = [ ]);

    /**
     * Shorthand for make($strategy, $rules)->create($selector, $options)
     *
     * @param       $strategy
     * @param       $selector
     * @param array $rules
     * @param array $options
     * @return string
     */
    public function create($strategy, $selector, array $rules = [ ], array $options = [ ]);

    /**
     * Checks if a strategy exists
     *
     * @param $name
     * @return bool
     */
    public function hasStrategy($name);

    /**
     * get initView value
     *
     * @return string
     */
    public function getInitView();

    /**
     * Set the initView value
     *
     * @param string $initView
     * @return Factory
     */
    public function setInitView($initView);
}
