
// plugin decorator
module validateLaravel {

    /**
     * @private
     * @type {string}
     */
    export var namespacePrefix:string = 'laravel.';

    /**
     * The @plugin decorator registers a plugin
     * ```typescript
     * module validateLaravel {
     *      @plugin('code-block')
     *      export class LayoutExtension extends Extension {
     *            init(){
     *                console.log('init layout extension');
     *            }
     *            boot(){
     *                console.log('booting layout extension');
     *            }
     *       }
     * }
     * ```
     * @param name
     * @param regOpts
     * @returns {function(plugins.Plugin): void}
     */
    export function plugin(name:string, regOpts:any = {}):(cls:typeof Plugin)=>void {
        return (cls:typeof Plugin):void => {
            registerPlugin(name, cls, regOpts);
        };
    }

    export interface IPluginRegisterOptions {
        'namespace'?:string;
        'class'?:any;
        'name'?:string;
        'callback'?:Function,
        'loadPath'?:string;
    }

    /**
     * The Plugin class is a base class for jQuery plugins.
     *
     * @class Plugin
     */
    export class Plugin {
        public get options():any {
            return this._options;
        }

        public static defaults:any = {};

        public VERSION:string = '0.0.0';
        public NAMESPACE:string;

        public enabled:boolean = true;
        public _options:any;
        public $win:JQuery;
        public $doc:JQuery;
        public $body:JQuery;
        public el:HTMLElement;
        public $el:JQuery;

        constructor(element:any, options:any, ns:string) {
            this._options = options;
            this.$win = $(window);
            this.$doc = $(document);
            this.$body = $(document.body);
            this.el = element;
            this.$el = $(element);
            this.NAMESPACE = ns;
            this._trigger('create');
            this._create();
            this._trigger('created');
        }

        public instance():Plugin {
            return this;
        }


        protected _create() {
        }

        protected _destroy() {
        }

        public destroy() {
            this._trigger('destroy');
            this._destroy();
            this._trigger('destroyed');
        }


        public _trigger(name:string, extraParameters?:any[]|Object):Plugin {
            var e:JQueryEventObject = $.Event(name + '.' + this.NAMESPACE);
            this.$el.trigger(e, extraParameters);
            return this;
        }


        public _on(name:string, cb:any):Plugin;
        public _on(name:string, sel?:string, cb?:any):Plugin;
        public _on(...args:any[]):any {
            args[0] = args[0] + '.' + this.NAMESPACE;
            this.$el.on.apply(this.$el, args);
            return this;
        }


    }

    var defaultRegOpts:IPluginRegisterOptions = {
        loadPath: 'app/plugins/',
        callback: $.noop()
    };

    function makeRegOptions(name:string, pluginClass:any, regOpts?:IPluginRegisterOptions):IPluginRegisterOptions {
        regOpts = <IPluginRegisterOptions> $.extend(true, this.defaultRegOpts, {'class': pluginClass}, regOpts);
        if (typeof regOpts.namespace !== 'string') {
            regOpts.namespace = name;
        }
        regOpts.namespace = namespacePrefix + regOpts.namespace;
        return regOpts;
    }

    function registerPlugin(name:string, pluginClass:typeof Plugin, opts:IPluginRegisterOptions = {}) {
        var regOpts:IPluginRegisterOptions = <IPluginRegisterOptions> $.extend(true, {}, makeRegOptions(name, pluginClass), opts);

        function jQueryPlugin(options?:any, ...args:any[]) {
            var all:JQuery = this.each(function () {
                var $this:JQuery = $(this);
                var data:any = $this.data(regOpts.namespace);
                var opts:any = $.extend({}, pluginClass.defaults, $this.data(), typeof options == 'object' && options);

                if (!data) {
                    $this.data(regOpts.namespace, (data = new pluginClass(this, opts, regOpts.namespace)));
                }


                if (typeof(options) === 'string') {
                    data[options].call(data, args);
                }

                if (typeof(regOpts.callback) === 'function') {
                    regOpts.callback.apply(this, [data, opts]);
                }
            });


            if (typeof(options) === 'string' && options === 'instance' && all.length > 0) {
                if (all.length === 1) {
                    return $(all[0]).data(regOpts.namespace);
                } else {
                    var instances:Plugin[] = [];
                    all.each(function () {
                        instances.push($(this).data(regOpts.namespace));
                    });
                    return instances;
                }
            }

            return all;
        }

        var old:any = $.fn[name];
        $.fn[name] = jQueryPlugin;
        $.fn[name].Constructor = pluginClass;
    }

}
