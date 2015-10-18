<?php
/**
 * Part of the Caffeinated PHP packages.
 *
 * MIT License and copyright information bundled with this package in the LICENSE file
 */
namespace Radic\LaravelJqueryValidation;

use Caffeinated\Beverage\Arr;
use Caffeinated\Beverage\Filesystem;
use Caffeinated\Beverage\Path;
use Radic\LaravelJqueryValidation\Contracts\Laraval as JQValidationContract;

/**
 * This is the JQValidation.
 *
 * @package        Radic\LaravelJqueryValidation
 * @author         Caffeinated Dev Team
 * @copyright      Copyright (c) 2015, Caffeinated
 * @license        https://tldrlegal.com/license/mit-license MIT License
 */
class Laraval implements JQValidationContract
{
    protected $initialised;

    /**
     * @var array
     */
    protected $messages;

    /**
     * @var \Caffeinated\Beverage\Filesystem
     */
    protected $fs;

    /** Instantiates the class */
    public function __construct(Filesystem $fs)
    {
        $this->initialised = false;
        $this->fs = $fs;
        $this->loadMessages();
    }

    public function init($force = false)
    {
        if (!$this->initialised || $force === true) {
            $this->initialised = true;

            return view('laravel-jquery-validation::init', [
                'instance' => $this,
                'messages' => json_encode(static::flatten($this->messages)),
                'config'   => json_encode($this->getConfig())
            ])->render();
        }
        return '';
    }


    protected static function flatten($array, $prepend = '')
    {
        $results = [];

        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $results = array_merge($results, static::flatten($value, $prepend.$key.'_'));
            } else {
                $results[$prepend.$key] = $value;
            }
        }

        return $results;
    }

    /**
     * loadMessages
     *
     * @param array  $extraLocales
     * @param string $langsPath
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function loadMessages(array $extraLocales = [ ], $langsPath = 'resources/lang')
    {
        $this->messages = [ ];
        $langs          = array_merge([ config('app.locale') ], $extraLocales, ['en' ]);
        foreach ($langs as $lang) {
            $path = Path::join($langsPath, $lang, 'validation.php');
            $path = base_path($path);
            if ($this->fs->exists($path)) {
                $this->messages = array_replace_recursive($this->messages, $this->fs->getRequire($path));
            }
        }
    }

    /**
     * ajax
     *
     * @param array $rules
     * @return string
     */
    public function ajax(array $rules = [ ])
    {
        // laravel-jquery-validation::ajax.validate
        return json_encode([
            'rules'    => $rules,
            'method'   => 'ajax',
            'config'   => $this->getConfig()
        ]);
    }

    public function local(array $rules = [ ])
    {

    }

    /**
     * getConfig
     *
     * @return mixed
     */
    protected function getConfig()
    {
        $config = config('laravel-jquery-validation');
        foreach ($config[ 'routes' ] as $id => $routeName) {
            $config[ 'routes' ][ $id ] = route($routeName);
        }

        return $config;
    }
}
