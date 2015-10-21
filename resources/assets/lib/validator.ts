// bindings for local mode
module laraval {
    export function bindingParam(name:any, params:any[]) {
        var rules:any = {};
        rules[name] = params.length === 1 ? params[0] : params;
        return rules;
    }

    export function bindingWithParam(name:string) {
        return (e:HTMLInputElement, r:LaravalRule) => {
            return bindingParam(name, r.params);
        }
    }

    export var ruleBindings:any = {
        // laravel: validator
        'accepted': bindingWithParam('accepted'),
        'alpha': 'alpha',
        'alpha_num': 'alpha_num',
        'alpha_dash': 'alpha_dash',
        'after': bindingWithParam('after'),
        //'array': '',
        'before': bindingWithParam('before'),
        'between': (e:HTMLInputElement, r:LaravalRule) => {
            return bindingParam('between_' + getElementType(e), r.params);
        },
        'boolean': 'boolean',
        'confirmed': 'confirmed',
        'date': 'date',
        //'date_format': '',
        'different': 'different',
        'digits': bindingWithParam('digits'),
        'digits_between': bindingWithParam('digits_between'),
        'email': 'email',
        'in': bindingWithParam('in'),
        'integer': 'integer',
        'ip': 'ipv4',
        'json': 'json',
        'max': (e:HTMLInputElement, r:LaravalRule) => {
            return bindingParam('max_' + getElementType(e), r.params);
        },
        'min': (e:HTMLInputElement, r:LaravalRule) => {
            return bindingParam('min_' + getElementType(e), r.params);
        },
        'mimes': bindingWithParam('mimes'),
        'not_in': bindingWithParam('not_in'),
        'numeric': 'number',
        //'regex': '',
        'required': 'required',
        'required_if': bindingWithParam('required_if'),
        'required_with': bindingWithParam('required_with'),
        'required_with_all': bindingWithParam('required_with_all'),
        'required_without': bindingWithParam('required_without'),
        'required_without_all': bindingWithParam('required_without_all'),
        'same': bindingWithParam('equalTo'),
        'size': (e:HTMLInputElement, r:LaravalRule) => {
            return bindingParam('size_' + getElementType(e), r.params);
        },
        //'timezone': '',
        'url': 'url',

        'laraval_ajax': 'laraval_ajax'
    };
}

module laraval.ajaxStrategy {

    /**
     * @lends JQueryValidationValidator
     */
    export function showErrors(errorList:any, errorMap:any){
        var i, elements, error;

        for ( i = 0; this.errorList[ i ]; i++ ) {
            error = this.errorList[ i ];
            if ( this.settings.highlight ) {
                this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
            }
            this.showLabel( error.element, error.message );
        }
        if ( this.errorList.length ) {
            this.toShow = this.toShow.add( this.containers );
        }
        if ( this.settings.success ) {
            for ( i = 0; this.successList[ i ]; i++ ) {
                this.showLabel( this.successList[ i ] );
            }
        }
        this.toHide = this.toHide.not( this.toShow );

        var self=this;
        if ( this.settings.unhighlight ) {
            this.toHide.each(function(){
                self.settings.unhighlight.call(self, this, self.settings.validClass, self.settings.errorClass);
            })
        }
        this.hideErrors();
        this.addWrapper( this.toShow ).show();
    }
}

// defaults, prototype & overides
module laraval.validator {

    var _format:any = $.validator.format;
    var _normalizeRules:any = $.validator.normalizeRules;

    export var defaults:any = {
        laraval: {
            // general
            enabled: false,
            strategy: 'local',
            dataAttribute: 'laraval',
            messages: {},

            // ajax strategy
            url: '',
            singleFieldReferenceKey: '',
            crsfTokenKey: '_token',
            crsfToken: function (validator) {
                return validator.findByName(validator.settings.laraval.crsfToken).val();
            },
            ajaxSettings: $.extend({}, $.ajaxSettings, {
                method: 'post',
                type: 'POST'
            }),
            formValidationSuccess: function(response:any, errors:any){
                this.showErrors(errors);
            },
            elementValidationSuccess: function(response:any, errors:any){
                this.showErrors();
            }
        }
    };


