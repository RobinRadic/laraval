<?php

Route::get('/', function () {
    return redirect()->route('laraval::demo.local.show');
});

Route::group([ 'as' => 'local.', 'prefix' => 'local' ], function () {

    Route::get('/', [ 'as' => 'show', 'uses' => 'LocalDemoController@show' ]);
    Route::post('store', [ 'as' => 'store', 'uses' => 'LocalDemoController@store' ]);
});

Route::group([ 'as' => 'ajax.', 'prefix' => 'ajax' ], function () {

    Route::get('/', [ 'as' => 'show', 'uses' => 'AjaxDemoController@show' ]);
    Route::post('/', [ 'as' => 'store', 'uses' => 'AjaxDemoController@store' ]);
    Route::post('validate', [ 'as' => 'validate', 'uses' => 'AjaxDemoController@ajaxValidate' ]);
});

Route::group([ 'as' => 'builder.', 'prefix' => 'builder' ], function () {

    Route::get('/', [ 'as' => 'show', 'uses' => 'FormBuilderDemoController@show' ]);
    Route::post('/', [ 'as' => 'store', 'uses' => 'FormBuilderDemoController@store' ]);
    Route::post('validate', [ 'as' => 'validate', 'uses' => 'FormBuilderDemoController@ajaxValidate' ]);
});
