(function (factory) {
    if ( typeof define === "function" && define.amd ) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {

    var DEBUG = true;

    if ( typeof $.validator === 'undefined' ) {
        throw new Error('jquery.validate.laravel.js requires jquery.validate.js to be installed.');
    }
    $.validator.
    var laravel = {
        config       : {},
        options      : {
            classes: {
                success: 'has-success',
                warning: 'has-warning',
                error  : 'has-error'
            }
        },
        onAjaxInvalid: function ($form, errors) {
            var self = this;
            $.each(errors, function (eli, messages) {
                var $e = $form.lvElement(eli);
                if ( $e.hasClass('form-control') ) {
                    var $formGroup = $e.closest('.form-group');

                    $.each(self.options.classes, function (type, className) {
                        $formGroup.removeClass(className);
                    });
                    $formGroup.addClass(self.options.classes.error);

                    if ( messages.length > 0 ) {
                        $formGroup
                            .find('.help-block.validator-help-block')
                            .remove();
                        messages.forEach(function (msg) {
                            var $helpBlock = $('<span>')
                                .addClass('help-block validator-help-block')
                                .text(msg);
                            $e.after($helpBlock);
                        })
                    }
                }
            });
        }
    };


    function log() {
        if ( DEBUG !== true ) return;
        console.log.apply(console, arguments);
    }

    function warn() {
        if ( DEBUG !== true ) return;
        console.warn.apply(console, arguments);
    }

    function getForm(el) {
        var $el = $(el);
        var options = $el.data('laravel-validation');
        if ( options.config ) {
            $.extend(true, laravel.config, options.config);
        }
        $el.extend({
            lvMethod    : options.method,
            lvRules     : options.rules,
            lvElement   : function (nameOrID) {
                var el;
                el = this.find('[name="' + nameOrID + '"]');
                if ( el.length > 0 ) return el.first();
                el = this.find('#' + nameOrID);
                if ( el.length > 0 ) return el.first();
                return false;
            },
            lvHasElement: function (nameOrID) {
                return this.lvElement(nameOrID) !== false;
            }
        });
        log('getForm transform $el:', $el);
        return $el;
    }

    //$.validator.addMethod('');
    var validationMethods = {
        ajax: function ($form) {
            $form.on('submit', function (e) {
                e.preventDefault();
                if ( $form.data('laravel-validation-success') === true ) {
                    return true;
                }
                log('validationMethods.ajax.submit(form=', $form, ', rules=', $form.lvRules, ')');
                var data = {
                    _token: $form.lvElement('_token').val(),
                    data  : {},
                    rules : $form.lvRules
                };
                $.each($form.lvRules, function (nameOrID, rules) {
                    if ( ! $form.lvHasElement(nameOrID) ) {
                        warn('validationMethods.ajax.submit $form.lvRules each SKIPPING:', nameOrID);
                        return;
                    }
                    var $el = $form.lvElement(nameOrID);
                    log('validationMethods.ajax.submit $form.lvRules each ', nameOrID, $el, rules);
                    data.data[nameOrID] = $el.val();
                });
                $.ajax({
                    url    : laravel.config.routes.ajax_validation,
                    data   : data,
                    method : 'post',
                    success: function (response, status) {
                        log('validationMethods.ajax.submit ajax_validation.success data:', response, 'status:', status);
                        if ( response.valid ) {
                            $form.attr('data-laravel-validation-success', true).submit();
                        } else {
                            laravel.onAjaxInvalid($form, response.errors);
                        }
                    }
                });
                return false;
            })
        }
    };


    $('form[data-laravel-validation]').each(function (e) {
        var $form = getForm(this);
        log('form[data-validation] method', $form, 'method', $form.lvMethod);
        if ( Object.keys(validationMethods).indexOf($form.lvMethod) === - 1 ) {
            throw new Error('Validation method "' + $form.lvMethod + '" does not exists for jquery.validate.laravel.js');
        }
        validationMethods[$form.lvMethod].apply(this, [$form]);
    });



    $.validator.laravel = laravel;
}));
