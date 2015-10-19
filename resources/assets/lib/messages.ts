module laraval {
    export var attributeReplacer:string = 'field';

    export function formatMessage(message:string):any {
        message = message.replace(/(\:attribute)/g, $.validator.laraval.attributeReplacer);
        var pattern:RegExp = /(\:[\w_]*)/;
        var count:number = 0;
        if (pattern.test(message)) {
            while (pattern.test(message)) {
                message = message.replace(pattern, '{' + count + '}');
                count++;
            }
            return $.validator.format(message);
        } else {
            return message;
        }
    }

    export function addMessage(name:string, message:string) {
        $.validator.messages[name] = $.validator.laraval.formatMessage(message);
    }

    export function addMessages(messages:any) {
        $.each(messages, (name:string, message:any) => {

            $.validator.laraval.addMessage(name, message);
        });
    }
}
