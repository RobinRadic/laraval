<?php

return [
    'enable_demo' => env('RADIC_LVJQVALIDATION_DEMO', false),
    'routes'      => [
        'ajax_validation' => 'laravel-jquery-validation::ajax.validate'
    ]
];
