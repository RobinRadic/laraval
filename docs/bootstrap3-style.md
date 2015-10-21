---
title: Bootstrap 3 style
author: Robin Radic
---

```javascript
$.validator.setDefaults({
    highlight  : function (element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement  : 'span',
    errorClass    : 'help-block help-block-error pull-left',
    errorPlacement: function (error, element) {
        if ( element.parent('.input-group').length ) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    }
});
```
