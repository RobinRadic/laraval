
// jquery.validate methods
module validateLaravel.validateMethods {
    export var methods:{[name:string]:[Function,any]} = {
        alpha_dash: [function (value, element) {
            return this['optional'](element) || /^[\w_-]+$/i.test(value);
        }, "Letters, numbers, and underscores only please"]
    };

    export var added:boolean = false;

    export function addMethods() {
        if (added) return;
        added = true;
        Object.keys(methods).forEach((name:string) => {
            var method:[Function,any] = methods[name];
            $.validator.addMethod(<any> name, <any> method[0], <any> method[1]);
        });
        log('validateLaravel.validateMethods.addMethods called')
    }
}
