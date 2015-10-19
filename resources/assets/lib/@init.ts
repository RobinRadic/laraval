

module laraval {
    /**
     * Enables log messages and warnings
     * @type {boolean}
     */
    export var DEBUG:boolean = true;

    /**
     * console.log shorthand, only if DEBUG is true
     * @param args
     * @returns {function(): undefined}
     */
    export function log(...args:any[]):Function {
        if (!DEBUG) return;
        console.log.apply(console, args);
        return () => {
            console.trace();
        }
    }

    /**
     * console.warn shorthand, only if DEBUG is true
     * @param args
     * @returns {function(): undefined}
     */
    export function warn(...args:any[]):Function {
        if (!DEBUG) return;
        console.warn.apply(console, args);
        return () => {
            console.trace();
        }
    }

    var kindsOf:any = {};
    'Number String Boolean Function RegExp Array Date Error'.split(' ').forEach(function (k) {
        kindsOf['[object ' + k + ']'] = k.toLowerCase();
    });

    /**
     * Returns the type of a variablse
     *
     * @param value
     * @returns {any}
     */
    export function kindOf(value:any, match?:string):any {
        // Null or undefined.
        if (value == null) {
            return String(value);
        }
        // Everything else.
        var kind:any = kindsOf[kindsOf.toString.call(value)] || 'object';
        if (!match) return kind;
        return kind == match;
    }

    /**
     * If val is not defined, return def as default
     * @param val
     * @param def
     * @returns {any}
     */
    export function def(val:any, def:any) {
        return defined(val) ? val : def;
    }

    /**
     * Checks wether the passed variable is defined
     *
     * @param obj
     * @returns {boolean}
     */
    export function defined(obj?:any) {
        return typeof obj !== 'undefined';
    }

    /**
     * Create a element wrapped in jQuery
     * @param {string} [name=div] - The name of the element
     * @returns {JQuery}
     */
    export function cre(name?:string) {
        if (!defined(name)) {
            name = 'div';
        }
        return $(document.createElement(name));
    }


}
