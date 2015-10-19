/// <reference path="types.d.ts" />
/// <reference path="jquery.validate.laravel.dev.d.ts" />
declare module demo {
    var DEBUG: boolean;
    function log(...args: any[]): Function;
    function warn(...args: any[]): Function;
    function kindOf(value: any, match?: string): any;
    function def(val: any, def: any): any;
    function defined(obj?: any): boolean;
    function cre(name?: string): JQuery;
    function codeIndentFix(str: any): any;
}
declare module demo {
    var _json_stringify: any;
    var _json_parse: any;
}
declare module demo.util {
    class JSON {
        static stringify(obj: any, replacer?: (key: string, value: any) => any, space?: string | number): string;
        static parse(str: string, date2obj?: any): any;
        static clone(obj: any, date2obj?: any): any;
    }
}
declare module demo.util {
    class FaviconAwesome {
        icon: string;
        color: string;
        bg: string;
        constructor(icon: string, color: string, bg?: string);
        protected getContext(canvas: HTMLCanvasElement, w: number): CanvasRenderingContext2D;
        inject(): HTMLLinkElement;
    }
}
declare module demo {
    class Form {
        $el: JQuery;
        validator: JQueryValidationValidator;
        $btnRandom: JQuery;
        $btnClearValues: JQuery;
        $btnClearValidation: JQuery;
        generated: any[];
        lastInputEl: JQuery;
        constructor($el: JQuery);
        getRules(): any;
        random(): void;
        clearValues(): void;
        clearValidation(): void;
        bindButtons(): void;
        unbindButtons(): void;
        serialize(): JQuerySerializeArrayElement[];
        getRandomGenerated(): any;
    }
}
declare module demo {
    function extend(opts?: any): void;
    var jsonFilePath: string;
    var form: Form;
    function $form(): JQuery;
    function generatedData(): JQueryXHR;
    function init(): void;
    module CP {
        function init(): void;
        function get(name: string): any;
        function add(name: string, active?: boolean): any;
    }
}
