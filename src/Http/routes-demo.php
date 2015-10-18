<?php

function _demoInput($id, $rules = '', $type = 'text', $label = null)
{
    $label = is_null($label) ? preg_replace('/\_/', ' ', ucfirst($id)) : $label;
    return view('laravel-jquery-validation::input', compact('id', 'rules', 'type', 'label'))->render();
}

Route::get('/', ['as' => 'local', 'uses' => 'DemoController@local']);
Route::get('/ajax', ['as' => 'ajax', 'uses' => 'DemoController@ajax']);
Route::post('/', ['as' => 'store', 'uses' => 'DemoController@store']);

Route::get('/demo2', ['as' => 'demo2', 'uses' => 'DemoController@demo2']);
