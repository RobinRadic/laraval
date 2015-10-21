(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
}(this, function ($) {

var laraval;
(function (laraval) {
    laraval.DEBUG = true;
    function log() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (!laraval.DEBUG)
            return;
        console.log.apply(console, args);
        return function () {
            console.trace();
        };
    }
    laraval.log = log;
    function warn() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (!laraval.DEBUG)
            return;
        console.warn.apply(console, args);
        return function () {
            console.trace();
        };
    }
    laraval.warn = warn;
    var kindsOf = {};
    'Number String Boolean Function RegExp Array Date Error'.split(' ').forEach(function (k) {
        kindsOf['[object ' + k + ']'] = k.toLowerCase();
    });
    function kindOf(value, match) {
        if (value == null) {
            return String(value);
        }
        var kind = kindsOf[kindsOf.toString.call(value)] || 'object';
        if (!match)
            return kind;
        return kind == match;
    }
    laraval.kindOf = kindOf;
    function def(val, def) {
        return defined(val) ? val : def;
    }
    laraval.def = def;
    function defined(obj) {
        return typeof obj !== 'undefined';
    }
    laraval.defined = defined;
    function cre(name) {
        if (!defined(name)) {
            name = 'div';
        }
        return $(document.createElement(name));
    }
    laraval.cre = cre;
})(laraval || (laraval = {}));
var laraval;
(function (laraval) {
    var php;
    (function (php) {
        function strtotime(text, now) {
            if (!now) {
                now = (new Date()).getTime();
            }
            var parsed, match, today, year, date, days, ranges, len, times, regex, i, fail = false;
            if (!text) {
                return fail;
            }
            text = text.replace(/^\s+|\s+$/g, '')
                .replace(/\s{2,}/g, ' ')
                .replace(/[\t\r\n]/g, '')
                .toLowerCase();
            match = text.match(/^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);
            if (match && match[2] === match[4]) {
                if (match[1] > 1901) {
                    switch (match[2]) {
                        case '-':
                            {
                                if (match[3] > 12 || match[5] > 31) {
                                    return fail;
                                }
                                return new Date(match[1], parseInt(match[3], 10) - 1, match[5], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                            }
                        case '.':
                            {
                                return fail;
                            }
                        case '/':
                            {
                                if (match[3] > 12 || match[5] > 31) {
                                    return fail;
                                }
                                return new Date(match[1], parseInt(match[3], 10) - 1, match[5], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                            }
                    }
                }
                else if (match[5] > 1901) {
                    switch (match[2]) {
                        case '-':
                            {
                                if (match[3] > 12 || match[1] > 31) {
                                    return fail;
                                }
                                return new Date(match[5], parseInt(match[3], 10) - 1, match[1], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                            }
                        case '.':
                            {
                                if (match[3] > 12 || match[1] > 31) {
                                    return fail;
                                }
                                return new Date(match[5], parseInt(match[3], 10) - 1, match[1], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                            }
                        case '/':
                            {
                                if (match[1] > 12 || match[3] > 31) {
                                    return fail;
                                }
                                return new Date(match[5], parseInt(match[1], 10) - 1, match[3], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                            }
                    }
                }
                else {
                    switch (match[2]) {
                        case '-':
                            {
                                if (match[3] > 12 || match[5] > 31 || (match[1] < 70 && match[1] > 38)) {
                                    return fail;
                                }
                                year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2000 : match[1];
                                return new Date(year, parseInt(match[3], 10) - 1, match[5], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                            }
                        case '.':
                            {
                                if (match[5] >= 70) {
                                    if (match[3] > 12 || match[1] > 31) {
                                        return fail;
                                    }
                                    return new Date(match[5], parseInt(match[3], 10) - 1, match[1], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                                }
                                if (match[5] < 60 && !match[6]) {
                                    if (match[1] > 23 || match[3] > 59) {
                                        return fail;
                                    }
                                    today = new Date();
                                    return new Date(today.getFullYear(), today.getMonth(), today.getDate(), match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000;
                                }
                                return fail;
                            }
                        case '/':
                            {
                                if (match[1] > 12 || match[3] > 31 || (match[5] < 70 && match[5] > 38)) {
                                    return fail;
                                }
                                year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5];
                                return new Date(year, parseInt(match[1], 10) - 1, match[3], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                            }
                        case ':':
                            {
                                if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
                                    return fail;
                                }
                                today = new Date();
                                return new Date(today.getFullYear(), today.getMonth(), today.getDate(), match[1] || 0, match[3] || 0, match[5] || 0) / 1000;
                            }
                    }
                }
            }
            if (text === 'now') {
                return now === null || isNaN(now) ? new Date()
                    .getTime() / 1000 | 0 : now | 0;
            }
            if (!isNaN(parsed = Date.parse(text))) {
                return parsed / 1000 | 0;
            }
            date = now ? new Date(now * 1000) : new Date();
            days = {
                'sun': 0,
                'mon': 1,
                'tue': 2,
                'wed': 3,
                'thu': 4,
                'fri': 5,
                'sat': 6
            };
            ranges = {
                'yea': 'FullYear',
                'mon': 'Month',
                'day': 'Date',
                'hou': 'Hours',
                'min': 'Minutes',
                'sec': 'Seconds'
            };
            function lastNext(type, range, modifier) {
                var diff, day = days[range];
                if (typeof day !== 'undefined') {
                    diff = day - date.getDay();
                    if (diff === 0) {
                        diff = 7 * modifier;
                    }
                    else if (diff > 0 && type === 'last') {
                        diff -= 7;
                    }
                    else if (diff < 0 && type === 'next') {
                        diff += 7;
                    }
                    date.setDate(date.getDate() + diff);
                }
            }
            function process(val) {
                var splt = val.split(' '), type = splt[0], range = splt[1].substring(0, 3), typeIsNumber = /\d+/.test(type), ago = splt[2] === 'ago', num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);
                if (typeIsNumber) {
                    num *= parseInt(type, 10);
                }
                if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
                    return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
                }
                if (range === 'wee') {
                    return date.setDate(date.getDate() + (num * 7));
                }
                if (type === 'next' || type === 'last') {
                    lastNext(type, range, num);
                }
                else if (!typeIsNumber) {
                    return false;
                }
                return true;
            }
            times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec' +
                '|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?' +
                '|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)';
            regex = '([+-]?\\d+\\s' + times + '|' + '(last|next)\\s' + times + ')(\\sago)?';
            match = text.match(new RegExp(regex, 'gi'));
            if (!match) {
                return fail;
            }
            for (i = 0, len = match.length; i < len; i++) {
                if (!process(match[i])) {
                    return fail;
                }
            }
            return date.getTime() / 1000;
        }
        php.strtotime = strtotime;
    })(php = laraval.php || (laraval.php = {}));
})(laraval || (laraval = {}));
var laraval;
(function (laraval) {
    function bindingParam(name, params) {
        var rules = {};
        rules[name] = params.length === 1 ? params[0] : params;
        return rules;
    }
    laraval.bindingParam = bindingParam;
    function bindingWithParam(name) {
        return function (e, r) {
            return bindingParam(name, r.params);
        };
    }
    laraval.bindingWithParam = bindingWithParam;
    laraval.ruleBindings = {
        'accepted': bindingWithParam('accepted'),
        'alpha': 'alpha',
        'alpha_num': 'alpha_num',
        'alpha_dash': 'alpha_dash',
        'after': bindingWithParam('after'),
        'before': bindingWithParam('before'),
        'between': function (e, r) {
            return bindingParam('between_' + laraval.getElementType(e), r.params);
        },
        'boolean': 'boolean',
        'confirmed': 'confirmed',
        'date': 'date',
        'different': 'different',
        'digits': bindingWithParam('digits'),
        'digits_between': bindingWithParam('digits_between'),
        'email': 'email',
        'in': bindingWithParam('in'),
        'integer': 'integer',
        'ip': 'ipv4',
        'json': 'json',
        'max': function (e, r) {
            return bindingParam('max_' + laraval.getElementType(e), r.params);
        },
        'min': function (e, r) {
            return bindingParam('min_' + laraval.getElementType(e), r.params);
        },
        'mimes': bindingWithParam('mimes'),
        'not_in': bindingWithParam('not_in'),
        'numeric': 'number',
        'required': 'required',
        'required_if': bindingWithParam('required_if'),
        'required_with': bindingWithParam('required_with'),
        'required_with_all': bindingWithParam('required_with_all'),
        'required_without': bindingWithParam('required_without'),
        'required_without_all': bindingWithParam('required_without_all'),
        'same': bindingWithParam('equalTo'),
        'size': function (e, r) {
            return bindingParam('size_' + laraval.getElementType(e), r.params);
        },
        'url': 'url',
        'laraval_ajax': 'laraval_ajax'
    };
})(laraval || (laraval = {}));
var laraval;
(function (laraval) {
    var ajaxStrategy;
    (function (ajaxStrategy) {
        function showErrors(errorList, errorMap) {
            var i, elements, error;
            for (i = 0; this.errorList[i]; i++) {
                error = this.errorList[i];
                if (this.settings.highlight) {
                    this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
                }
                this.showLabel(error.element, error.message);
            }
            if (this.errorList.length) {
                this.toShow = this.toShow.add(this.containers);
            }
            if (this.settings.success) {
                for (i = 0; this.successList[i]; i++) {
                    this.showLabel(this.successList[i]);
                }
            }
            this.toHide = this.toHide.not(this.toShow);
            var self = this;
            if (this.settings.unhighlight) {
                this.toHide.each(function () {
                    self.settings.unhighlight.call(self, this, self.settings.validClass, self.settings.errorClass);
                });
            }
            this.hideErrors();
            this.addWrapper(this.toShow).show();
        }
        ajaxStrategy.showErrors = showErrors;
    })(ajaxStrategy = laraval.ajaxStrategy || (laraval.ajaxStrategy = {}));
})(laraval || (laraval = {}));
var laraval;
(function (laraval) {
    var validator;
    (function (validator_1) {
        var _format = $.validator.format;
        var _normalizeRules = $.validator.normalizeRules;
        validator_1.defaults = {
            laraval: {
                enabled: false,
                strategy: 'local',
                dataAttribute: 'laraval',
                messages: {},
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
                formValidationSuccess: function (response, errors) {
                    this.showErrors(errors);
                },
                elementValidationSuccess: function (response, errors) {
                    this.showErrors();
                }
            }
        };
        var prototype;
        (function (prototype) {
            var _init = $.validator.prototype.init;
            var _form = $.validator.prototype.form;
            var _element = $.validator.prototype.element;
            var _startRequest = $.validator.prototype.startRequest;
            var _stopRequest = $.validator.prototype.stopRequest;
            function init() {
                if (this.settings.laraval.strategy === 'ajax') {
                    this.settings.showErrors = laraval.ajaxStrategy.showErrors.bind(this);
                }
                else {
                    var messages = this.settings.laraval.messages;
                    if (laraval.defined(messages) && Object.keys(messages).length > 0) {
                        laraval.addMessages(messages);
                    }
                }
                return _init.call(this);
            }
            prototype.init = init;
            function form() {
                if (this.settings.laraval.strategy === 'ajax') {
                    this.checkForm();
                    $.extend(this.submitted, this.errorMap);
                    this.invalid = $.extend({}, this.errorMap);
                    var validator = this;
                    laraval.log('validate ajax form', $.extend(true, {}, validator));
                    $.ajax($.extend(true, {}, this.settings.laraval.ajaxSettings, {
                        url: this.settings.laraval.url,
                        data: $(this.currentForm).serializeArray(),
                        success: function (response) {
                            laraval.log('ajax method', response);
                            var errors = {};
                            if (Object.keys(response).length > 0) {
                                $.each(response, function (name, msg) {
                                    if (validator.findByName(name).length > 0) {
                                        errors[name] = msg;
                                    }
                                });
                            }
                            if (validator.settings.laraval.formValidationSuccess) {
                                validator.settings.laraval.formValidationSuccess.call(validator, response, errors);
                            }
                        }
                    }));
                }
                else {
                    return _form.call(this);
                }
            }
            prototype.form = form;
            function element(element) {
                if (this.settings.laraval.strategy === 'ajax') {
                    var o = this.settings.laraval;
                    var cleanElement = this.clean(element), checkElement = this.validationTargetFor(cleanElement), result = true;
                    this.lastElement = checkElement;
                    var data = {};
                    data[o.crsfTokenKey] = o.crsfToken(this);
                    data[o.singleFieldReferenceKey] = cleanElement.name;
                    $(this.currentForm).serializeArray().forEach(function (el) {
                        if (typeof data[el.name] === 'undefined')
                            data[el.name] = el.value;
                    });
                    var validator = this;
                    $.ajax($.extend(true, {}, this.settings.laraval.ajaxSettings, {
                        url: this.settings.laraval.url,
                        data: data,
                        success: function (response) {
                            laraval.log('ajax element', response);
                            var errors = {};
                            if (checkElement === 'undefined') {
                                delete validator.invalid[cleanElement.name];
                            }
                            else {
                                validator.prepareElement(checkElement);
                                validator.currentElements = $(checkElement);
                                result = response === true || response === "true";
                                if (result) {
                                    if (typeof validator.invalid[checkElement.name] !== 'undefined') {
                                        delete validator.invalid[checkElement.name];
                                    }
                                    validator.showErrors();
                                }
                                else {
                                    errors[cleanElement.name] = response[cleanElement.name];
                                    validator.invalid[checkElement.name] = true;
                                    validator.showErrors(errors);
                                }
                            }
                            $(checkElement)['attr'].call($(checkElement), "aria-invalid", !result);
                            if (!validator.numberOfInvalids()) {
                                validator.toHide = validator.toHide.add(validator.containers);
                            }
                            if (validator.settings.laraval.elementValidationSuccess) {
                            }
                        }
                    }));
                }
                else {
                    return _element.call(this, element);
                }
            }
            prototype.element = element;
            function startRequest(element) {
                if (laraval.DEBUG && this['pendingRequest'] === 0) {
                    console.time('Validation Request');
                    console.groupCollapsed('Validation Request');
                    console.profile('Validation Request');
                }
                _startRequest.apply(this, [element]);
            }
            prototype.startRequest = startRequest;
            function stopRequest(element, valid) {
                _stopRequest.apply(this, [element, valid]);
                if (laraval.DEBUG && this['pendingRequest'] === 0) {
                    laraval.log('this.pendingRequest = 0');
                    console.profileEnd();
                    console.groupEnd();
                    console.timeEnd('Validation Request');
                }
            }
            prototype.stopRequest = stopRequest;
        })(prototype = validator_1.prototype || (validator_1.prototype = {}));
        function laravalRules(element) {
            var rules = {}, validator = $.data(element.form, "validator"), o = validator.settings.laraval;
            if (o.strategy === 'local') {
                $.each(laraval.getElementRules(element), function (i, rule) {
                    $.extend(rules, laraval.convertRule(element, rule));
                });
            }
            else if (o.strategy === 'ajax2') {
                var data = {
                    __laraval_validate_field_name: element.name
                };
                $(validator.currentForm).serializeArray().forEach(function (el) {
                    data[el.name] = el.value;
                });
                rules['laraval_ajax'] = {
                    url: o.url,
                    method: 'post',
                    data: data
                };
            }
            else if (o.strategy === 'ajax2') {
            }
            return rules;
        }
        validator_1.laravalRules = laravalRules;
        function setDefaults(settings) {
            return $.extend(true, $.validator.defaults, settings);
        }
        validator_1.setDefaults = setDefaults;
        function normalizeRules(rules, element) {
            var validator = $.data(element.form, "validator");
            if (validator.settings.laraval.enabled === true) {
                rules = $.extend(rules, $.validator.laravalRules(element));
            }
            return _normalizeRules.call(this, rules, element);
        }
        validator_1.normalizeRules = normalizeRules;
    })(validator = laraval.validator || (laraval.validator = {}));
})(laraval || (laraval = {}));
var laraval;
(function (laraval) {
    var validator;
    (function (validator) {
        function dtime(val) {
            return new Date(val).getTime() / 1000;
        }
        function isJsonString(str) {
            try {
                JSON.parse(str);
            }
            catch (e) {
                return false;
            }
            return true;
        }
        function getSize(value, element) {
            var t = laraval.getElementType(element);
            if (t === 'string' || t === '') {
                return value.length;
            }
            else if (t === 'numeric') {
                return parseInt(value);
            }
            else if (t === 'file') {
                var size = element.files[0].size;
                if (element.multiple) {
                    size = 0;
                    $.makeArray(element.files).forEach(function (file) {
                        size += file.size;
                    });
                }
                laraval.log('file size ', size, element);
                return size;
            }
            else {
                return value.length;
            }
        }
        var _m = $.validator.methods;
        validator.methods = {
            alpha_num: function (value, element, param) {
                return this.optional(element) || /^\w+$/i.test(value);
            },
            alpha: function (value, element, param) {
                return this.optional(element) || /^[a-z]+$/i.test(value);
            },
            alpha_dash: function (value, element, param) {
                return this.optional(element) || /^[\w_-]+$/i.test(value);
            },
            after: function (value, element, param) {
                var myDate = dtime(value);
                var otherField = this.findByName(param);
                var otherDate = otherField.length > 0 ? dtime(otherField.val()) : dtime(param);
                return this.optional(element) || myDate > otherDate;
            },
            before: function (value, element, param) {
                var myDate = dtime(value);
                var otherField = this.findByName(param);
                var otherDate = otherField.length > 0 ? dtime(otherField.val()) : dtime(param);
                return this.optional(element) || myDate < otherDate;
            },
            between_numeric: function (value, element, params) {
                return this.optional(element) || (_m.min.call(this, value, element, params[0]) && _m.max.call(this, value, element, params[1]));
            },
            between_string: function (value, element, params) {
                return this.optional(element) || (_m.minlength.call(this, value, element, params[0]) && _m.maxlength.call(this, value, element, params[1]));
            },
            between_file: function (value, element, params) {
                return this.optional(element) || (_m.min.call(this, getSize(value, element), element, params[0]) && _m.max.call(this, getSize(value, element), element, params[1]));
            },
            between_array: function (value, element, params) {
                return this.optional(element) || (_m.min.call(this, value, element, element.size) && _m.max.call(this, value, element, element.size));
            },
            confirmed: function (value, element, params) {
                var el = this.findByName(element.name = '_confirmation');
                if (el.length === 0) {
                    return true;
                }
                return el.val() === value;
            },
            different: function (value, element, param) {
                var el = this.findByName(param);
                if (el.length === 0) {
                    return true;
                }
                return el.val() !== value;
            },
            digits: function (value, element, param) {
                return _m.required.call(this, value, element) && value.toString().length === parseInt(param);
            },
            digits_between: function (value, element, params) {
                return _m.required.call(this, value, element) && value.toString().length >= parseInt(params[0]) && value.toString().length <= parseInt(params[0]);
            },
            mimes: function (value, element, param) {
                var typeParam = typeof param === "string" ? param.replace(/\s/g, "").replace(/,/g, "|") : "image/*", optionalValue = this.optional(element), i, file;
                if (optionalValue) {
                    return optionalValue;
                }
                if ($(element).attr("type") === "file") {
                    typeParam = typeParam.replace(/\*/g, ".*");
                    if (element.files && element.files.length) {
                        for (i = 0; i < element.files.length; i++) {
                            file = element.files[i];
                            if (!file.type.match(new RegExp(".?(" + typeParam + ")$", "i"))) {
                                return false;
                            }
                        }
                    }
                }
                return true;
            },
            min_numeric: function (value, element, param) {
                return this.optional(element) || _m.min.call(this, value, element, param);
            },
            min_string: function (value, element, param) {
                return this.optional(element) || _m.minlength.call(this, value, element, param);
            },
            min_file: function (value, element, param) {
                return this.optional(element) || _m.min.call(this, getSize(value, element), element, param);
            },
            min_array: function (value, element, param) {
                return this.optional(element) || _m.min.call(this, value, element, param);
            },
            integer: function (value, element, param) {
                return this.optional(element) || /^-?\d+$/.test(value);
            },
            ipv4: function (value, element, param) {
                return this.optional(element) || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(value);
            },
            ipv6: function (value, element, param) {
                return this.optional(element) || /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(value);
            },
            max_numeric: function (value, element, param) {
                return this.optional(element) || _m.max.call(this, value, element, param);
            },
            max_string: function (value, element, param) {
                return this.optional(element) || _m.maxlength.call(this, value, element, param);
            },
            max_file: function (value, element, param) {
                return this.optional(element) || _m.max.call(this, getSize(value, element), element, param);
            },
            max_array: function (value, element, param) {
                return this.optional(element) || _m.max.call(this, value, element, element.size);
            },
            boolean: function (value, element, param) {
                var accepted = [true, false, 1, 0, "1", "0"].indexOf(value);
                return accepted !== -1;
            },
            'in': function (value, element, params) {
                return this.optional(element) || params.indexOf(value) !== -1;
            },
            json: function (value, element, param) {
                return this.optional(element) || isJsonString(value);
            },
            not_in: function (value, element, params) {
                return this.optional(element) || params.indexOf(value) === -1;
            },
            required_if: function (value, element, params) {
                var other = this.findByName(params[0]);
                if (other.length > 0 && other.val() == params[1]) {
                    return _m.required.call(this, value, element);
                }
                return true;
            },
            required_with: function (value, element, params) {
                var _this = this;
                var required = false;
                params.forEach(function (param) {
                    if (_this.findByName(param).length > 0) {
                        required = true;
                    }
                });
                if (required) {
                    return _m.required.call(this, value, element);
                }
                return true;
            },
            required_with_all: function (value, element, params) {
                var _this = this;
                var count = 0;
                params.forEach(function (param) {
                    if (_this.findByName(param).length > 0) {
                        count++;
                    }
                });
                if (count === params.length) {
                    return _m.required.call(this, value, element);
                }
                return true;
            },
            required_without: function (value, element, params) {
                var _this = this;
                var required = false;
                params.forEach(function (param) {
                    if (_this.findByName(param).length === 0) {
                        required = true;
                    }
                });
                if (required) {
                    return _m.required.call(this, value, element);
                }
                return true;
            },
            required_without_all: function (value, element, params) {
                var _this = this;
                var count = 0;
                params.forEach(function (param) {
                    if (_this.findByName(param).length === 0) {
                        count++;
                    }
                });
                if (count === params.length) {
                    return _m.required.call(this, value, element);
                }
                return true;
            },
            size_numeric: function (value, element, param) {
                return this.optional(element) || getSize(value, element) === parseInt(param);
            },
            size_string: function (value, element, param) {
                return this.optional(element) || getSize(value, element) === parseInt(param);
            },
            size_file: function (value, element, param) {
                return this.optional(element) || getSize(value, element) === parseInt(param);
            },
            size_array: function (value, element, param) {
                return this.optional(element) || getSize(value, element) === parseInt(param);
            },
        };
    })(validator = laraval.validator || (laraval.validator = {}));
})(laraval || (laraval = {}));
var laraval;
(function (laraval) {
    laraval.attributeReplacer = 'field';
    function formatMessage(message) {
        message = message.replace(/(\:attribute)/g, $.validator.laraval.attributeReplacer);
        var pattern = /(\:[\w_]*)/;
        var count = 0;
        if (pattern.test(message)) {
            while (pattern.test(message)) {
                message = message.replace(pattern, '{' + count + '}');
                count++;
            }
            return $.validator.format(message);
        }
        else {
            return message;
        }
    }
    laraval.formatMessage = formatMessage;
    function addMessage(name, message) {
        $.validator.messages[name] = $.validator.laraval.formatMessage(message);
    }
    laraval.addMessage = addMessage;
    function addMessages(messages) {
        $.each(messages, function (name, message) {
            $.validator.laraval.addMessage(name, message);
        });
    }
    laraval.addMessages = addMessages;
})(laraval || (laraval = {}));
/**
 * The `validateLaravel` is the
 */
/// <reference path="types.d.ts" />
var laraval;
(function (laraval) {
    function convertRule(element, rule) {
        var rules = {};
        var binding = $.validator.laraval.ruleBindings[rule.name];
        var type = typeof binding;
        if (type === 'undefined') {
        }
        else if (type === 'string') {
            rules[binding] = true;
        }
        else if (type === 'function') {
            $.extend(rules, binding.call(element, element, rule));
        }
        Object.keys(rules).forEach(function (method) {
            if (method in $.validator.methods === false) {
                throw new Error('Laraval rule binding [' + rule.name + '] resolves to undefined validator method [' + method + ']');
            }
        });
        return rules;
    }
    laraval.convertRule = convertRule;
    function parseRules(rules) {
        if (rules === void 0) { rules = ""; }
        var conv = [];
        if (rules.length === 0) {
            return conv;
        }
        rules.split('|').forEach(function (rule) {
            var name = rule, params;
            if (rule.indexOf(':') !== -1) {
                var data = rule.split(':', 1);
                var rawParams = rule.slice(rule.indexOf(':') + 1);
                name = data[0];
                if (rawParams.indexOf(',') !== -1) {
                    params = rawParams.split(',');
                }
                else {
                    params = [rawParams];
                }
            }
            conv.push({
                name: name,
                params: params
            });
        });
        return conv;
    }
    laraval.parseRules = parseRules;
    function getElementFormRules(element) {
        var validator = $.data(element.form, "validator");
        var name = validator.settings.laraval.dataAttribute;
        var formRules = $.extend(true, {}, $(element.form).data(name));
        if (laraval.defined(formRules[element.name])) {
            return parseRules(formRules[element.name]);
        }
        else {
            return [];
        }
    }
    laraval.getElementFormRules = getElementFormRules;
    function getRuleByName(name, rules) {
        for (var rule in rules) {
            if (rules[rule].name === name) {
                return rule;
            }
        }
    }
    laraval.getRuleByName = getRuleByName;
    function getElementRules(element) {
        var validator = $.data(element.form, "validator");
        var name = validator.settings.laraval.dataAttribute;
        var elementRules = parseRules($(element).data(name));
        var elementFormRules = getElementFormRules(element);
        $.each(elementFormRules, function (index, rule) {
            var elementRule = getRuleByName(rule.name, elementRules);
            if (laraval.defined(elementRule)) {
                elementRules[elementRule] = rule;
            }
            else {
                elementRules.push(rule);
            }
        });
        return elementRules;
    }
    laraval.getElementRules = getElementRules;
    function getElementType(el) {
        var name = el.nodeName.toLowerCase();
        var type = 'string';
        if (name === 'input') {
            switch (el.getAttribute('type')) {
                case 'number':
                    type = 'numeric';
                    break;
                case 'date':
                    type = 'date';
                    break;
                case 'file':
                    type = 'file';
                    break;
            }
        }
        else if (name === '') {
        }
        return type;
    }
    laraval.getElementType = getElementType;
})(laraval || (laraval = {}));
$.extend(true, $.validator, laraval.validator);
$.validator.laraval = laraval;


}));
