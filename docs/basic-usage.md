---
title: Basic usage
author: Robin Radic
---

### Basic client-side only
Laraval can be used in many ways. Lets start with a basic client-side only example:

```html
<form id="demo-form" method="POST">
    <input type="text" name="title" data-laraval="required|max:15|alpha_num">
    <input type="text" name="body" data-laraval="required|max:255|alpha_dash">
    <input type="date" name="between_dates" data-laraval="after:1/1/2000|before:1/1/2010|date">
</form>

<!--- Javascripts, will be omitted in the other examples --> 
<script src="jquery.min.js"></script>
<script src="jquery.validate.min.js"></script>
<script src="{{ asset('vendor/laraval/jquery.validate.laravel.min.js') }}"></script>

<!--- (optional) The init function will set default values as configured in the config file -->
{{ Laraval::init() }}

<script>
$(function(){
    $('#demo-form').validate({
        laraval: {
            enabled: true // false by default.
        }
    });
});
</script>
```

### Using the rules from your backend
When you pass rules into your view, you can `json_encode` them and assign it on the form's `data-laravel` html attribute.
You can still use rules on the input elements, it will add/override the rules.
```php
$rules = [
    'title'         => 'required|max:15|alpha_num',
    'body'          => 'required|max:255|alpha_dash',
    'between_dates' => 'after:1/1/2000|before:1/1/2010|date'
];
return view('myform', [
    'rules' => $this-rules
]);
```

```html
<form id="demo-form" method="POST" data-laraval="{{ json_encode($rules) }}>
    <input type="text" name="title">
    <!--- You can still use rules on the input elements, it will add/override the rules -->
    <input type="text" name="body" data-laraval="min:10|max:50">
    <input type="date" name="between_dates">
</form>
```


### Using the Facade / Factory inside views

The easiest and quickest way to create validation is with the Facade (Factory class)
```html
<form id="demo-form" method="POST">
    <input type="text" name="title">
    <input type="text" name="body">
    <input type="date" name="between_dates">
</form>
{!! Laraval::init() !!}
{!! Laraval::local('#demo-form', [], $rules) !!}
```

###### Facade methods that can be used to create validation
```php
# init: Returns a <script> that will set the defaults on the validator
$initScript = Laraval::init() 

# make: Returns a ValidationStrategy implementation
$strategy = Laraval::make('strategy-name', $rules = []);
$script = $strategy->create('#demo-form', $options = [], $data = []);

# create: Shorthand for the code above
$script = Laraval::create($strategy, $selector, array $rules = [ ], array $options = [ ]);

# Even shorter shorthand, Laraval::$strategy()
$script = Laraval::local('#demo-form', $options = [], $rules = [], $data = [])
```



### Controller/view example
```php
use Radic\Laraval\Contracts\Factory;

class MyController extends Controller
{    
    protected $rules = [
        'title'         => 'required|max:15|alpha_num',
        'body'          => 'required|max:255|alpha_dash',
        'between_dates' => 'after:1/1/2000|before:1/1/2010|date'
    ];
    
    protected $laraval;

    public function __construct(Factory $factory)
    {
        $this->laraval = $factory;
    }
    
    public function show()
    {
        return view('myform', [
            'validationStrategy' => $this->laraval->make('local', $this->rules)
        ]);
    }
```
```html
<form id="demo-form" method="POST">
    <input type="text" name="title">
    <input type="text" name="body">
    <input type="date" name="between_dates">
</form>
{{ validationStrategy->create('#demo-form', $options = []); }}
```


### Using AJAX to validate
When using ajax to validate, you don't have to bother with passing anything to your view. A basic example:
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

```html
<form id="demo-form" method="POST">
    <input type="text" name="title">
    <input type="text" name="body">
    <input type="date" name="between_dates">
</form>
{{ Laraval::ajax('#demo-form', [ 'url' => url('validate') ]) }}
```
