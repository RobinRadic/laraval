<?php
/**
 * Part of the Caffeinated PHP packages.
 *
 * MIT License and copyright information bundled with this package in the LICENSE file
 */
namespace Radic\Laraval\Html;

use Collective\Html\FormBuilder as BaseFormBuilder;
use Collective\Html\HtmlBuilder;
use Illuminate\Routing\UrlGenerator;
use Illuminate\Session\SessionManager;
use Radic\Laraval\Contracts\Factory as LaravalFactory;
use Radic\Laraval\Strategies\ValidationStrategy;

// http://laravelcollective.com/docs/5.1/html

/**
 * This is the FormBuilder.
 *
 * @package        Radic\Laraval
 * @author         Caffeinated Dev Team
 * @copyright      Copyright (c) 2015, Caffeinated
 * @license        https://tldrlegal.com/license/mit-license MIT License
 */
class FormBuilder extends BaseFormBuilder
{
    /**
     * @var \Radic\Laraval\Contracts\Factory
     */
    protected $laraval;

    /**
     * @var \Radic\Laraval\Strategies\ValidationStrategy
     */
    protected $strategy;

    /**
     * @var bool
     */
    protected $laravalEnabled;

    /**
     * @inheritDoc
     */
    public function __construct(HtmlBuilder $html, UrlGenerator $url, SessionManager $sessionManager, LaravalFactory $laraval)
    {
        $this->laraval        = $laraval;
        $this->laravalEnabled = false;
        $this->setSessionStore($sessionManager->driver());
        parent::__construct($html, $url, $this->getSessionStore()->token());
    }

    /**
     * @inheritDoc
     */
    public function input($type, $name, $value = null, $options = [ ])
    {
        return parent::input($type, $name, $value, $options);
    }

    /**
     * @inheritDoc
     */
    public function open(array $options = [ ])
    {
        if (isset($options[ 'laraval' ])) {
            if ($options[ 'laraval' ] instanceof ValidationStrategy) {
                $this->enableLaraval($options[ 'laraval' ]);
            } else {
                $options[ 'data-laraval' ] = json_encode($options[ 'laraval' ]);
            }
            unset($options[ 'laraval' ]);
        }

        return parent::open($options);
    }

    public function enableLaraval(ValidationStrategy $strategy)
    {
        $this->strategy       = $strategy;
        $this->laravalEnabled = true;
    }
}
