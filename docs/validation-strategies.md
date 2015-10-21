---
title: Validation Strategies
author: Robin Radic
---

Responsible for generating the javascript code, handling AJAX requests/response, etc. Validation strategies extend `Radic\Laraval\Strategies\ValidationStrategy`


## Using the existing strategies
##### ValidationStrategy methods
```php
# Returns javascript that will bind the validation plugin to the specified form
$strategy->create($selector = 'form', array $options = [ ], array $data = [ ]);
$strategy->getName() # Returns the strategy name (like local or ajax);

# Rules
$strategy->getRules();           # Illuminate\Support\Collection
$strategy->rule('username');     # string
$strategy->setRules(array $rules);

# Options (will be passed to $(form).validate())
$strategy->option();        # Illuminate\Support\Collection
$strategy->option('key')    # string
$strategy->setOption($key, $val);
```

##### LocalValidationStrategy
This strategy loads the validation language file using the `config('app.locale')` directory.
 
If you want to add fallback directories or specify other directory to language files:
`loadMessages(array $extraLocales = [ ], $langsPath = 'resources/lang')`

Imagine app.locale is 'nl', you want to add english as fallback
```php
$strategy->loadMessages(['en']);
$script = $strategy->create();
```

Or if you have moved the `resources/lang` directory.
```php
$strategy->loadMessages([], 'path/to/dir');
$script = $strategy->create();
```

Note: `$langsPath` is relative to `base_path()`.

##### AjaxValidationStrategy
Adds a `validate` function that can be used in controllers. 
`validate(Request $request, array $rules = [ ], array $messages = [ ])`
Setting `$rules` and `$messages` extend/add messages on the fly.

```php
function validateAjax(Request $request){
    $this->validationStrategy->validate($request);
}
```

## Creating your own strategies
**App\ValidationStrategy.php**
```php
namespace App;

use Radic\Laraval\Strategies\ValidationStrategy;
use Illuminate\Contracts\Validation\Factory as ValidationFactory;

class MyValidationStrategy extends ValidationStrategy 
{
    public function getName()
    {
        return 'myval'
    }
    
    // Instead of overriding the constructor if you need dependencies
    // use init. Will be called by the constructor, uses DI
    public function init(ValidationFactory $validation)
    {
        // ...
    }
    
    
    public function create($selector = 'form', array $options = [ ], array $data = [ ])
    {
        return parent::create($selector, $options, $data);
    }
}
```

Register your strategy in a `boot` function
**App\Providers\AppServiceProvider.php**
```
function boot(){
    $factory = $this->app->make('laraval');
    $factory->extend('myval', 'App\ValidationStrategy');
    // ...
}
```

## Extending the existing strategies
Edit the config file `laraval.php` and change the strategy class pointers to the class you want.