    export module prototype {
        var _init:any = $.validator.prototype.init;
        var _form:any = $.validator.prototype.form;
        var _element:any = $.validator.prototype.element;
        var _startRequest:any = $.validator.prototype.startRequest;
        var _stopRequest:any = $.validator.prototype.stopRequest;

        /**
         * @lends JQueryValidationValidator
         */
        export function init() {
            if(this.settings.laraval.strategy === 'ajax') {
                this.settings.showErrors = ajaxStrategy.showErrors.bind(this);
            } else {
                var messages:any = this.settings.laraval.messages;
                if(defined(messages) && Object.keys(messages).length > 0){
                    addMessages(messages);
                }
            }
            return _init.call(this);
        }

        /**
         * @lends JQueryValidationValidator
         */
        export function form():boolean {
            if (this.settings.laraval.strategy === 'ajax') {

                this.checkForm();
                $.extend( this.submitted, this.errorMap );
                this.invalid = $.extend({}, this.errorMap );
                var validator = this;
                log('validate ajax form', $.extend(true, {}, validator));

                $.ajax($.extend(true, {}, this.settings.laraval.ajaxSettings, {
                    url: this.settings.laraval.url,
                    data: $(this.currentForm).serializeArray(),
                    success: function(response){
                        log('ajax method', response);
                        var errors:any = {};
                        if(Object.keys(response).length > 0) {
                            $.each(response, (name:string, msg:string) => {
                                if (validator.findByName(name).length > 0) {
                                    errors[name] = msg;
                                }
                            });
                        }
                        if(validator.settings.laraval.formValidationSuccess){
                            validator.settings.laraval.formValidationSuccess.call(validator, response, errors);
                        }
                    }
                }));
            } else {
                return _form.call(this);
            }
        }

        /**
         * @lends JQueryValidationValidator
         */
        export function element(element:string|JQuery):boolean {
            if (this.settings.laraval.strategy === 'ajax') {
                var o:LaravalOptions = this.settings.laraval;

                var cleanElement:HTMLInputElement = this.clean( element ),
                    checkElement:any = this.validationTargetFor( cleanElement ),
                    result = true;

                this.lastElement = checkElement;

                var data:any = {};
                data[o.crsfTokenKey] = o.crsfToken(this);
                data[o.singleFieldReferenceKey] = cleanElement.name;
                $(this.currentForm).serializeArray().forEach((el:any) => {
                    if(typeof data[el.name] === 'undefined') data[el.name] = el.value;
                });
                var validator = this;
                $.ajax($.extend(true, {}, this.settings.laraval.ajaxSettings, {
                    url: this.settings.laraval.url,
                    data: data,
                    success: function(response){
                        log('ajax element', response);
                        var errors:any = {};

                        if ( checkElement === 'undefined' ) {
                            delete validator.invalid[ cleanElement.name ];
                        } else {
                            validator.prepareElement( checkElement );
                            validator.currentElements = $( checkElement );

                            result = response === true || response === "true";
                            if ( result ) {
                                if(typeof validator.invalid[checkElement.name] !== 'undefined'){
                                    delete validator.invalid[ checkElement.name ];
                                }
                                validator.showErrors();
                            } else {
                                errors[cleanElement.name] = response[cleanElement.name];

                                validator.invalid[ checkElement.name ] = true;
                                //validator.showLabel( cleanElement, errors[cleanElement.name] );
                                validator.showErrors(errors);
                            }
                        }
                        // Add aria-invalid status for screen readers
                        $(checkElement)['attr'].call($(checkElement), "aria-invalid", !result );

                        if ( !validator.numberOfInvalids() ) {
                            // Hide error containers on last error
                            validator.toHide = validator.toHide.add( validator.containers );
                        }


                        if(validator.settings.laraval.elementValidationSuccess){
                            //validator.settings.laraval.elementValidationSuccess.call(validator, response, errors);
                        }
                    }
                }));

            } else {
                return _element.call(this, element);
            }
        }

