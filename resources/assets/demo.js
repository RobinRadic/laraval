var demo;
(function (demo) {
    demo.DEBUG = true;
    function log() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (!demo.DEBUG)
            return;
        console.log.apply(console, args);
        return function () {
            console.trace();
        };
    }
    demo.log = log;
    function warn() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (!demo.DEBUG)
            return;
        console.warn.apply(console, args);
        return function () {
            console.trace();
        };
    }
    demo.warn = warn;
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
    demo.kindOf = kindOf;
    function def(val, def) {
        return defined(val) ? val : def;
    }
    demo.def = def;
    function defined(obj) {
        return typeof obj !== 'undefined';
    }
    demo.defined = defined;
    function cre(name) {
        if (!defined(name)) {
            name = 'div';
        }
        return $(document.createElement(name));
    }
    demo.cre = cre;
})(demo || (demo = {}));
var demo;
(function (demo) {
    demo._json_stringify = JSON.stringify;
    demo._json_parse = JSON.parse;
})(demo || (demo = {}));
var demo;
(function (demo) {
    var util;
    (function (util) {
        var JSON = (function () {
            function JSON() {
            }
            JSON.stringify = function (obj, replacer, space) {
                var cache = [];
                var str = demo._json_stringify(obj, function (key, value) {
                    if (typeof value === 'object' && value !== null) {
                        if (cache.indexOf(value) !== -1) {
                            return;
                        }
                        cache.push(value);
                    }
                    if (value instanceof Function || typeof value == 'function') {
                        return value.toString();
                    }
                    if (value instanceof RegExp) {
                        return '_PxEgEr_' + value;
                    }
                    return value;
                }, space);
                cache = null;
                return str;
            };
            JSON.parse = function (str, date2obj) {
                var iso8061 = date2obj ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/ : false;
                return demo._json_parse(str, function (key, value) {
                    var prefix;
                    if (typeof value != 'string') {
                        return value;
                    }
                    if (value.length < 8) {
                        return value;
                    }
                    prefix = value.substring(0, 8);
                    if (iso8061 && value.match(iso8061)) {
                        return new Date(value);
                    }
                    if (prefix === 'function') {
                        return eval('(' + value + ')');
                    }
                    if (prefix === '_PxEgEr_') {
                        return eval(value.slice(8));
                    }
                    return value;
                });
            };
            JSON.clone = function (obj, date2obj) {
                return JSON.parse(JSON.stringify(obj), date2obj);
            };
            return JSON;
        })();
        util.JSON = JSON;
    })(util = demo.util || (demo.util = {}));
})(demo || (demo = {}));
var demo;
(function (demo) {
    var util;
    (function (util) {
        var FaviconAwesome = (function () {
            function FaviconAwesome(icon, color, bg) {
                this.icon = icon;
                this.color = color;
                this.bg = bg;
            }
            FaviconAwesome.prototype.getContext = function (canvas, w) {
                canvas.width = canvas.height = w;
                var context = canvas.getContext('2d');
                context.font = 'normal normal normal 32px/' + w + 'px FontAwesome';
                context.textBaseline = 'middle';
                return context;
            };
            FaviconAwesome.prototype.inject = function () {
                var container = document.createElement('div'), span = document.createElement('span'), link = document.createElement('link'), canvas = document.createElement('canvas'), body = document.body, content, context = this.getContext(canvas, 32), iconWidth;
                if (!window.getComputedStyle || !canvas.toDataURL || !document.querySelectorAll)
                    return;
                container.style.display = 'none';
                span.className = 'fa fa-' + this.icon.replace(/^fa-/, '');
                container.appendChild(span);
                body.appendChild(container);
                content = window.getComputedStyle(span, ':before').getPropertyValue('content').replace(/'/g, '');
                body.removeChild(container);
                iconWidth = context.measureText(content).width;
                if (iconWidth > canvas.width)
                    context = this.getContext(canvas, iconWidth);
                if (this.bg) {
                    context.rect(0, 0, canvas.width, canvas.height);
                    context.fillStyle = this.bg;
                    context.fill();
                }
                context.fillStyle = this.color;
                context.fillText(content, (canvas.width - iconWidth) / 2, canvas.height / 2);
                link.setAttribute('rel', 'icon');
                link.setAttribute('type', 'image/png');
                link.setAttribute('href', canvas.toDataURL('image/png'));
                for (var icons = document.querySelectorAll('link[rel*=icon]'), i = 0, l = icons.length; i < l; i++)
                    icons[i].parentNode.removeChild(icons[i]);
                document.getElementsByTagName('head')[0].appendChild(link);
                return link;
            };
            return FaviconAwesome;
        })();
        util.FaviconAwesome = FaviconAwesome;
    })(util = demo.util || (demo.util = {}));
})(demo || (demo = {}));
var demo;
(function (demo) {
    var Form = (function () {
        function Form($el) {
            this.$el = $el;
            this.$btnRandom = $el.find('.action-random');
            this.$btnClearValues = $el.find('.action-clear-values');
            this.$btnClearValidation = $el.find('.action-clear-validation');
            demo.generatedData().then(function (data) {
                this.generated = data;
                this.bindButtons();
                this.initFormTabContent();
                this.initControlsTabContent();
                this.initRulesTabContent();
            }.bind(this));
        }
        Form.prototype.initFormTabContent = function () {
            var self = this;
            demo.setCodePreview('form', JSON.stringify(this.serialize(), null, 4), 'json');
            demo.forms.local.$el.on('change', function () {
                demo.setCodePreview('form', JSON.stringify(this.serialize(), null, 4), 'json');
            }.bind(this));
        };
        Form.prototype.initControlsTabContent = function () {
            var self = this;
            function getControlsData() {
                this.getControls().map(function (el) {
                    return {};
                });
            }
            demo.setCodePreview('controls', JSON.stringify(getControlsData.apply(this), null, 4), 'json');
            demo.forms.local.$el.on('change', function () {
                demo.setCodePreview('controls', JSON.stringify(getControlsData.apply(this), null, 4), 'json');
            }.bind(this));
        };
        Form.prototype.initRulesTabContent = function () {
            var rules = {};
            this.getControls().forEach(function (control) {
                rules[control.name] = control.$element.data('lvalidate');
            });
            demo.setCodePreview('rules', JSON.stringify(rules, null, 4), 'json');
        };
        Form.prototype.random = function () {
            var data = this.getRandomGenerated();
            this.getControl('json').$element.val(JSON.stringify(data));
            this.serialize().forEach(function (control) {
                if (control.name === '_token')
                    return;
                var $c = this.getControl(control.name).$element;
                $c.val(data[control.name]);
            }.bind(this));
            this.$el.trigger('change');
        };
        Form.prototype.clearValues = function () {
            this.$el.validateLaravel('clear');
        };
        Form.prototype.clearValidation = function () {
            this.$el.validateLaravel('clearValidation');
        };
        Form.prototype.bindButtons = function () {
            this.$btnRandom.on('click', this.random.bind(this));
            this.$btnClearValues.on('click', this.clearValues.bind(this));
            this.$btnClearValidation.on('click', this.clearValidation.bind(this));
        };
        Form.prototype.unbindButtons = function () {
            this.$btnRandom.off('click');
            this.$btnClearValues.off('click');
            this.$btnClearValidation.off('click');
        };
        Form.prototype.serialize = function () {
            return this.$el.serializeArray();
        };
        Form.prototype.getControl = function (name) {
            return this.$el.validateLaravel('control', name);
        };
        Form.prototype.getControls = function () {
            return this.$el.validateLaravel('controls');
        };
        Form.prototype.getRandomGenerated = function () {
            var row = Math.round(Math.random() * this.generated.length);
            return this.generated[row];
        };
        return Form;
    })();
    demo.Form = Form;
})(demo || (demo = {}));
/// <reference path="types.d.ts" />
/// <reference path="jquery.validate.laravel.dev.d.ts" />
var demo;
(function (demo) {
    function extend(opts) {
        if (opts === void 0) { opts = {}; }
        $.extend(true, demo, opts);
    }
    demo.extend = extend;
    demo.$forms = $('#demo-form-local, #demo-form-ajax');
    demo.forms = {
        local: null,
        ajax: null
    };
    function $form(name) {
        return $('#demo-form-' + name);
    }
    demo.$form = $form;
    function generatedData() {
        return $.getJSON(demo.jsonFilePath);
    }
    demo.generatedData = generatedData;
    function init() {
        var iconLink = new demo.util.FaviconAwesome('fa-github', '#000');
        demo.$forms.find('[data-lvalidate]').each(function () {
            var pl = $(this).attr('placeholder'), lv = $(this).data('lvalidate');
            $(this).attr('placeholder', pl + ' (' + lv + ')');
        });
        demo.forms.local = new demo.Form(demo.$form('local'));
    }
    demo.init = init;
    function setCodePreview(tab, code, lang) {
        if (lang === void 0) { lang = 'json'; }
        var $fs = $('#tab-' + tab + '-data').html('');
        var $pre = $('<pre>').appendTo($fs);
        var $code = $('<code>').addClass('hljs lang-' + lang).appendTo($pre);
        code = hljs.highlight(lang, code).value;
        $code.html(code);
    }
    demo.setCodePreview = setCodePreview;
})(demo || (demo = {}));
//# sourceMappingURL=demo.js.map