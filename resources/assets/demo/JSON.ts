module demo {
    export var _json_stringify:any = JSON.stringify;
    export var _json_parse:any = JSON.parse;
}
module demo.util {

    export class JSON {
        /**
         * Stringify a JSON object, supports functions
         * @param {object} obj - The json object
         * @param replacer
         * @param space
         * @returns {string}
         */
        public static stringify(obj:any, replacer?:(key:string, value:any) => any, space?:string | number) {
            var cache = [];
            var str:string = _json_stringify(obj, function (key, value) {
                if (typeof value === 'object' && value !== null) {
                    if (cache.indexOf(value) !== -1) {
                        // Circular reference found, discard key
                        return;
                    }
                    // Store value in our collection
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
        }

        /**
         * Parse a string into json, support functions
         * @param {string} str - The string to parse
         * @param date2obj - I forgot, sorry
         * @returns {object}
         */
        public static parse(str:string, date2obj?:any) {

            var iso8061 = date2obj ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/ : false;

            return _json_parse(str, function (key, value) {
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
        }

        /**
         * Clone an object
         * @param {object} obj
         * @param {boolean} date2obj
         * @returns {Object}
         */
        public static clone(obj:any, date2obj?:any) {
            return JSON.parse(JSON.stringify(obj), date2obj);
        }
    }
}
