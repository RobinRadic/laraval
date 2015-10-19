Laraval
====================

<!---[![Build Status](https://img.shields.io/travis/radic/laravel-jquery-validation.svg?&style=flat-square)](https://travis-ci.org/radic/laravel-jquery-validation)
[![Scrutinizer coverage](https://img.shields.io/scrutinizer/coverage/g/radic/laravel-jquery-validation.svg?&style=flat-square)](https://scrutinizer-ci.com/g/radic/laravel-jquery-validation)
[![Scrutinizer quality](https://img.shields.io/scrutinizer/g/radic/laravel-jquery-validation.svg?&style=flat-square)](https://scrutinizer-ci.com/g/radic/laravel-jquery-validation)
[![Source](http://img.shields.io/badge/source-radic/laravel-jquery-validation-blue.svg?style=flat-square)](https://github.com/radic/laravel-jquery-validation)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://tldrlegal.com/license/mit-license)--->

Laravel 5 jQuery form validation using Laravel's Validator rules. Client & Server(AJAX) validation strategies.

- You can use the `javascript` library stand-alone. The provided PHP library is optional.
- Stand alone can **not** use the `database` validation rules.
- Error messages can be imported straight from your `Application`'s language files. 
- The `Laraval` PHP library provides more then a few conveinence methods. It also provides the logic for `AJAX` validation, which enables *all* validation rule methods.
- Depends on `jQuery` and [`jquery.validate`](http://jqueryvalidation.org) JS libraries.
- Multimple demos (local, ajax, etc) provided using Bootstrap 3.
 
The package follows the FIG standards PSR-1, PSR-2, and PSR-4 to ensure a high level of interoperability between shared PHP code.







Quick Overview
-------------
[**Full documentation s00n**](#)

#### Client side only
By simple including the `jquery.validate.js` & `jquery.validate.laraval.js` you will be able to use Laravel's (5.x) validation rules like this:

```html
<input 
    name="user_email" 
    type="email" 
    data-laraval="required|email|not_in:admin@mysite.com,manager@mysite.com"
>
```

Or simply passing the complete validation rules as json_encoded object to your view and dropping it onto your form:

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

#### AJAX validation
Using the AJAX validation strategy is probably the quickest, easiest and most effective way.
**FormController.php**
```php
use Radic\Laraval\Contracts\Factory;

class FormController extends DemoController
{
    protected $laraval;
    protected $rules = [ ]; //All rules can be used   
    public function __construct(Factory $factory)
    {
        $this->laraval = $factory->make('ajax', $this->rules);
    }
    public function show()
    {
        return view('my-awesome-view', [
            'laraval' => $this->laraval
        ]);
    }
    public function ajaxValidate(Request $request)
    {
        return $this->laraval->validate($request, $this->rules);
    }
}
```

**my-awesome-view.blade.php**  

Use the `init(array $defaults = [])` option and then the `make($jQuerySelector, array $pluginOptions = [])` method **After including the javascript dependencies**
```html
<form data-laraval="{!! $laraval->getRules()->toJson() !!}">
<!-- ... form elements ... -->
</form>

<script src="{{ asset('jquery.js') }}"></script>
<script src="{{ asset('jquery.validate.js') }}"></script>
<script src="{{ asset('vendor/laraval/jquery.validate.laraval.min.js') }}"></script>

{!! $laraval->init() !!}
{!! $laraval->make('form', [ 'url' => route('route.to.ajaxValidate') ]) !!}

</body>
```





Installation
-------------
If you are only interested in the client-side javascript library you could also simply download it from the repo [jquery.validate.laravel.min.js](https://github.com/RobinRadic/laraval/blob/master/resources/assets/jquery.validate.laravel.min.js).

#### Node / Bower
If you rather not use Composer, you can also install the package using `npm` or `bower`:
```bash
npm install laraval
# or
bower install laraval
```

#### Composer
Begin by installing the package through Composer.

```bash
composer require radic/laraval
```

Or

```json
"require": {
    "radic/laraval": "0.*"
}
```

#### Laravel
If you want to make use AJAX or rather use the provided convient initialisation methods, add the service provider and optionally the Facade;
**config/app.php**
```php
'providers' => [
    Radic\Laraval\LaravalServiceProvider::class
],
'facades' => [
    Radic\Laraval\Facades\Laraval::class
]
```

Optionally tell artisan to publish the config and/or views
```bash
php artisan vendor:publish --provider="Radic\Laraval\LaravalServiceProvider" #all
php artisan vendor:publish --provider="Radic\Laraval\LaravalServiceProvider" --tag="config" #just config
php artisan vendor:publish --provider="Radic\Laraval\LaravalServiceProvider" --tag="view"   #just views
```

#### Optional features


###### FormBuilder integration
Laraval can optionally extend the FormBuilder provided in the `laravelcollective/html` package. 
To do so, publish the configuration and enable the option

```php
return [
    'enable_form_builder' => true
]
```
