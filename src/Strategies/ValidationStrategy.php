<?php
/**
 * Part of the Caffeinated PHP packages.
 *
 * MIT License and copyright information bundled with this package in the LICENSE file
 */
namespace Radic\Laraval\Strategies;

use Caffeinated\Beverage\Filesystem;
use Illuminate\Contracts\Container\Container;
use Illuminate\Contracts\View\Factory as ViewFactory;
use Illuminate\Support\Collection;
use Radic\Laraval\Contracts\Factory as LaravalFactory;

/**
 * This is the ValidationMode.
 *
 * @package        Radic\Laraval
 * @author         Caffeinated Dev Team
 * @copyright      Copyright (c) 2015, Caffeinated
 * @license        https://tldrlegal.com/license/mit-license MIT License
 */
abstract class ValidationStrategy
{
    /**
     * @var \Radic\Laraval\Contracts\Factory|\Radic\Laraval\Factory
     */
    protected $factory;

    /**
     * @var \Caffeinated\Beverage\Filesystem
     */
    protected $files;

    /**
     * @var bool
     */
    protected $initialised;

    /**
     * @var string
     */
    protected $view = 'laraval::create';

    /**
     * @var \Illuminate\Contracts\View\Factory
     */
    protected $viewFactory;

    /**
     * @var \Illuminate\Support\Collection
     */
    protected $rules;

    /**
     * If true, when using make() the returned javascript will be embedded with <script> tag
     *
     * @var bool
     */
    protected $embed;

    /**
     * If set and using $this->embed, the $embedAttributes will be appended inside the script tag like <script $embedAttributes>
     *
     * @var string
     */
    protected $embedAttributes = 'id="init-script"';

    protected $validatorOptions;

    /** Instantiates the class
     *
     * @param \Radic\Laraval\Contracts\Factory|\Radic\Laraval\Factory $factory
     * @param \Illuminate\Contracts\Container\Container               $container
     * @param \Caffeinated\Beverage\Filesystem                        $files
     * @param \Illuminate\Contracts\View\Factory                      $viewFactory
     * @param \Illuminate\Contracts\Validation\Factory                $validationFactory
     * @param \Illuminate\Contracts\Routing\ResponseFactory           $responseFactory
     * @param array                                                   $rules
     */
    public function __construct(LaravalFactory $factory, Container $container, Filesystem $files, ViewFactory $viewFactory, array $rules = [ ])
    {
        $this->factory          = $factory;
        $this->files            = $files;
        $this->viewFactory      = $viewFactory;
        $this->rules            = new Collection($rules);
        $this->validatorOptions = new Collection();

        $this->embed = true;
        if (method_exists($this, 'init')) {
            $container->call([ $this, 'init' ]);
        }
    }

    /**
     * Returns the name of the strategy, used in the factory's make/create methods
     *
     * @return string
     */
    abstract public function getName();

    /**
     * Returns javascript that will bind the validation plugin to the specified form
     *
     * @param string $selector - CSS3 selector that selects the form to validate
     * @param array  $options  - Will be json_encode & passed to the $(form).validate(); call
     * @param array  $data     - Override view data
     * @return string
     */
    public function create($selector = 'form', array $options = [ ], array $data = [ ])
    {
        $options[ 'strategy' ] = $this->getName();
        $this->validatorOptions->put('laraval', $options);

        $data = array_replace_recursive([
            'selector'        => $selector,
            'rules'           => $this->rules,
            'embedAttributes' => $this->embedAttributes,
            'embed'           => $this->embed,
            'options'         => $this->validatorOptions
        ], $data);

        return $this->viewFactory->make($this->view, $data)->render();
    }

    protected function optionValuesToJson($options)
    {
        foreach (array_keys($options) as $k) {
            $options[ $k ] = json_encode($options[ $k ], JSON_PRETTY_PRINT);
        }

        return $options;
    }


    /**
     * get factory value
     *
     * @return LaravalFactory|Factory
     */
    public function getFactory()
    {
        return $this->factory;
    }

    /**
     * is initialised value
     *
     * @return boolean
     */
    public function isInitialised()
    {
        return $this->initialised;
    }

    /**
     * get viewFile value
     *
     * @return mixed
     */
    public function getView()
    {
        return $this->view;
    }

    /**
     * Set the viewFile value
     *
     * @param mixed $view
     * @return ValidationStrategy
     */
    public function setView($view)
    {
        $this->view = $view;

        return $this;
    }

    /**
     * getRules
     *
     * @return \Illuminate\Support\Collection
     */
    public function getRules()
    {
        return $this->rules;
    }

    /**
     * Get a rule
     *
     * @param      $name
     * @param null $default
     * @return \Illuminate\Support\Collection
     */
    public function rule($name, $default = null)
    {
        return $this->rules->get($name, $default);
    }

    /**
     * Set the rules value
     *
     * @param Collection $rules
     * @return ValidationStrategy
     */
    public function setRules($rules)
    {
        $this->rules = new Collection($rules);

        return $this;
    }

    /**
     * get validatorOptions value
     *
     * @param null $key
     * @param null $default
     * @return \Illuminate\Support\Collection|mixed
     */
    public function option($key = null, $default = null)
    {
        return is_null($key) ? $this->validatorOptions : $this->validatorOptions->get($key, $default);
    }

    /**
     * setOption
     *
     * @param $key
     * @param $val
     * @return $this
     */
    public function setOption($key, $val)
    {
        $this->validatorOptions->put($key, $val);

        return $this;
    }

    /**
     * get views value
     *
     * @return ViewFactory
     */
    public function getViewFactory()
    {
        return $this->viewFactory;
    }

    /**
     * Set the views value
     *
     * @param ViewFactory $viewFactory
     * @return ValidationStrategy
     */
    public function setViewFactory($viewFactory)
    {
        $this->viewFactory = $viewFactory;

        return $this;
    }

    /**
     * get files value
     *
     * @return Filesystem
     */
    public function getFiles()
    {
        return $this->files;
    }

    /**
     * Set the files value
     *
     * @param Filesystem $files
     * @return ValidationStrategy
     */
    public function setFiles($files)
    {
        $this->files = $files;

        return $this;
    }

    /**
     * is embed value
     *
     * @return boolean
     */
    public function isEmbed()
    {
        return $this->embed;
    }

    /**
     * Set the embed value
     *
     * @param boolean $embed
     * @return ValidationStrategy
     */
    public function setEmbed($embed)
    {
        $this->embed = $embed;

        return $this;
    }

    /**
     * get embedAttributes value
     *
     * @return array
     */
    public function getEmbedAttributes()
    {
        return $this->embedAttributes;
    }

    /**
     * Set the embedAttributes value
     *
     * @param array $embedAttributes
     * @return ValidationStrategy
     */
    public function setEmbedAttributes($embedAttributes)
    {
        $this->embedAttributes = $embedAttributes;

        return $this;
    }

    /**
     * get validatorOptions value
     *
     * @return \Illuminate\Support\Collection
     */
    public function getValidatorOptions()
    {
        return $this->validatorOptions;
    }

    /**
     * Set the validatorOptions value
     *
     * @param \Illuminate\Support\Collection $validatorOptions
     * @return ValidationStrategy
     */
    public function setValidatorOptions($validatorOptions)
    {
        $this->validatorOptions = $validatorOptions;

        return $this;
    }
}
