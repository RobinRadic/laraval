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

/**
 * The `validateLaravel` is the
 */
/// <reference path="types.d.ts" />
var laraval;
(function (laraval) {
    laraval.ruleBindings = {
        'alpha': 'lettersonly',
        'alpha_num': 'alphanumeric',
        'alpha_dash': 'alpha_dash',
        'after': function (e, r) {
            var rules = {};
            var method = getElementType(e) === 'numeric' ? 'max' : 'maxlength';
            rules[method] = parseInt(r.params[0]);
            return rules;
        },
        'array': '',
        'before': '',
        'between': '',
        'boolean': '',
        'confirmed': '',
        'date': 'date',
        'date_format': '',
        'different': '',
        'digits': 'number',
        'digits_between': '',
        'email': 'email',
        'in': '',
        'integer': 'number',
        'ip': 'ipv4',
        'json': '',
        'max': function (e, r) {
            var rules = {};
            var method = getElementType(e) === 'numeric' ? 'max' : 'maxlength';
            rules[method] = parseInt(r.params[0]);
            return rules;
        },
        'min': function (e, r) {
            var rules = {};
            var method = getElementType(e) === 'numeric' ? 'min' : 'minlength';
            rules[method] = parseInt(r.params[0]);
            return rules;
        },
        'mimes': '',
        'not_in': '',
        'numeric': 'number',
        'regex': '',
        'required': 'required',
        'required_if': '',
        'required_with': '',
        'required_with_all': '',
        'required_without': '',
        'required_without_all': '',
        'same': '',
        'size': '',
        'timezone': '',
        'url': 'url'
    };

    function laravalRuleToValidator(element, rule) {
        var rules = {};
        var binding = laraval.ruleBindings[rule.name];
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
    laraval.convertRule = laravalRuleToValidator;
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
                params: params,
                validatorRules: {}
            });
        });
        return conv;
    }
    laraval.parseRules = parseRules;
    function getElementRules(element) {
        var validator = $.data(element.form, "validator");
        var laravalSettings = validator.settings.laraval;
        var rules = $(element).data(laravalSettings.dataAttribute);
        return rules;
    }
    laraval.getElementRules = getElementRules;
    function getElementType(el) {
        var name = el.nodeName.toLowerCase();
        var type = 'string';
        if (name === 'input') {
            type = el.getAttribute('type') === 'number' ? 'numeric' : 'string';
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
})(laraval || (laraval = {}));
var laraval;
(function (laraval) {
    var extensions;
    (function (extensions) {
        var validator;
        (function (validator_1) {
            var _normalizeRules = $.validator.normalizeRules;
            validator_1.defaults = {
                laraval: {
                    enabled: true,
                    mode: 'local',
                    dataAttribute: 'laraval',
                    messages: {}
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
                    $.extend(rules, laraval.convertRule(element, rule));
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
    var extensions;
    (function (extensions) {
        var jquery;
        (function (jquery) {
            jquery._validate = $.fn.validate;
            jquery._rules = $.fn.rules;
            function validate(options) {
                if (options === void 0) { options = {}; }
                return jquery._validate.call(this, options);
            }
            jquery.validate = validate;
            function rules(command, argument) {
                return jquery._rules.call(this, command, argument);
            }
            jquery.rules = rules;
        })(jquery = extensions.jquery || (extensions.jquery = {}));
    })(extensions = laraval.extensions || (laraval.extensions = {}));
})(laraval || (laraval = {}));
exports.methods = {
    alpha_dash: [function (value, element, param) {
            return this['optional'](element) || /^[\w_-]+$/i.test(value);
        }, "Letters, numbers, and underscores only please"],
    after: [function (value, element, param) {
            console.log('after', value, element, param);
            var make = function (val) { return new Date(val).getTime() / 1000; };
            var myDate = make(value), otherDate = 0;
            return myDate > otherDate;
        }, "after"],
};
Object.keys(exports.methods).forEach(function (name) {
    var method = exports.methods[name];
    $.validator.addMethod(name, method[0], method[1]);
});
$.extend(true, $.validator, laraval.extensions.validator);
$.fn.extend(laraval.extensions.jquery);
//# sourceMappingURL=jquery.validate.laravel.js.map


}));


}));


}));
