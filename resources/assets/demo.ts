/// <reference path="types.d.ts" />
/// <reference path="jquery.validate.laravel.dev.d.ts" />
module demo {
    export function extend(opts:any = {}) {
        $.extend(true, demo, opts);
    }

    export var jsonFilePath:string;
    export var $forms:JQuery = $('#demo-form-local, #demo-form-ajax');
    export var forms:any = {
        local: null,
        ajax: null
    };

    export function $form(name) {
        return $('#demo-form-' + name);
    }

    export function generatedData() {
        return $.getJSON(demo.jsonFilePath);
    }


    export function init() {
        var iconLink = new util.FaviconAwesome('fa-github', '#000');
        demo.$forms.find('[data-lvalidate]').each(function () {
            var pl = $(this).attr('placeholder'),
                lv = $(this).data('lvalidate');
            $(this).attr('placeholder', pl + ' (' + lv + ')');
        });

        demo.forms.local = new Form(demo.$form('local'));
    }

    export function setCodePreview(tab:string, code:string, lang:string='json'){
        var $fs = $('#tab-' + tab + '-data').html('');
        var $pre = $('<pre>').appendTo($fs);
        var $code = $('<code>').addClass('hljs lang-' + lang).appendTo($pre);
        code = hljs.highlight(lang, code).value;
        $code.html(code)
    }
}
