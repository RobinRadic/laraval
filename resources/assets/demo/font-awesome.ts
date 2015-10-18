module demo.util {
    export class FaviconAwesome {
        icon:string;
        color:string;
        bg:string;


        constructor(icon:string, color:string, bg?:string) {
            this.icon = icon;
            this.color = color;
            this.bg = bg;

        }

        protected getContext(canvas:HTMLCanvasElement, w:number) {
            canvas.width = canvas.height = w;
            var context = canvas.getContext('2d');
            context.font = 'normal normal normal 32px/' + w + 'px FontAwesome';
            context.textBaseline = 'middle';
            return context;
        }

        public inject():HTMLLinkElement {
            var container:HTMLDivElement = document.createElement('div'),
                span:HTMLSpanElement = document.createElement('span'),
                link:HTMLLinkElement = document.createElement('link'),
                canvas:HTMLCanvasElement = document.createElement('canvas'),
                body:HTMLElement = document.body,
                content,
                context = this.getContext(canvas, 32),
                iconWidth;

            if (!window.getComputedStyle || !canvas.toDataURL || !document.querySelectorAll)
                return;

            container.style.display = 'none';
            span.className = 'fa fa-' + this.icon.replace(/^fa-/, '');
            container.appendChild(span);
            body.appendChild(container);
            content = window.getComputedStyle(span, ':before').getPropertyValue('content').replace(/'/g, '');
            body.removeChild(container);
            iconWidth = context.measureText(content).width;
            if (iconWidth > canvas.width)
                context = this.getContext(canvas, iconWidth);
            if (this.bg) {
                context.rect(0, 0, canvas.width, canvas.height);
                context.fillStyle = this.bg;
                context.fill();
            }
            context.fillStyle = this.color;
            context.fillText(content, (canvas.width - iconWidth) / 2, canvas.height / 2);
            link.setAttribute('rel', 'icon');
            link.setAttribute('type', 'image/png');
            link.setAttribute('href', canvas.toDataURL('image/png'));
            for (var icons = document.querySelectorAll('link[rel*=icon]'), i = 0, l = icons.length; i < l; i++)
                icons[i].parentNode.removeChild(icons[i]);
            document.getElementsByTagName('head')[0].appendChild(link);
            return link;
        }
    }
}
