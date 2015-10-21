<?php

return [
    'enable_demo' => env('RADIC_LARAVAL_DEMO', false),
    'strategies' => [
        'local' => \Radic\Laraval\Strategies\LocalValidationStrategy::class,
        'ajax' => \Radic\Laraval\Strategies\AjaxValidationStrategy::class
    ],
    'client_defaults' => [
        'enabled' => true,
        'strategy' => 'local',
        'dataAttribute' => 'laraval',
        'url' => '',
        'crsfTokenKey' => '_token'
    ]
];
