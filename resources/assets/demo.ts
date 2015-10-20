/// <reference path="types.d.ts" />
/// <reference path="jquery.validate.laravel.dev.d.ts" />
module demo {
    export function extend(opts:any = {}) {
        $.extend(true, demo, opts);
    }

    export var jsonFilePath:string;
    export var form:Form;

    export function $form() {
        return $('form');
    }

    export function generatedData() {
        return $.getJSON(demo.jsonFilePath);
    }


    export function init() {
        //var iconLink = new util.FaviconAwesome('fa-github', '333');


        $form().find('[data-laraval]').each(function () {
            var pl = $(this).attr('placeholder'),
                lv = $(this).data('laraval');
            $(this).attr('placeholder', pl + ' (' + lv + ')');
        });
        form = new Form($form())
    }

    export module CP {
        var $el:JQuery = $("#demo-code-preview"),
            $ul:JQuery, $content:JQuery;

        var _tabs:any = {}

        function slug(name:string){
            return name.toLowerCase().replace(/\s/g, '_');
        }
        export function init() {
            $el.html('');
            $ul = cre('ul').appendTo($el).addClass('nav nav-tabs').attr('role', 'tablist');
            $content = cre().appendTo($el).addClass('tab-content');
            $el.addClass('in');
        }

        export function get(name:string) {
            return _tabs['tab-cp-' + slug(name)];
        }

        export function add(name:string, active:boolean = false) {
            var id = 'tab-cp-' + slug(name);
            var $li = cre('li').attr('role', 'presentation');
            var $a = cre('a').text(name).attr({
                'href': '#' + id,
                'role': 'tab',
                'aria-controls': id,
                'data-toggle': 'tab'
            });
            var $pre = cre('pre');
            var $panel = cre('div').addClass('tab-pane fade').attr({id: id, role: 'tabpanel'});
            if (active) {
                $li.addClass('active');
                $panel.addClass('in active');
            }
            _tabs[id] = {
                name: name, id: id,
                a: $a.appendTo($li), li: $li.appendTo($ul), panel: $panel.appendTo($content), pre: $pre.appendTo($panel),
                codes: {}, getCode: function (name:string) {
                    return this.codes[slug(name)];
                }
            };
            _tabs[id].addCode = _addCode.bind(_tabs[id]);
            _tabs[id].setCode = _setCode.bind(_tabs[id]);
            return _tabs[id];
        }

        function _setCode(name:string, code:string, lang:string = 'json') {
            if(this.pre.parent('.slimScrollDiv').length > 0) {
                this.pre.unwrap();
                this.panel.find('.slimScrollDiv, .slimScrollBar, .slimScrollRail').remove();
            }
            var id:string = slug(name);
            this.codes[id].code.remove();
            this.codes[id].code = cre('code').appendTo(this.pre).addClass('hljs lang-' + lang).html(hljs.highlight(lang, code).value)
            this.pre.slimScroll(<any> { height: 600, distance: '1px', color: '#A6BFD8', alwaysVisible: true });
            return this;

        }

        function _addCode(name:string, code:string, lang:string = 'json', showTitle:boolean=false) {
            var id:string = slug(name);
            this.codes[id] = { title: cre('h5').appendTo(this.pre).text(name), code: cre('code') };
            !showTitle && this.codes[id].title.hide();
            _setCode.call(this, name, code, lang);
            return this;
        }
    }
}
