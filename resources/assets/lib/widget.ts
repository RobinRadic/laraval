module validateLaravel {


    /**
     * The @widget decorator registers a widget
     * ```typescript
     * module packadic.extensions {
     *      @extension('code-block', { })
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
     * @param parent
     * @returns {function(packadic.widgets.Widget): void}
     */
    export function widget(name:string, parent?:any):(cls:typeof Widget)=>void {
        return (cls:typeof Widget):void => {
            var obj:Widget = <Widget> new cls;
            if(parent){
                $.widget(obj.namespace + name, <any> obj, parent);
            } else {
                $.widget(obj.namespace + name, <any> obj);
            }
            console.log('Widget', name, 'registered', <any> new cls);
        };

    }


    export class Widget {
        _create():any {
            return undefined;
        }

        _destroy() {
        }

        _init():any {
            return undefined;
        }

        public _delay(fn:any, delay:number):number {
            return undefined;
        }


        public _focusable(element:JQuery):any {
            return undefined;
        }

        public _getCreateEventData():Object {
            return undefined;
        }

        public _getCreateOptions():Object {
            return undefined;
        }

        public _hide(element:JQuery, option:Object, callback:Function):any {
            return undefined;
        }

        public _hoverable(element:JQuery):any {
            return undefined;
        }


        public _off(element:JQuery, eventName:string):any {
            return undefined;
        }

        public _on(element:JQuery|string, handlers:Object):any {
            return undefined;
        }


        public _setOption(key:string, value:Object):any {
            return undefined;
        }

        public _setOptions(options:Object):any {
            return undefined;
        }

        public _show(element:JQuery, option:Object, callback:Function):any {
            return undefined;
        }

        public _super(...arg:any[]) {
        }

        public _superApply(args:any) {
        }

        public _trigger(type:String, args?:any[], data?:Object):any {
            return undefined;
        }

        public destroy() {
        }

        public disable() {
        }

        public enable() {
        }

        public instance():Object {
            return undefined;
        }

        public option(arg:any):any {
            return undefined;
        }


        public element:JQuery;
        public document:JQuery;
        public namespace:string;
        public options:any;
        public uuid:number;
        public version:string;
        public widgetEventPrefix:string;
        public widgetFullName:string;
        public widgetName:string;
        public window:JQuery;

        protected bindings:JQuery;
        protected eventNamespace:string;

        constructor() {
            // remove all members, they are only needed at compile time.
            var myPrototype = (<Function>Widget).prototype;
            $.each(myPrototype, (propertyName, value)=> {
                delete myPrototype[propertyName];
            });
        }
    }
}
