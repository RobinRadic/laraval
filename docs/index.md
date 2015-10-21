---
title: Laraval
subtitle: Laravel 5 jQuery validation
---

Laravel 5 jQuery form validation using Laravel's Validator rules. Client & Server(AJAX) validation strategies.

[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://tldrlegal.com/license/mit-license)

- You can use the `javascript` library stand-alone. The provided PHP library is optional.
- Stand alone can **not** use the `database` validation rules.
- Error messages can be imported straight from your `Application`'s language files. 
- The `Laraval` PHP library provides more then a few conveinence methods. It also provides the logic for `AJAX` validation, which enables *all* validation rule methods.
- Depends on `jQuery` and [`jquery.validate`](http://jqueryvalidation.org) JS libraries.
- Multimple demos (local, ajax, etc) provided using Bootstrap 3.
 
The package follows the FIG standards PSR-1, PSR-2, and PSR-4 to ensure a high level of interoperability between shared PHP code.

### Local example
```php
$rules = [
    'title'         => 'required|max:15|alpha_num',
    'body'          => 'required|max:255|alpha_dash',
    'between_dates' => 'after:1/1/2000|before:1/1/2010|date',
    'user_email'    => 'required|email',
    'url'           => 'required|url',
    'is_admin'      => 'boolean',
    'active'        => 'boolean'
];
return View::make('myview', [
    'rules' => $rules
]);
```
view:
```html
<form method="POST" action="{{ url('to-the-moon') }}" >
    <!-- You can still provide rules on the form fields, they will simply extend the form rules -->
    <input name="user_email" data-laraval="not_in:admin@mysite.com,manager@mysite.com" type="email" >
</form>
{{ Laraval::local('#demo-form', $rules) }}
```

### AJAX example
```php
Route::post('validate', function(Request $request){
    $rules = [
        'title'         => 'required|max:15|alpha_num',
        'body'          => 'required|max:255|alpha_dash',
        'between_dates' => 'after:1/1/2000|before:1/1/2010|date'
    ]
    return Laraval::make('ajax', $rules)->validate($request);
});
```
view:
```html
<form id="demo-form" method="POST">
    <input type="text" name="title">
    <input type="text" name="body">
    <input type="date" name="between_dates">
</form>
{{ Laraval::ajax('#demo-form', [ 'url' => url('validate') ]) }}
```
