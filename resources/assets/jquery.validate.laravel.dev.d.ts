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
interface JQueryValidationOptions {
    laraval: laraval.LaravalOptions;
}
declare module laraval {
    interface LaravalRule {
        name?: string;
        params?: string[];
    }
    interface LaravalOptions {
        enabled?: boolean;
        mode?: string;
        dataAttribute?: string;
        config?: any;
    }
    function bindingParam(name: any, params: any[]): any;
    function bindingWithParam(name: string): (e: HTMLInputElement, r: LaravalRule) => any;
    var ruleBindings: any;
    function laravalRuleToValidator(element: HTMLInputElement, rule: LaravalRule): any;
    function parseRules(rules?: string): Array<LaravalRule>;
    function getElementRules(element: HTMLInputElement): any;
    function getElementType(el: HTMLInputElement): string;
    function getSubmitHandler(validator: any): void;
    function setConfig(config: any): void;
    var attributeReplacer: string;
    function formatMessage(message: string): any;
    function addMessage(name: string, message: string): void;
    function addMessages(messages: any): void;
}
declare module laraval.php {
    function strtotime(text: any, now?: any): number | boolean;
}
declare module laraval.extensions.validator {
    var defaults: JQueryValidationOptions;
    module prototype {
        function init(): any;
        function form(): boolean;
        function element(element: string | JQuery): boolean;
    }
    function laravalRules(element: HTMLInputElement): any;
    function setDefaults(settings?: JQueryValidationOptions): any;
    function normalizeRules(rules?: any[], element?: HTMLInputElement): any;
}
declare module laraval {
}
