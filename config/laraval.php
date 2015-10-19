<?php

return [
    'enable_demo' => env('RADIC_LARAVAL_DEMO', false),
    // if 'laravelcollective/html ~5.0' is present, Laraval will extend and replace its form builders.
    'enable_form_builder' => env('RADIC_LARAVAL_DEMO', false),

    'routes'      => [
        'ajax_validation' => 'laraval::ajax.validate'
    ],
    'views' => [
        'make' => 'laraval::make'
    ],
    'modes' => [
        'local' => \Radic\Laraval\Strategies\LocalValidationStrategy::class,
        'ajax' => \Radic\Laraval\Strategies\AjaxValidationStrategy::class
    ],
    'client_defaults' => [
        'enabled' => true,
        'mode' => 'local',
        'dataAttribute' => 'laraval',
        'url' => '',
        'crsfTokenKey' => '_token'
    ]
];
