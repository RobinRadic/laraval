module demo {
    export class Form {
        $el:JQuery;
        $btnRandom:JQuery;
        $btnClearValues:JQuery;
        $btnClearValidation:JQuery;
        generated:any[];

        constructor($el:JQuery){
            this.$el = $el;
            this.$btnRandom = $el.find('.action-random');
            this.$btnClearValues = $el.find('.action-clear-values');
            this.$btnClearValidation = $el.find('.action-clear-validation');

            demo.generatedData().then(function(data){
                this.generated = data;
                this.bindButtons();
                this.initFormTabContent();
                this.initControlsTabContent();
                this.initRulesTabContent();
            }.bind(this));

        }

        initFormTabContent(){
            var self = this;
            demo.setCodePreview('form', JSON.stringify(this.serialize(), null, 4), 'json');
            demo.forms.local.$el.on('change', function () {
                demo.setCodePreview('form', JSON.stringify(this.serialize(), null, 4), 'json');
            }.bind(this))
        }

        initControlsTabContent(){
            var self = this;
            function getControlsData(){
                this.getControls().map(function(el){
                    return {
                    }
                })
            }
            demo.setCodePreview('controls', JSON.stringify(getControlsData.apply(this), null, 4), 'json');
            demo.forms.local.$el.on('change', function () {
                demo.setCodePreview('controls', JSON.stringify(getControlsData.apply(this), null, 4), 'json');
            }.bind(this))
        }

        initRulesTabContent(){
            var rules = {};
            this.getControls().forEach((control:validateLaravel.ValidationControl) => {
                rules[control.name] = control.$element.data('lvalidate');
            });
            demo.setCodePreview('rules', JSON.stringify(rules, null, 4), 'json');
        }

        random(){
            var data = this.getRandomGenerated();
            this.getControl('json').$element.val(JSON.stringify(data));

            this.serialize().forEach(function (control) {
                if ( control.name === '_token' ) return;
                var $c = this.getControl(control.name).$element;
                $c.val(data[control.name]);
                //data[control.name]
            }.bind(this));

            this.$el.trigger('change');
        }

        clearValues(){
            this.$el.validateLaravel('clear');
        }

        clearValidation(){
            this.$el.validateLaravel('clearValidation');
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
            return this.$el.serializeArray();
        }

        getControl(name:string):validateLaravel.ValidationControl {
            return <validateLaravel.ValidationControl> this.$el.validateLaravel('control', name);
        }

        getControls():validateLaravel.ValidationControl[]{
            return <validateLaravel.ValidationControl[]> this.$el.validateLaravel('controls');
        }

        getRandomGenerated():any {
            var row = Math.round(Math.random() * this.generated.length);
            return this.generated[row];

        }
    }
}
