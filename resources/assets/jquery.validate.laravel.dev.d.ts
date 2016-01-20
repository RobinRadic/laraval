/// <reference path="types.d.ts" />
declare module laraval {
    var DEBUG: boolean;
    function log(...args: any[]): Function;
    function warn(...args: any[]): Function;
    function kindOf(value: any, match?: string): any;
    function def(val: any, def: any): any;
    function defined(obj?: any): boolean;
    function cre(name?: string): JQuery;
}
declare module laraval.php {
    function strtotime(text: any, now?: any): number | boolean;
}
declare module laraval {
    function bindingParam(name: any, params: any[]): any;
    function bindingWithParam(name: string): (e: HTMLInputElement, r: LaravalRule) => any;
    var ruleBindings: any;
}
declare module laraval.ajaxStrategy {
    function showErrors(errorList: any, errorMap: any): void;
}
declare module laraval.validator {
    var defaults: any;
    module prototype {
        function init(): any;
        function form(): boolean;
        function element(element: string | JQuery): boolean;
        function startRequest(element: any): void;
        function stopRequest(element: any, valid: any): void;
    }
    function laravalRules(element: HTMLInputElement): any;
    function setDefaults(settings?: JQueryValidationOptions): any;
    function normalizeRules(rules?: any[], element?: HTMLInputElement): any;
}
declare module laraval.validator {
    var methods: any;
}
declare module laraval {
    var attributeReplacer: string;
    function formatMessage(message: string): any;
    function addMessage(name: string, message: string): void;
    function addMessages(messages: any): void;
}
declare module laraval {
    interface LaravalRule {
        name?: string;
        params?: string[];
    }
    interface LaravalOptions {
        enabled?: boolean;
        strategy?: string;
        dataAttribute?: string;
        messages?: {
            [ruleName: string]: string;
        };
        url?: string;
        singleFieldReferenceKey?: string;
        crsfTokenKey?: string;
        crsfToken(validator: any): string;
        ajaxSettings?: JQueryAjaxSettings;
        formValidationSuccess(response: any, errors: any): void;
        elementValidationSuccess(response: any, errors: any): void;
    }
    function convertRule(element: HTMLInputElement, rule: LaravalRule): any;
    function parseRules(rules?: string): Array<LaravalRule>;
    function getElementFormRules(element: HTMLInputElement): Array<LaravalRule>;
    function getRuleByName(name: string, rules: Array<LaravalRule>): number;
    function getElementRules(element: HTMLInputElement): Array<LaravalRule>;
    function getElementType(el: HTMLInputElement): string;
}
