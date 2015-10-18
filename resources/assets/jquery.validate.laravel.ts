/**
 * The `validateLaravel` is the
 */
/// <reference path="types.d.ts" />

interface JQueryValidationOptions {
    laraval: laraval.LaravalOptions
}

module laraval {

    export interface LaravalRule {
        name?:string;
        params?:string[];
    }

    export interface LaravalOptions {
        enabled?:boolean;
        mode?:string;
        dataAttribute?:string;
        config?:any;
    }

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
        'alpha': 'lettersonly',
        'alpha_num': 'alphanumeric',
        'alpha_dash': 'alpha_dash',
        'after': bindingWithParam('after'),
        'array': '',
        'before': bindingWithParam('before'),
        'between': (e:HTMLInputElement, r:LaravalRule) => {
            var name = 'between_string';
            if(getElementType(e) === 'numeric'){
                name = 'between_numeric'
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
        'max': (e:HTMLInputElement, r:LaravalRule) => {
            return bindingParam(getElementType(e) === 'numeric' ? 'max' : 'maxlength', r.params);
        },
        'min': (e:HTMLInputElement, r:LaravalRule) => {
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

    export function laravalRuleToValidator(element:HTMLInputElement, rule:LaravalRule):any {
        var rules:any = {};
        var binding:any = $.validator.laraval.ruleBindings[rule.name];
        var type:string = typeof binding;

        if (type === 'undefined') {
            //rules[rule.name] = true;
        } else if (type === 'string') {
            rules[binding] = true;
        } else if (type === 'function') {
            $.extend(rules, binding.call(element, element, rule))
        }

        return rules;
    }

    /**
     * Convert laravel rules string to the LRule
     * @param rules
     * @returns {Array<LaravalRule>}
     */
    export function parseRules(rules:string = ""):Array<LaravalRule> {
        var conv:Array<LaravalRule> = [];
        if (rules.length === 0) {
            return conv;
        }
        rules.split('|').forEach((rule) => {
            var name:string = rule,
                params:string[];
            if (rule.indexOf(':') !== -1) {
                var data:string[] = rule.split(':', 1);
                var rawParams:string = rule.slice(rule.indexOf(':') + 1);
                name = data[0];
                if (rawParams.indexOf(',') !== -1) {
                    params = rawParams.split(',');
                } else {
                    params = [rawParams];
                }
            }
            conv.push(<LaravalRule> {
                name: name,
                params: params
            });
        });
        return conv;
    }

    export function getElementRules(element:HTMLInputElement) {
        var validator:any = $.data(element.form, "validator");
        return $(element).data(validator.settings.laraval.dataAttribute);
    }

    /**
     * Get the type of a form input element (numeric, string, array)
     * @param el
     * @returns {string}
     */
    export function getElementType(el:HTMLInputElement):string {
        var name:string = el.nodeName.toLowerCase();
        var type:string = 'string';
        if (name === 'input') {
            switch (el.getAttribute('type')) {
                case 'number':
                    type = 'numeric';
                    break;
                case 'date':
                    type = 'date';
                    break;
            }
        } else if (name === '') {

        }
        return type;
    }

    export function getSubmitHandler(validator:any) {
        function handler(form:any, event:any) {

            if (validator.settings.onsubmit && validator.settings.submitHandler) {
                validator.settings.submitHandler.call(validator, form, event);
            }

        }

    }

    export function setConfig(config:any){
        $.extend($.validator.defaults.laraval.config, config);
    }

    export var attributeReplacer:string = 'field';

    export function formatMessage(message:string):any {
        message = message.replace(/(\:attribute)/g, $.validator.laraval.attributeReplacer);
        var pattern:RegExp = /(\:[\w_]*)/;
        var count:number = 0;
        if(pattern.test(message)) {
            while (pattern.test(message)) {
                message = message.replace(pattern, '{' + count + '}');
                count++;
            }
            return $.validator.format(message);
        } else {
            return message;
        }
    }

    export function addMessage(name:string, message:string) {
        $.validator.messages[name] = $.validator.laraval.formatMessage(message);
    }

    export function addMessages(messages:any) {
        $.each(messages, (name:string, message:any) => {

            $.validator.laraval.addMessage(name, message);
        });
    }
}

module laraval.php {

    export function strtotime(text:any, now?:any):number|boolean {
        if (!now) {
            now = (new Date()).getTime();
        }
        //  discuss at: http://phpjs.org/functions/strtotime/
        //     version: 1109.2016
        // original by: Caio Ariede (http://caioariede.com)
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Caio Ariede (http://caioariede.com)
        // improved by: A. Matías Quezada (http://amatiasq.com)
        // improved by: preuter
        // improved by: Brett Zamir (http://brett-zamir.me)
        // improved by: Mirko Faber
        //    input by: David
        // bugfixed by: Wagner B. Soares
        // bugfixed by: Artur Tchernychev
        //        note: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
        //   example 1: strtotime('+1 day', 1129633200);
        //   returns 1: 1129719600
        //   example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
        //   returns 2: 1130425202
        //   example 3: strtotime('last month', 1129633200);
        //   returns 3: 1127041200
        //   example 4: strtotime('2009-05-04 08:30:00 GMT');
        //   returns 4: 1241425800

        var parsed, match, today, year, date, days, ranges, len, times, regex, i, fail = false;

        if (!text) {
            return fail;
        }

        // Unecessary spaces
        text = text.replace(/^\s+|\s+$/g, '')
            .replace(/\s{2,}/g, ' ')
            .replace(/[\t\r\n]/g, '')
            .toLowerCase();

        // in contrast to php, js Date.parse function interprets:
        // dates given as yyyy-mm-dd as in timezone: UTC,
        // dates with "." or "-" as MDY instead of DMY
        // dates with two-digit years differently
        // etc...etc...
        // ...therefore we manually parse lots of common date formats
        match = text.match(
            /^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);

        if (match && match[2] === match[4]) {
            if (match[1] > 1901) {
                switch (match[2]) {
                    case '-':
                    { // YYYY-M-D
                        if (match[3] > 12 || match[5] > 31) {
                            return fail;
                        }

                        return <any> new Date(<any> match[1], <any> parseInt(match[3], 10) - 1, match[5],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    }
                    case '.':
                    { // YYYY.M.D is not parsed by strtotime()
                        return fail;
                    }
                    case '/':
                    { // YYYY/M/D
                        if (match[3] > 12 || match[5] > 31) {
                            return fail;
                        }

                        return <any> new Date(match[1], parseInt(match[3], 10) - 1, match[5],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    }
                }
            } else if (match[5] > 1901) {
                switch (match[2]) {
                    case '-':
                    { // D-M-YYYY
                        if (match[3] > 12 || match[1] > 31) {
                            return fail;
                        }

                        return <any> new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    }
                    case '.':
                    { // D.M.YYYY
                        if (match[3] > 12 || match[1] > 31) {
                            return fail;
                        }

                        return <any> new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    }
                    case '/':
                    { // M/D/YYYY
                        if (match[1] > 12 || match[3] > 31) {
                            return fail;
                        }

                        return <any> new Date(match[5], parseInt(match[1], 10) - 1, match[3],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    }
                }
            } else {
                switch (match[2]) {
                    case '-':
                    { // YY-M-D
                        if (match[3] > 12 || match[5] > 31 || (match[1] < 70 && match[1] > 38)) {
                            return fail;
                        }

                        year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2000 : match[1];
                        return <any> new Date(year, parseInt(match[3], 10) - 1, match[5],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    }
                    case '.':
                    { // D.M.YY or H.MM.SS
                        if (match[5] >= 70) { // D.M.YY
                            if (match[3] > 12 || match[1] > 31) {
                                return fail;
                            }

                            return <any> new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                                    match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                        }
                        if (match[5] < 60 && !match[6]) { // H.MM.SS
                            if (match[1] > 23 || match[3] > 59) {
                                return fail;
                            }

                            today = new Date();
                            return <any> new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                                    match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000;
                        }

                        return fail; // invalid format, cannot be parsed
                    }
                    case '/':
                    { // M/D/YY
                        if (match[1] > 12 || match[3] > 31 || (match[5] < 70 && match[5] > 38)) {
                            return fail;
                        }

                        year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5];
                        return <any> new Date(year, parseInt(match[1], 10) - 1, match[3],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    }
                    case ':':
                    { // HH:MM:SS
                        if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
                            return fail;
                        }

                        today = new Date();
                        return <any> new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                                match[1] || 0, match[3] || 0, match[5] || 0) / 1000;
                    }
                }
            }
        }

        // other formats and "now" should be parsed by Date.parse()
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
                } else if (diff > 0 && type === 'last') {
                    diff -= 7;
                } else if (diff < 0 && type === 'next') {
                    diff += 7;
                }

                date.setDate(date.getDate() + diff);
            }
        }

        function process(val) {
            var splt = val.split(' '), // Todo: Reconcile this with regex using \s, taking into account browser issues with split and regexes
                type = splt[0],
                range = splt[1].substring(0, 3),
                typeIsNumber = /\d+/.test(type),
                ago = splt[2] === 'ago',
                num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

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
            } else if (!typeIsNumber) {
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

        // ECMAScript 5 only
        // if (!match.every(process))
        //    return false;

        return date.getTime() / 1000;
    }
}

module laraval.extensions.validator {

    var _format:any = $.validator.format;
    var _normalizeRules:any = $.validator.normalizeRules;

    export var defaults:JQueryValidationOptions = {
        laraval: {
            // server config
            config: {},
            enabled: true,
            mode: 'local',
            dataAttribute: 'laraval'
        }
    };


    export module prototype {
        var _init:any = $.validator.prototype.init;
        var _form:any = $.validator.prototype.form;
        var _element:any = $.validator.prototype.element;

        /**
         * @lends JQueryValidationValidator
         */
        export function init() {

            return _init.call(this);
        }

        /**
         * @lends JQueryValidationValidator
         */
        export function form():boolean {
            return _form.call(this);
        }

        /**
         * @lends JQueryValidationValidator
         */
        export function element(element:string|JQuery):boolean {
            return _element.apply(this, [element]);
        }
    }

    export function laravalRules(element:HTMLInputElement) {
        var rules:any = {},
            validator:any = $.data(element.form, "validator");

        var lrules:any = parseRules(getElementRules(element));
        $.each(lrules, function (i:number, rule:LaravalRule) {
            $.extend(rules, laravalRuleToValidator(element, rule));
        });

        return rules;
    }

    export function setDefaults(settings?:JQueryValidationOptions) {
        return $.extend(true, $.validator.defaults, settings); // instead of original, use deep extend
    }

    export function normalizeRules(rules?:any[], element?:HTMLInputElement):any {
        rules = $.extend(rules, $.validator['laravalRules'](element));
        return _normalizeRules.call(this, rules, element);
    }


}

module laraval {
    function dtime(val:any):number {
        return new Date(val).getTime() / 1000;
    }

    function isJsonString(str){
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    var _m:JQueryValidationValidatorStaticMethods = $.validator.methods;
    var methods:{[name:string]:[Function,any]} = {

        alpha_dash: [/** @lends JQueryValidationValidator */ function (value:any, element?:HTMLInputElement, param?:string) {
            return this.optional(element) || /^[\w_-]+$/i.test(value);
        }, "Letters, numbers, and underscores only please"],

        after: [/** @lends JQueryValidationValidator */ function (value:any, element?:HTMLInputElement, param?:string) {
            var myDate:any = dtime(value);
            var otherField = this.findByName(param);
            var otherDate = otherField.length > 0 ? dtime(otherField.val()) : dtime(param)
            return this.optional(element) || myDate > otherDate;
        }, "after"],

        before: [/** @lends JQueryValidationValidator */ function (value:any, element?:HTMLInputElement, param?:string) {
            var myDate:any = dtime(value);
            var otherField = this.findByName(param);
            var otherDate = otherField.length > 0 ? dtime(otherField.val()) : dtime(param); //console.log('after- value', value, 'el', element, 'param', param, 'myDate', myDate, 'otherField', otherField, 'otherDate', otherDate);
            return this.optional(element) || myDate < otherDate;
        }, "before"],

        between_numeric: [/** @lends JQueryValidationValidator */ function (value:any, element:HTMLInputElement, params:string|string[]) {
            return this.optional(element) || (_m.min.call(this, value, element, params[0]) && _m.max.call(this, value, element, params[1]));
        }, "between_numeric"],

        between_string: [/** @lends JQueryValidationValidator */ function (value:any, element:HTMLInputElement, params:string|string[]) {
            return this.optional(element) || (_m.minlength.call(this, value, element, params[0]) && _m.maxlength.call(this, value, element, params[1]));
        }, "between_string"],

        between_array: [/** @lends JQueryValidationValidator */ function (value:any, element:HTMLInputElement, params:string|string[]) {
            var valid:boolean = false;
            if (getElementType(element) === 'number') {
                valid = _m.min.call(this, value, element, params[0]) && _m.max.call(this, value, element, params[1]);
            } else if (getElementType(element) === 'string') {
                valid = _m.minlength.call(this, value, element, params[0]) && _m.maxlength.call(this, value, element, params[1]);
            } else if (getElementType(element) === 'date' || php.strtotime(element.value) !== false) {
                valid = _m.after.call(this, value, element, params[0]) && _m.before.call(this, value, element, params[1]);
            }
            return this.optional(element) || valid;
        }, "between"],

        boolean: [/** @lends JQueryValidationValidator */ function (value:any, element?:HTMLInputElement, param?:string) {
            var accepted:number = [true, false, 1, 0, "1", "0"].indexOf(value);
            return accepted !== -1;
        }, "boolean"],

        digits_between: [/** @lends JQueryValidationValidator */ function (value:any, element:HTMLInputElement, param:string) {
            var params:string[] = param.split(',');
            return this.optional(element) || (_m.min.call(this, value, element, params[0]) && _m.max.call(this, value, element, params[1]));
        }, "digits_between"],

        'in': [/** @lends JQueryValidationValidator */ function (value:any, element?:HTMLInputElement, param?:string) {
            return this.optional(element) || param.split(',').indexOf(value) !== -1;
        }, "in"],

        json: [/** @lends JQueryValidationValidator */ function (value:any, element?:HTMLInputElement, param?:string) {
            return this.optional(element) || isJsonString(value);
        }, "json"],

        not_in: [/** @lends JQueryValidationValidator */ function (value:any, element?:HTMLInputElement, param?:string) {
            return this.optional(element) ||  param.split(',').indexOf(value) === -1;
        }, "not_in"],

        required_if: [/** @lends JQueryValidationValidator */ function (value:any, element?:HTMLInputElement, params?:any[]) {
            var valid:boolean = false;
            var other = this.findByName(params[0]);
            if(other.length > 0){
                valid = other.val() == params[1];
            }
            return this.optional(element) || valid;
        }, "required_if"],

        size: [/** @lends JQueryValidationValidator */ function (value:any, element:HTMLInputElement, param:string) {
            var valid:boolean = false;
            var type:string = getElementType(element);
            if (type === 'string') {
                return element.value.trim().length === parseInt(value);
            } else if (type === 'number') {
                return parseInt(element.value.trim()) === parseInt(value);
            }
            return this.optional(element) || false;
        }, "size"],


    };

    Object.keys(methods).forEach((name:string) => {
        var method:[Function,any] = methods[name];
        $.validator.addMethod(<any> name, <any> method[0], <any> method[1]);
    });

    $.extend(true, $.validator, extensions.validator);
    //$.fn.extend(extensions.jquery);
}

$.validator.laraval = laraval;


