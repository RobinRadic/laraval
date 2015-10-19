<?php
/**
 * Part of the Caffeinated PHP packages.
 *
 * MIT License and copyright information bundled with this package in the LICENSE file
 */
namespace Radic\Laraval;

use Caffeinated\Beverage\Path;

/**
 * This is the LocalValidationMode.
 *
 * @package        Radic\Laraval
 * @author         Caffeinated Dev Team
 * @copyright      Copyright (c) 2015, Caffeinated
 * @license        https://tldrlegal.com/license/mit-license MIT License
 */
class LocalValidationMode extends ValidationMode
{
    protected $messages;

    protected $viewFile = 'laraval::init-local';

    public function init(array $options = [ ], $force = false)
    {
        $this->loadMessages();

        return parent::init(array_replace_recursive([
            'messages' => static::flatten($this->messages)
        ], $options), $force);
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
        $langs          = array_merge([ config('app.locale') ], $extraLocales, [ 'en' ]);
        foreach ($langs as $lang) {
            $path = Path::join($langsPath, $lang, 'validation.php');
            $path = base_path($path);
            if ($this->files->exists($path)) {
                $this->messages = array_replace_recursive($this->messages, $this->files->getRequire($path));
            }
        }
    }


    protected static function flatten($array, $prepend = '')
    {
        $results = [ ];

        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $results = array_merge($results, static::flatten($value, $prepend . $key . '_'));
            } else {
                $results[ $prepend . $key ] = $value;
            }
        }

        return $results;
    }
}
