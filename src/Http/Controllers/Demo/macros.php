<?php

if (class_exists('Form')) {
    Form::macro('demoInput', function ($id, $rules = '', $type = 'text', $label = null) {
    
        $label = is_null($label) ? preg_replace('/\_/', ' ', ucfirst($id)) : $label;

        return view('laraval::demo.input', compact('id', 'rules', 'type', 'label'))->render();
    });
    Form::macro('demoTitle', function ($title) {
    
        return '<div class="form-group form-group-title"><div class="col-md-offset-3 col-md-9"><h4>' . ucfirst($title) . '</h></div></div>';
    });
}
