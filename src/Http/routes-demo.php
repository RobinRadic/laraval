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


function _demoInput($id, $rules = '', $type = 'text', $label = null)
{
    $label = is_null($label) ? preg_replace('/\_/', ' ', ucfirst($id)) : $label;

    return view('laraval::demo.input', compact('id', 'rules', 'type', 'label'))->render();
}

function _demoFormTitle($title)
{
    return '<div class="form-group form-group-title"><div class="col-md-offset-3 col-md-9"><h4>' . ucfirst($title) . '</h></div></div>';
}
