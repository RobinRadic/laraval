Laraval
====================

[![Build Status](https://img.shields.io/travis/radic/laravel-jquery-validation.svg?&style=flat-square)](https://travis-ci.org/radic/laravel-jquery-validation)
[![Scrutinizer coverage](https://img.shields.io/scrutinizer/coverage/g/radic/laravel-jquery-validation.svg?&style=flat-square)](https://scrutinizer-ci.com/g/radic/laravel-jquery-validation)
[![Scrutinizer quality](https://img.shields.io/scrutinizer/g/radic/laravel-jquery-validation.svg?&style=flat-square)](https://scrutinizer-ci.com/g/radic/laravel-jquery-validation)
[![Source](http://img.shields.io/badge/source-radic/laravel-jquery-validation-blue.svg?style=flat-square)](https://github.com/radic/laravel-jquery-validation)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://tldrlegal.com/license/mit-license)

Radic Laraval

- You can use the `javascript` library stand-alone. The provided PHP library is optional.
- Stand alone can **not** use the `database` validation rules.
- Error messages can be imported straight from your `Application`'s language files. 
- The `Laraval` PHP library provides more then a few conveinence methods. It also provides the logic for `AJAX` validation, which enables *all* validation rule methods.
- Depends on `jQuery` and [`jquery.validate`](http://jqueryvalidation.org) JS libraries.
- Multimple demos (local, ajax, etc) provided using Bootstrap 3.
 
The package follows the FIG standards PSR-1, PSR-2, and PSR-4 to ensure a high level of interoperability between shared PHP code.

Quick Overview
-------------
[**Full documentation here**](http://rob.rad)

By simple including the `jquery.validate.js` & `jquery.validate.laraval.js` you will be able to use Laravel's (5.x) validation rules like this:

```html
<input 
    name="user_email" 
    type="email" 
    data-laraval="required|email|not_in:admin@mysite.com,manager@mysite.com"
>
```

Or simply padding the complete validation rules as json_encoded object to your view and dropping it onto your form:

**Controller/route handler**
```php
$rules = [
    'title'         => 'required|max:15|alpha_num',
    'body'          => 'required|max:255|alpha_dash',
    'json'          => 'json',
    'ip'            => 'ip',
    'age'           => 'required|between:18,30|numeric',
    'born'          => 'required|date|after:1/1/2000',
    'died'          => 'required|date|after:born',
    'between_dates' => 'after:1/1/2000|before:1/1/2010|date',
    'user_email'    => 'required|email',
    'url'           => 'required|url',
    'is_admin'      => 'boolean',
    'active'        => 'boolean'
];
return View::make('myview', [
    'rules' => json_encode($rules)
]);
```

**myview.blade.php**
```html
<form data-laraval="{!! $rules !!}" method="POST" action="{{ url('to-the-moon') }}" >
    <!-- You can still provide rules on the form fields, they will simply extend the form rules -->
    <input name="user_email" data-laraval="not_in:admin@mysite.com,manager@mysite.com" type="email" >
</form>
```



#### Unsupported pure client-side mode validation methods
- Active URL
- Array
- Date Format
- Exists (Database)
- Image (File)
- Regular Expression
- Timezone
- Unique (Database)



Quick Installation
------------------
Begin by installing the package through Composer.

```bash
composer require radic/laravel-jquery-validation
```

