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
/**
 * The `validateLaravel` is the
 */
/// <reference path="types.d.ts" />
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
        'alpha': 'lettersonly',
        'alpha_num': 'alphanumeric',
        'alpha_dash': 'alpha_dash',
        'after': bindingWithParam('after'),
        'array': '',
        'before': bindingWithParam('before'),
        'between': function (e, r) {
            var name = 'between_string';
            if (getElementType(e) === 'numeric') {
                name = 'between_numeric';
            }
            return bindingParam(name, r.params);
        },
        'boolean': 'boolean',
        'confirmed': '',
        'date': 'date',
        'date_format': '',
        'different': '',
        'digits': 'number',
        'digits_between': bindingWithParam('digits_between'),
        'email': 'email',
        'in': bindingWithParam('in'),
        'integer': 'number',
        'ip': 'ipv4',
        'json': 'json',
        'max': function (e, r) {
            return bindingParam(getElementType(e) === 'numeric' ? 'max' : 'maxlength', r.params);
        },
        'min': function (e, r) {
            return bindingParam(getElementType(e) === 'numeric' ? 'min' : 'minlength', r.params);
        },
        'mimes': '',
        'not_in': bindingWithParam('not_in'),
        'numeric': 'number',
        'regex': '',
        'required': 'required',
        'required_if': bindingWithParam('required_if'),
        'required_with': '',
        'required_with_all': '',
        'required_without': '',
        'required_without_all': '',
        'same': '',
        'size': 'size',
        'timezone': '',
        'url': 'url',
        'number': 'number'
    };
    function laravalRuleToValidator(element, rule) {
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
        return rules;
    }
    laraval.laravalRuleToValidator = laravalRuleToValidator;
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
    function getElementRules(element) {
        var validator = $.data(element.form, "validator");
        return $(element).data(validator.settings.laraval.dataAttribute);
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
            }
        }
        else if (name === '') {
        }
        return type;
    }
    laraval.getElementType = getElementType;
    function getSubmitHandler(validator) {
        function handler(form, event) {
            if (validator.settings.onsubmit && validator.settings.submitHandler) {
                validator.settings.submitHandler.call(validator, form, event);
            }
        }
    }
    laraval.getSubmitHandler = getSubmitHandler;
    function setConfig(config) {
        $.extend($.validator.defaults.laraval.config, config);
    }
    laraval.setConfig = setConfig;
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
    var extensions;
    (function (extensions) {
        var validator;
        (function (validator_1) {
            var _format = $.validator.format;
            var _normalizeRules = $.validator.normalizeRules;
            validator_1.defaults = {
                laraval: {
                    config: {},
                    enabled: true,
                    mode: 'local',
                    dataAttribute: 'laraval'
                }
            };
            var prototype;
            (function (prototype) {
                var _init = $.validator.prototype.init;
                var _form = $.validator.prototype.form;
                var _element = $.validator.prototype.element;
                function init() {
                    return _init.call(this);
                }
                prototype.init = init;
                function form() {
                    return _form.call(this);
                }
                prototype.form = form;
                function element(element) {
                    return _element.apply(this, [element]);
                }
                prototype.element = element;
            })(prototype = validator_1.prototype || (validator_1.prototype = {}));
            function laravalRules(element) {
                var rules = {}, validator = $.data(element.form, "validator");
                var lrules = laraval.parseRules(laraval.getElementRules(element));
                $.each(lrules, function (i, rule) {
                    $.extend(rules, laraval.laravalRuleToValidator(element, rule));
                });
                return rules;
            }
            validator_1.laravalRules = laravalRules;
            function setDefaults(settings) {
                return $.extend(true, $.validator.defaults, settings);
            }
            validator_1.setDefaults = setDefaults;
            function normalizeRules(rules, element) {
                rules = $.extend(rules, $.validator['laravalRules'](element));
                return _normalizeRules.call(this, rules, element);
            }
            validator_1.normalizeRules = normalizeRules;
        })(validator = extensions.validator || (extensions.validator = {}));
    })(extensions = laraval.extensions || (laraval.extensions = {}));
})(laraval || (laraval = {}));
var laraval;
(function (laraval) {
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
    var _m = $.validator.methods;
    var methods = {
        alpha_dash: [function (value, element, param) {
                return this.optional(element) || /^[\w_-]+$/i.test(value);
            }, "Letters, numbers, and underscores only please"],
        after: [function (value, element, param) {
                var myDate = dtime(value);
                var otherField = this.findByName(param);
                var otherDate = otherField.length > 0 ? dtime(otherField.val()) : dtime(param);
                return this.optional(element) || myDate > otherDate;
            }, "after"],
        before: [function (value, element, param) {
                var myDate = dtime(value);
                var otherField = this.findByName(param);
                var otherDate = otherField.length > 0 ? dtime(otherField.val()) : dtime(param);
                return this.optional(element) || myDate < otherDate;
            }, "before"],
        between_numeric: [function (value, element, params) {
                return this.optional(element) || (_m.min.call(this, value, element, params[0]) && _m.max.call(this, value, element, params[1]));
            }, "between_numeric"],
        between_string: [function (value, element, params) {
                return this.optional(element) || (_m.minlength.call(this, value, element, params[0]) && _m.maxlength.call(this, value, element, params[1]));
            }, "between_string"],
        between_array: [function (value, element, params) {
                var valid = false;
                if (laraval.getElementType(element) === 'number') {
                    valid = _m.min.call(this, value, element, params[0]) && _m.max.call(this, value, element, params[1]);
                }
                else if (laraval.getElementType(element) === 'string') {
                    valid = _m.minlength.call(this, value, element, params[0]) && _m.maxlength.call(this, value, element, params[1]);
                }
                else if (laraval.getElementType(element) === 'date' || laraval.php.strtotime(element.value) !== false) {
                    valid = _m.after.call(this, value, element, params[0]) && _m.before.call(this, value, element, params[1]);
                }
                return this.optional(element) || valid;
            }, "between"],
        boolean: [function (value, element, param) {
                var accepted = [true, false, 1, 0, "1", "0"].indexOf(value);
                return accepted !== -1;
            }, "boolean"],
        digits_between: [function (value, element, param) {
                var params = param.split(',');
                return this.optional(element) || (_m.min.call(this, value, element, params[0]) && _m.max.call(this, value, element, params[1]));
            }, "digits_between"],
        'in': [function (value, element, param) {
                return this.optional(element) || param.split(',').indexOf(value) !== -1;
            }, "in"],
        json: [function (value, element, param) {
                return this.optional(element) || isJsonString(value);
            }, "json"],
        not_in: [function (value, element, param) {
                return this.optional(element) || param.split(',').indexOf(value) === -1;
            }, "not_in"],
        required_if: [function (value, element, params) {
                var valid = false;
                var other = this.findByName(params[0]);
                if (other.length > 0) {
                    valid = other.val() == params[1];
                }
                return this.optional(element) || valid;
            }, "required_if"],
        size: [function (value, element, param) {
                var valid = false;
                var type = laraval.getElementType(element);
                if (type === 'string') {
                    return element.value.trim().length === parseInt(value);
                }
                else if (type === 'number') {
                    return parseInt(element.value.trim()) === parseInt(value);
                }
                return this.optional(element) || false;
            }, "size"],
    };
    Object.keys(methods).forEach(function (name) {
        var method = methods[name];
        $.validator.addMethod(name, method[0], method[1]);
    });
    $.extend(true, $.validator, laraval.extensions.validator);
})(laraval || (laraval = {}));
$.validator.laraval = laraval;
//# sourceMappingURL=jquery.validate.laravel.dev.js.map