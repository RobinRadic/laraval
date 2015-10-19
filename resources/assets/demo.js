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
    function codeIndentFix(str) {
        var fix = function (code, leading) {
            if (leading === void 0) { leading = true; }
            var txt = code;
            if (leading) {
                txt = txt.replace(/^[\r\n]+/, "").replace(/\s+$/g, "");
            }
            if (/^\S/gm.test(txt)) {
                return code;
            }
            var mat, str, re = /^[\t ]+/gm, len, min = 1e3;
            while (mat = re.exec(txt)) {
                len = mat[0].length;
                if (len < min) {
                    min = len;
                    str = mat[0];
                }
            }
            if (min == 1e3)
                return code;
            return txt.replace(new RegExp("^" + str, 'gm'), "");
        };
        return fix(str);
    }
    demo.codeIndentFix = codeIndentFix;
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
            var _this = this;
            this.$el = $el;
            this.validator = $el.validate();
            this.$btnRandom = $el.find('.action-random');
            this.$btnClearValues = $el.find('.action-clear-values');
            this.$btnClearValidation = $el.find('.action-clear-validation');
            $el.find('.action-validate').on('click', function (event) {
                _this.validator.form();
            });
            $el.find('.action-validate-focused').hide().on('click', function (e) {
                _this.validator.element(_this.lastInputEl);
            });
            this.validator.elements().on('focus', function (event) {
                _this.lastInputEl = $(event.target);
                $el.find('.action-validate-focused').text('Validate ' + event.target.getAttribute('name')).show();
            });
            demo.CP.init();
            demo.CP.add('Init', true)
                .addCode('Init laraval', "{!! $laraval->init($options = []) !!}", 'php', true)
                .addCode('Generates', demo.codeIndentFix($('script#init-mode').html()), 'javascript', true)
                .addCode('Then init validation', demo.codeIndentFix($('script#init-script').html()), 'javascript', true);
            demo.generatedData().then(function (data) {
                _this.generated = data;
                _this.bindButtons();
                demo.CP.add('Form').addCode('json', demo.util.JSON.stringify(_this.serialize(), null, 4), 'json');
                _this.$el.on('change', function () {
                    demo.CP.get('Form').setCode('json', demo.util.JSON.stringify(_this.serialize(), null, 4), 'json');
                });
            });
        }
        Form.prototype.getRules = function () {
            var rules = {};
            this.validator.elements().each(function () {
                var _rules = $(this).rules();
                if (typeof _rules !== 'undefined') {
                    rules[this.name] = _rules;
                }
            });
            return rules;
        };
        Form.prototype.random = function () {
            var _this = this;
            var data = this.getRandomGenerated();
            this.validator.findByName('json').val(JSON.stringify(data));
            this.serialize().forEach(function (control) {
                if (control.name === '_token')
                    return;
                var $c = _this.validator.findByName(control.name).val(data[control.name]);
            });
            this.$el.trigger('change');
        };
        Form.prototype.clearValues = function () {
            this.$el['clearForm']();
        };
        Form.prototype.clearValidation = function () {
            var self = this;
            var s = self.validator.settings;
            this.validator.hideErrors();
            this.validator.elements().each(function () {
                self.validator.settings.unhighlight(this);
                $(this).closest('.form-group').find('.help-block-error').hide();
            });
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
            var _this = this;
            return this.$el.serializeArray().map(function (el) {
                var $el = _this.validator.findByName(el.name);
                return $.extend(el, {
                    type: $el.attr('type'),
                    rules: $el.rules(),
                    'data-laraval': $el.data(_this.validator.settings.laraval.dataAttribute),
                });
            });
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
    function $form() {
        return $('form');
    }
    demo.$form = $form;
    function generatedData() {
        return $.getJSON(demo.jsonFilePath);
    }
    demo.generatedData = generatedData;
    function init() {
        //var iconLink = new util.FaviconAwesome('fa-github', '333');
        $form().find('[data-laraval]').each(function () {
            var pl = $(this).attr('placeholder'), lv = $(this).data('laraval');
            $(this).attr('placeholder', pl + ' (' + lv + ')');
        });
        demo.form = new demo.Form($form());
    }
    demo.init = init;
    var CP;
    (function (CP) {
        var $el = $("#demo-code-preview"), $ul, $content;
        var _tabs = {};
        function slug(name) {
            return name.toLowerCase().replace(/\s/g, '_');
        }
        function init() {
            $el.html('');
            $ul = demo.cre('ul').appendTo($el).addClass('nav nav-tabs').attr('role', 'tablist');
            $content = demo.cre().appendTo($el).addClass('tab-content');
            $el.addClass('in');
        }
        CP.init = init;
        function get(name) {
            return _tabs['tab-cp-' + slug(name)];
        }
        CP.get = get;
        function add(name, active) {
            if (active === void 0) { active = false; }
            var id = 'tab-cp-' + slug(name);
            var $li = demo.cre('li').attr('role', 'presentation');
            var $a = demo.cre('a').text(name).attr({
                'href': '#' + id,
                'role': 'tab',
                'aria-controls': id,
                'data-toggle': 'tab'
            });
            var $pre = demo.cre('pre');
            var $panel = demo.cre('div').addClass('tab-pane fade').attr({ id: id, role: 'tabpanel' });
            if (active) {
                $li.addClass('active');
                $panel.addClass('in active');
            }
            _tabs[id] = {
                name: name, id: id,
                a: $a.appendTo($li), li: $li.appendTo($ul), panel: $panel.appendTo($content), pre: $pre.appendTo($panel),
                codes: {}, getCode: function (name) {
                    return this.codes[slug(name)];
                }
            };
            _tabs[id].addCode = _addCode.bind(_tabs[id]);
            _tabs[id].setCode = _setCode.bind(_tabs[id]);
            return _tabs[id];
        }
        CP.add = add;
        function _setCode(name, code, lang) {
            if (lang === void 0) { lang = 'json'; }
            if (this.pre.parent('.slimScrollDiv').length > 0) {
                this.pre.unwrap();
                this.panel.find('.slimScrollDiv, .slimScrollBar, .slimScrollRail').remove();
            }
            var id = slug(name);
            this.codes[id].code.remove();
            this.codes[id].code = demo.cre('code').appendTo(this.pre).addClass('hljs lang-' + lang).html(hljs.highlight(lang, code).value);
            this.pre.slimScroll({ height: 600 });
            return this;
        }
        function _addCode(name, code, lang, showTitle) {
            if (lang === void 0) { lang = 'json'; }
            if (showTitle === void 0) { showTitle = false; }
            var id = slug(name);
            this.codes[id] = { title: demo.cre('h5').appendTo(this.pre).text(name), code: demo.cre('code') };
            !showTitle && this.codes[id].title.hide();
            _setCode.call(this, name, code, lang);
            return this;
        }
    })(CP = demo.CP || (demo.CP = {}));
})(demo || (demo = {}));
//# sourceMappingURL=demo.js.map