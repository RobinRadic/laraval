var demo = {};

(function initDemo() {
    demo.extend = function (opts) {
        opts = opts || {};
        $.extend(true, demo, opts);
    }
}.call());

(function initForm() {
    var JSON = validateLaravel.util.JSON;
    function Form($el) {
        demo.generatedData().then(function (data) {
            console.log(data);
            this.generated = data;
            this.init($el);
        }.bind(this));
    }

    demo.Form = Form;
    Form.prototype = {
        $el      : $(),
        $btn     : {
            random         : $(),
            clearValues    : $(),
            clearValidation: $()
        },
        generated: [],

        init               : function ($el) {
            this.$el = $el;
            this.bind();
            this.initFormTabContent();
            this.initControlsTabContent();
            this.initRulesTabContent();
        },
        initFormTabContent : function () {
            var self = this;
            demo.setCodePreview('form', JSON.stringify(this.serialize(), null, 4), 'json');
            demo.forms.local.$el.on('change', function () {
                demo.setCodePreview('form', JSON.stringify(this.serialize(), null, 4), 'json');
            }.bind(this))
        },
        initControlsTabContent : function () {
            var self = this;
            function getControlsData(){
                this.getControls().map(function(el){
                    return {
                    }
                })
            }
            demo.setCodePreview('controls', JSON.stringify(, null, 4), 'json');
            demo.forms.local.$el.on('change', function () {
                demo.setCodePreview('controls', JSON.stringify(this.getControls(), null, 4), 'json');
            }.bind(this))
        },
        initRulesTabContent: function () {
            var rules = {};
            $('form').validateLaravel('controls').forEach(function (control) {
                rules[control.name] = control.$element.data('lvalidate');
            });
            demo.setCodePreview('rules', JSON.stringify(rules, null, 4), 'json');
        },
        random             : function () {
            var data = this.getRandomGenerated();
            this.getControl('json').$element.val(JSON.stringify(data));

            this.serialize().forEach(function (control) {
                if ( control.name === '_token' ) return;
                var $c = this.getControl(control.name).$element;
                $c.val(data[control.name]);
                //data[control.name]
            }.bind(this));

            this.$el.trigger('change');
        },
        clearValues        : function () {
            this.$el.validateLaravel('clear');
        },
        clearValidation    : function () {
            this.$el.validateLaravel('clearValidation');
        },
        bind               : function () {
            var self = this;
            this.$btn.random = this.$el.find('.action-random').on('click', this.random.bind(this));
            this.$btn.clearValues = this.$el.find('.action-clear-values').on('click', this.clearValues.bind(this));
            this.$btn.clearValidation = this.$el.find('.action-clear-validation').on('click', this.clearValidation.bind(this));
        },
        unbind             : function () {
            this.$btn.random.off('click');
            this.$btn.clearValues.off('click');
            this.$btn.clearValidation.off('click');
        },
        serialize          : function () {
            return this.$el.serializeArray();
        },
        getControl         : function (name) {
            return this.$el.validateLaravel('control', name);
        },
        getControls         : function () {
            return this.$el.validateLaravel('controls');
        },
        getRandomGenerated : function () {
            var row = Math.round(Math.random() * this.generated.length);
            return this.generated[row];
        }
    };

}.call());

(function extendDemo() {
    demo.extend({
        jsonFilePath: '',
        $forms      : $('#demo-form-local, #demo-form-ajax'),
        forms       : {
            local: null,
            ajax : null
        }
    });
    demo.$form = function (name) {
        return $('#demo-form-' + name);
    };
    demo.generatedData = function () {
        return $.getJSON(demo.jsonFilePath)
    };
    demo.init = function () {
        var iconLink = new validateLaravel.util.FaviconAwesome('fa-github', '#000');
        demo.$forms.find('[data-lvalidate]').each(function () {
            var pl = $(this).attr('placeholder'),
                lv = $(this).data('lvalidate');
            $(this).attr('placeholder', pl + ' (' + lv + ')');
        });

        demo.forms.local = new demo.Form(demo.$form('local'));
    };
    demo.setCodePreview = function (tab, code, lang) {
        lang = lang || 'json';
        var $fs = $('#tab-' + tab + '-data').html('');
        var $pre = $('<pre>').appendTo($fs);
        var $code = $('<code>').addClass('hljs lang-' + lang).appendTo($pre);
        code = hljs.highlight(lang, code).value;
        $code.html(code);
    }
}.call());
