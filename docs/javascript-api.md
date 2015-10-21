### $.validator.laraval

```
jquery.validate.laravel.min.js
Size:           15.76 Kb
Gzip Size:      4.70 Kb
```


##### Initialising the validation
Check [LaravalOptions](interfaces/laraval.laravaloptions.html) for detailed explenation of the options.
```
$('form').validate({
    laraval: {
        enabled: true,
        strategy: 'local',
        dataAttribute: 'laraval',
        messages: {},
        url: '',
        singleFieldReferenceKey: '',
        crsfTokenKey: '_token',
        crsfToken: function (validator) {},
        ajaxSettings: {},
        formValidationSuccess: function(response, errors){},
        elementValidationSuccess: function(response, errors){}        
    }
});
```