        export function startRequest(element) {
            if (DEBUG && this['pendingRequest'] === 0) {
                console.time('Validation Request');
                console.groupCollapsed('Validation Request');
                console.profile('Validation Request');

            }

            _startRequest.apply(this, [element]);
        }

        export function stopRequest(element, valid) {
            _stopRequest.apply(this, [element, valid]);
            if (DEBUG && this['pendingRequest'] === 0) {
                log('this.pendingRequest = 0');

                console.profileEnd();
                console.groupEnd();
                console.timeEnd('Validation Request')
            }
        }
    }

    export function laravalRules(element:HTMLInputElement) {
        var rules:any = {},
            validator:any = $.data(element.form, "validator"),
            o:any = validator.settings.laraval;


        if (o.strategy === 'local') {
            $.each(getElementRules(element), function (i:number, rule:LaravalRule) {
                $.extend(rules, convertRule(element, rule));
            });
        } else if (o.strategy === 'ajax2') {
            var data:any = {
                __laraval_validate_field_name: element.name
            };

            $(validator.currentForm).serializeArray().forEach((el:any) => {
                data[el.name] = el.value;
            });

            rules['laraval_ajax'] = {
                url: o.url,
                method: 'post',
                data: data
            };
        } else if (o.strategy === 'ajax2') {

        }

        return rules;
    }

    export function setDefaults(settings?:JQueryValidationOptions) {
        return $.extend(true, $.validator.defaults, settings); // instead of original, use deep extend
    }

    export function normalizeRules(rules?:any[], element?:HTMLInputElement):any {
        var validator:JQueryValidationValidator = $.data(element.form, "validator");
        if (validator.settings.laraval.enabled === true) {
            rules = $.extend(rules, $.validator.laravalRules(element));
        }
        return _normalizeRules.call(this, rules, element);
    }
}

// methods
module laraval.validator {

    function dtime(val:any):number {
        return new Date(val).getTime() / 1000;
    }

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    function getSize(value, element:HTMLInputElement):number {
        var t:string = getElementType(element);
        if (t === 'string' || t === '') {
            return value.length;
        } else if (t === 'numeric') {
            return parseInt(value);
        } else if (t === 'file') {
            var size:number = element.files[0].size;
            if (element.multiple) {
                size = 0;
                $.makeArray(element.files).forEach((file:File) => {
                    size += file.size;
                });
            }
            log('file size ', size, element);
            return size;
        } else {
            return value.length;
        }
    }


    var _m:JQueryValidationValidatorStaticMethods = $.validator.methods;

