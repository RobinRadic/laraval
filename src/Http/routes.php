<?php

Route::post('/', ['as' => 'ajax.validate', 'uses' => 'AjaxValidationController@validate']);
