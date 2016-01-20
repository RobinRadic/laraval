<?php
/**
 * Part of the Caffeinated PHP packages.
 *
 * MIT License and copyright information bundled with this package in the LICENSE file
 */
namespace Radic\Laraval\Strategies;

use Sebwite\Support\Path;

/**
 * This is the LocalValidationMode.
 *
 * @package        Radic\Laraval
 * @author         Caffeinated Dev Team
 * @copyright      Copyright (c) 2015, Caffeinated
 * @license        https://tldrlegal.com/license/mit-license MIT License
 */
class LocalValidationStrategy extends ValidationStrategy
{
    /**
     * @var array
     */
    protected $messages;


    /**
     * @inheritdoc
     */
    public function getName()
    {
        return 'local';
    }

    /**
     * @inheritdoc
     */
    public function init()
    {
        $this->loadMessages();
    }

    /**
     * @inheritdoc
     */
    public function create($selector = 'form', array $options = [ ], array $data = [ ])
    {
        $options = array_replace_recursive([
            'messages' => static::flatten($this->messages)
        ], $options);

        $data = array_replace_recursive([
            //'rules' => new Collection()
        ], $data);

        return parent::create($selector, $options, $data);
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
            if ($this->getFiles()->exists($path)) {
                $this->messages = array_replace_recursive($this->messages, $this->getFiles()->getRequire($path));
            }
        }
    }

    /**
     * flattens an array
     *
     * @param        $array
     * @param string $prepend
     * @return array
     */
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
