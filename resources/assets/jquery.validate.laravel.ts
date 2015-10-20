/**
 * The `validateLaravel` is the
 */
/// <reference path="types.d.ts" />

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
        url?:string;
        ajaxSettings?: JQueryAjaxSettings;
        crsfTokenKey?:string;
        crsfToken(validator):string;
        singleFieldReferenceKey?:string;
    }

    export function convertRule(element:HTMLInputElement, rule:LaravalRule):any {
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

        Object.keys(rules).forEach((method:string) => {
            if(method in $.validator.methods === false){
                throw new Error('Laraval rule binding [' + rule.name + '] resolves to undefined validator method [' + method + ']');
            }
        });

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

    export function getElementFormRules(element:HTMLInputElement):Array<LaravalRule> {
        var validator:any = $.data(element.form, "validator");
        var name:string = validator.settings.laraval.dataAttribute;
        var formRules:any = $.extend(true, {}, $(element.form).data(name));
        if(defined(formRules[element.name])){
            return parseRules(formRules[element.name])
        } else {
            return [];
        }
    }

    export function getRuleByName(name:string, rules:Array<LaravalRule>):number {
        for(var rule in rules){
            if(rules[rule].name === name){
                return rule;
            }
        }
    }

    export function getElementRules(element:HTMLInputElement):Array<LaravalRule> {
        var validator:any = $.data(element.form, "validator");
        var name:string = validator.settings.laraval.dataAttribute;
        var elementRules:Array<LaravalRule> = parseRules($(element).data(name));
        var elementFormRules:Array<LaravalRule> = getElementFormRules(element);
        $.each(elementFormRules, (index:number, rule:LaravalRule) => {
            var elementRule:number = getRuleByName(rule.name, elementRules);
            if(defined(elementRule)){
                elementRules[elementRule] = rule;
            } else {
                elementRules.push(rule);
            }
        });
        return elementRules;
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
                case 'file':
                    type = 'file';
                    break;

            }
        } else if (name === '') {

        }
        return type;
    }



}



