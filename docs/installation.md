---
title: Installation
author: Robin Radic
---

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
    "radic/laraval": "~1.0"
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

Publish the config and assets.
```bash
php artisan vendor:publish --provider="Radic\Laraval\LaravalServiceProvider"
```
