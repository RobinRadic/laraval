
// laravel methods and bindings between laravel methods and jquery validate
module validateLaravel.laravelMethods {
    /**
     * Method argument definitions
     * @type {{}}
     */
    export var defs:any = {};

    /**
     * The bindings to validateMethods
     * @type {{}}
     */
    export var binds:any = { };

    /**
     * Add a laravelMethod > validateMe
     * @param name
     * @param args
     * @returns {function(string, ...[any]): Function}
     */
    export function add(name:string, ...args:any[]):Function {
        if (args.length > 1) { // 0: array, 1: string / function
            defs[name] = args[0];
            binds[name] = args[1];
        } else {
            binds[name] = args[0];
        }

        // resolve string bind to validator function
        if (typeof binds[name] === 'string' && binds[name].length > 0) {
            var validatorMethodName:string = binds[name];
            if (!methods.hasOwnProperty(binds[name])) throw new Error('methodBind ' + binds[name] + ' does not exists in $.validator.methods');
            binds[name] = (el:ValidationControl, rule:LaravalRule) => {
                return methods[validatorMethodName].apply($.validator['prototype'], [el.value, el.element, rule.params]);
            }
        }
        // bind the validator prototype to the thisArg
        else if(kindOf(binds[name], 'function')) {
            binds[name] = binds[name].bind($.validator['prototype']);
        }
        return add;
    }

    /**
     * Returns the bound method
     * @param name
     * @returns {function(): *}
     */
    export function get(name:string):Function{
        return binds.hasOwnProperty(name) ? binds[name] : $.noop;
    }

    /**
     * Return the defined method argument definition
     * @param name
     * @returns {boolean}
     */
    export function def(name:string):any {
        return defs.hasOwnProperty(name) ? defs[name] : false;
    }

    export var added:boolean = false;

    export function addMethods(){
        if (added) return;

        add('alpha', 'lettersonly') //./
        ('alpha_dash', 'alpha_dash') //./
        ('alpha_num', 'alphanumeric') //./
        ('after', ['date'], function (el:ValidationControl, rule:LaravalRule):boolean {
            var make = (val:any):number => { return new Date(val).getTime() / 1000; };

            var myDate = make(el.value),
                otherDate = 0;

            if(el.getControl(rule.params)){ // the param is a field, so we check if our field is after the param first
                var other:ValidationControl = el.getControl(rule.params);
                otherDate = make(other.value);
            } else {
                otherDate = make(rule.params);
            }
            log('after myDate', myDate, 'otherDate', otherDate)
            return myDate > otherDate;

        })
        ('array', '')
        ('before', ['date'], function (el:ValidationControl, rule:LaravalRule):boolean {
            var make = (val:any):number => { return new Date(val).getTime() / 1000; };

            var myDate = make(el.value),
                otherDate = 0;

            if(el.getControl(rule.params)){ // the param is a field, so we check if our field is after the param first
                var other:ValidationControl = el.getControl(rule.params);
                otherDate = make(other.value);
            } else {
                otherDate = make(rule.params);
            }
            log('before myDate', myDate, 'otherDate', otherDate)
            return myDate < otherDate;

        })
        ('between', ['min', 'max'], function (el:ValidationControl, rule:LaravalRule):boolean {
            var params:string[] = rule.params.split(',');
            var valid:boolean = true;
            var isMin:boolean = get('min')(el, createRule(rule.name, params[0]));
            var isMax:boolean = get('max')(el, createRule(rule.name, params[1]));
            //log('between', 'isMin', isMin, 'isMax', isMax)();
            if (!isMin) valid = false;
            if (!isMax) valid = false;
            return valid;
        })
        ('boolean', function (el:ValidationControl, rule:LaravalRule):boolean {
            var accepted:number = [true, false, 1, 0, "1", "0"].indexOf(el.value);
            return accepted !== -1;
        })
        ('confirmed', '')
        ('date', 'date')
        ('date_format', '')
        ('different', '')
        ('digits', 'number') //./
        ('digits_between', ['min', 'max'], function (el:ValidationControl, rule:LaravalRule):boolean {
            var params:number[] = rule.params.split(',').map(parseInt);
            return el.value >= params[0] && el.value <= params[1];
        })
        ('email', 'email') //./
        ('in', function (el:ValidationControl, rule:LaravalRule):boolean {
            return rule.params.split(',').indexOf(el.value) !== -1;
        })
        ('integer', 'number') //./
        ('ip', 'ipv4') //./
        ('json', function (el:ValidationControl, rule:LaravalRule):boolean {
            var valid:boolean = true;
            try {
                JSON.parse(el.value);
            } catch(e){
                valid = false;
            }
            return valid;
        })
        ('max', function (el:ValidationControl, rule:LaravalRule):boolean {
            var type:string = el.type;
            if (type === 'numeric') {
                return methods.max.apply(this, [el.value, el.element, rule.params])
            } else {
                return methods.maxlength.apply(this, [el.value, el.element, rule.params])
            }
        })
        ('min', function (el:ValidationControl, rule:LaravalRule):boolean {

            var type:string = el.type;
            if (type === 'numeric') {
                return methods.min.apply(this, [el.value, el.element, rule.params])
            } else {
                return methods.minlength.apply(this, [el.value, el.element, rule.params])
            }
        })
        ('mimes', '')
        ('not_in', function (el:ValidationControl, rule:LaravalRule):boolean {
            return ! get('in')(el, rule);
        })
        ('numeric', 'number') //./
        ('regex', '')
        ('required', 'required') //./
        ('required_if', ['anotherfield','value'], function (el:ValidationControl, rule:LaravalRule):boolean {
            return ! get('in')(el, rule);
        })
        ('required_with', '')
        ('required_with_all', '')
        ('required_without', '')
        ('required_without_all', '')
        ('same', '')
        ('size', '')
        ('timezone', '')
        ('url', 'url') //./
        ('number', 'number'); //./

        log('validateLaravel.laravelMethods.addMethods called')
    }
}

