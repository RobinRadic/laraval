<?php

return [
    'enable_demo' => env('RADIC_LARAVAL_DEMO', false),
    'routes'      => [
        'ajax_validation' => 'laraval::ajax.validate'
    ],
    'views' => [
        'make' => 'laraval::make'
    ],
    'modes' => [
        'local' => \Radic\Laraval\LocalValidationMode::class,
        'ajax' => \Radic\Laraval\AjaxValidationMode::class
    ],
    'client_defaults' => [
        'enabled' => true,
        'mode' => 'local',
        'dataAttribute' => 'laraval',
        'url' => '',
        'crsfTokenKey' => '_token'
    ]
];