    /** @lends JQueryValidationValidator */
    export var methods:any = {

        alpha_num: function (value:any, element?:HTMLInputElement, param?:string) {
            return this.optional(element) || /^\w+$/i.test(value);
        },

        alpha: function (value:any, element?:HTMLInputElement, param?:string) {
            return this.optional(element) || /^[a-z]+$/i.test(value);
        },

        alpha_dash: function (value:any, element?:HTMLInputElement, param?:string) {
            return this.optional(element) || /^[\w_-]+$/i.test(value);
        },

        after: function (value:any, element?:HTMLInputElement, param?:string) {
            var myDate:any = dtime(value);
            var otherField = this.findByName(param);
            var otherDate = otherField.length > 0 ? dtime(otherField.val()) : dtime(param);
            return this.optional(element) || myDate > otherDate;
        },

        before: function (value:any, element?:HTMLInputElement, param?:string) {
            var myDate:any = dtime(value);
            var otherField = this.findByName(param);
            var otherDate = otherField.length > 0 ? dtime(otherField.val()) : dtime(param); //log('after- value', value, 'el', element, 'param', param, 'myDate', myDate, 'otherField', otherField, 'otherDate', otherDate);
            return this.optional(element) || myDate < otherDate;
        },

        between_numeric: function (value:any, element:HTMLInputElement, params:string|string[]) {
            return this.optional(element) || (_m.min.call(this, value, element, params[0]) && _m.max.call(this, value, element, params[1]));
        },

        between_string: function (value:any, element:HTMLInputElement, params:string|string[]) {
            return this.optional(element) || (_m.minlength.call(this, value, element, params[0]) && _m.maxlength.call(this, value, element, params[1]));
        },

        between_file: function (value:any, element:HTMLInputElement, params:string|string[]) {
            return this.optional(element) || (_m.min.call(this, getSize(value, element), element, params[0]) && _m.max.call(this, getSize(value, element), element, params[1]));
        },

        between_array: function (value:any, element:HTMLInputElement, params:string|string[]) {
            return this.optional(element) || (_m.min.call(this, value, element, element.size) && _m.max.call(this, value, element, element.size));
        },

        confirmed: function (value:any, element:HTMLInputElement, params?:string|string[]) {
            var el = this.findByName(element.name = '_confirmation');
            if (el.length === 0) {
                return true;
            }
            return el.val() === value;
        },

        different: function (value:any, element:HTMLInputElement, param:string) {
            var el = this.findByName(param);
            if (el.length === 0) {
                return true;
            }
            return el.val() !== value;
        },

        digits: function (value:any, element:HTMLInputElement, param:string) {
            return _m.required.call(this, value, element) && value.toString().length === parseInt(param);
        },

        digits_between: function (value:any, element:HTMLInputElement, params:string[]) {
            return _m.required.call(this, value, element) && value.toString().length >= parseInt(params[0]) && value.toString().length <= parseInt(params[0]);
        },

        mimes: function (value:any, element?:HTMLInputElement, param?:string) {  // Split mime on commas in case we have multiple types we can accept
            var typeParam:string = typeof param === "string" ? param.replace(/\s/g, "").replace(/,/g, "|") : "image/*",
                optionalValue:any = this.optional(element),
                i, file;

            // Element is optional
            if (optionalValue) {
                return optionalValue;
            }

            if ($(element).attr("type") === "file") {
                // If we are using a wildcard, make it regex friendly
                typeParam = typeParam.replace(/\*/g, ".*");

                // Check if the element has a FileList before checking each file
                if (element.files && element.files.length) {
                    for (i = 0; i < element.files.length; i++) {
                        file = element.files[i];

                        // Grab the mimetype from the loaded file, verify it matches
                        if (!file.type.match(new RegExp(".?(" + typeParam + ")$", "i"))) {
                            return false;
                        }
                    }
                }
            }

            // Either return true because we've validated each file, or because the
            // browser does not support element.files and the FileList feature
            return true;
        },

        /*__mimes: function (value:any, element:HTMLInputElement, params:string[]) {
            var valid:boolean = false;
            if (element.multiple) {
                var validCount = 0;
                $.makeArray(element.files).forEach((file:File) => {
                    params.forEach((param:string) => {
                        if (file.type == getMimeByExtension(param)) {
                            validCount++;
                        }
                    });
                });
                if (validCount === element.files.length) {
                    valid = true;
                }
            } else {
                params.forEach((param:string) => {
                    if (element.files[0].type == getMimeByExtension(param)) {
                        valid = true;
                    }
                })
            }
            return this.optional(element) || valid;
        },*/

        min_numeric: function (value:any, element:HTMLInputElement, param:string) {
            return this.optional(element) || _m.min.call(this, value, element, param);
        },

        min_string: function (value:any, element:HTMLInputElement, param:string) {
            return this.optional(element) || _m.minlength.call(this, value, element, param);
        },

        min_file: function (value:any, element:HTMLInputElement, param:string) {
            return this.optional(element) || _m.min.call(this, getSize(value, element), element, param);
        },

        min_array: function (value:any, element:HTMLInputElement, param:string) {
            return this.optional(element) || _m.min.call(this, value, element, param);
        },

        integer: function (value:any, element:HTMLInputElement, param?:string) {
            return this.optional(element) || /^-?\d+$/.test(value);
        },

        ipv4: function (value:any, element:HTMLInputElement, param?:string) {
            return this.optional(element) || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(value);
        },

        ipv6: function (value:any, element:HTMLInputElement, param?:string) {
            return this.optional(element) || /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(value);
        },

        max_numeric: function (value:any, element:HTMLInputElement, param:string) {
            return this.optional(element) || _m.max.call(this, value, element, param);
        },

        max_string: function (value:any, element:HTMLInputElement, param:string) {
            return this.optional(element) || _m.maxlength.call(this, value, element, param);
        },

        max_file: function (value:any, element:HTMLInputElement, param:string) {
            return this.optional(element) || _m.max.call(this, getSize(value, element), element, param);
        },

        max_array: function (value:any, element:HTMLInputElement, param:string) {
            return this.optional(element) || _m.max.call(this, value, element, element.size);
        },

        boolean: function (value:any, element?:HTMLInputElement, param?:string) {
            var accepted:number = [true, false, 1, 0, "1", "0"].indexOf(value);
            return accepted !== -1;
        },

        'in': function (value:any, element?:HTMLInputElement, params?:string[]) {
            return this.optional(element) || params.indexOf(value) !== -1;
        },

        json: function (value:any, element?:HTMLInputElement, param?:string) {
            return this.optional(element) || isJsonString(value);
        },

        not_in: function (value:any, element?:HTMLInputElement, params?:string[]) {
            return this.optional(element) || params.indexOf(value) === -1;
        },

        required_if: function (value:any, element?:HTMLInputElement, params?:any[]) {
            var other = this.findByName(params[0]);

            if (other.length > 0 && other.val() == params[1]) {
                return _m.required.call(this, value, element);
            }

            return true;
        },

        required_with: function (value:any, element?:HTMLInputElement, params?:string[]) {
            var required:boolean = false;
            params.forEach((param:string) => {
                if (this.findByName(param).length > 0) {
                    required = true;
                }
            });

            if (required) {
                return _m.required.call(this, value, element);
            }

            return true;
        },

        required_with_all: function (value:any, element?:HTMLInputElement, params?:string[]) {
            var count:number = 0;
            params.forEach((param:string) => {
                if (this.findByName(param).length > 0) {
                    count++;
                }
            });

            if (count === params.length) {
                return _m.required.call(this, value, element);
            }

            return true;
        },

        required_without: function (value:any, element?:HTMLInputElement, params?:string[]) {
            var required:boolean = false;
            params.forEach((param:string) => {
                if (this.findByName(param).length === 0) {
                    required = true;
                }
            });

            if (required) {
                return _m.required.call(this, value, element);
            }

            return true;
        },

        required_without_all: function (value:any, element?:HTMLInputElement, params?:string[]) {
            var count:number = 0;
            params.forEach((param:string) => {
                if (this.findByName(param).length === 0) {
                    count++;
                }
            });

            if (count === params.length) {
                return _m.required.call(this, value, element);
            }

            return true;
        },


        size_numeric: function (value:any, element:HTMLInputElement, param:string) {
            return this.optional(element) || getSize(value, element) === parseInt(param);
        },

        size_string: function (value:any, element:HTMLInputElement, param:string) {
            return this.optional(element) || getSize(value, element) === parseInt(param);
        },

        size_file: function (value:any, element:HTMLInputElement, param:string) {
            return this.optional(element) || getSize(value, element) === parseInt(param);
        },

        size_array: function (value:any, element:HTMLInputElement, param:string) {
            return this.optional(element) || getSize(value, element) === parseInt(param);
        },

    };
}

