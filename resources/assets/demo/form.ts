module demo {
    export class Form {
        $el:JQuery;
        validator:JQueryValidationValidator;
        $btnRandom:JQuery;
        $btnClearValues:JQuery;
        $btnClearValidation:JQuery;
        generated:any[];
        lastInputEl:JQuery;

        constructor($el:JQuery){
            this.$el = $el;
            this.validator = $el.validate();
            this.$btnRandom = $el.find('.action-random');
            this.$btnClearValues = $el.find('.action-clear-values');
            this.$btnClearValidation = $el.find('.action-clear-validation');

            $el.find('.action-validate').on('click', (event:JQueryEventObject) => {

                this.validator.form();
            });

            $el.find('.action-validate-focused').hide().on('click', (e:JQueryEventObject) => {
                this.validator.element(this.lastInputEl);
            });

            this.validator.elements().on('focus', (event:JQueryEventObject) => {
                this.lastInputEl = $(event.target);
                $el.find('.action-validate-focused').text('Validate ' + event.target.getAttribute('name')).show();
            });

            CP.init();

            CP.add('Init', true)
                .addCode('1. Init laraval (only once per view)', "{!! Laraval::init($defaults = []) !!}", 'php', true)
                .addCode('Generates init code:', codeIndentFix($('script#init-laraval').html()), 'javascript', true)
                .addCode('2. Create validator (can use multiple times)', "{!! Laraval::create(\n  $strategy = 'local', \n  $selector = 'form#demo-form-laraval', \n  $rules = [], \n  $options = []\n) !!}", 'php', true)
                .addCode('Generates validator', codeIndentFix($('script#init-script').html()), 'javascript', true);

            demo.generatedData().then((data) => {
                this.generated = data;
                this.bindButtons();

                CP.add('Form').addCode('json', util.JSON.stringify(this.serialize(), null, 4), 'json');
                this.$el.on('change', () => {
                    CP.get('Form').setCode('json', util.JSON.stringify(this.serialize(), null, 4), 'json');
                });
            });

        }


        getRules():any {
            var rules = {};
            this.validator.elements().each(function() {
                var _rules:any = $(this).rules();
                if(typeof _rules !== 'undefined'){
                    rules[this.name] = _rules;
                }
            });
            return rules;
        }

        random(){
            var data = this.getRandomGenerated();
            this.validator.findByName('json').val(JSON.stringify(data));

            this.serialize().forEach((control) => {
                if ( control.name === '_token' ) return;
                var $c = this.validator.findByName(control.name).val(data[control.name]);
            });

            this.$el.trigger('change');
        }

        clearValues(){
            this.$el['clearForm']();
        }

        clearValidation(){
            var self =this;
            var s = self.validator.settings;
            this.validator.hideErrors();
            this.validator.elements().each(function(){
                self.validator.settings.unhighlight(this);
                $(this).closest('.form-group').find('.help-block-error').hide();
            })
        }

        bindButtons(){
            this.$btnRandom.on('click', this.random.bind(this));
            this.$btnClearValues.on('click', this.clearValues.bind(this));
            this.$btnClearValidation.on('click', this.clearValidation.bind(this));

        }


        unbindButtons(){
            this.$btnRandom.off('click');
            this.$btnClearValues.off('click');
            this.$btnClearValidation.off('click');
        }

        serialize():JQuerySerializeArrayElement[] {
            return this.$el.serializeArray().map((el:any) => {
                var $el = this.validator.findByName(el.name);
                return $.extend(el, {
                    type: $el.attr('type'),
                    rules: $el.rules(),
                    'data-laraval': $el.data(this.validator.settings.laraval.dataAttribute),
                })
            });
        }



        getRandomGenerated():any {
            var row = Math.round(Math.random() * this.generated.length);
            return this.generated[row];

        }
    }
}
