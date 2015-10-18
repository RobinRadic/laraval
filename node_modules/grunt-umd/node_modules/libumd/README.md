[![build status](https://secure.travis-ci.org/bebraw/libumd.png)](http://travis-ci.org/bebraw/libumd)

# libumd - Wraps given JavaScript code with UMD

## Usage

```js
var umdify = require('libumd');

...

var result = umdify(js, options);
```

options (all are optional by default):

```js
{
    template: 'path to template or template name', // defaults to 'umd'
    amdModuleId: 'test', // optional AMD module id. defaults to anonymous (not set)
    globalAlias: 'alias', // name of the global variable
    deps: { // dependencies - `default` acts as a fallback for each!
        'default': ['foo', 'bar'],
        amd: ['foobar', 'barbar'],
        cjs: ['foo', 'barbar'],
        global: ['foobar', {depName: 'param'}]
    }
}
```

> Note! `libumd` doesn't guarantee pretty formatting. It is better to use something like [js-beautify](https://www.npmjs.com/package/js-beautify) to deal with that.

## Default Templates

The library comes with a couple of UMD variants. See `/templates`. In addition you may use one of your own as long as it is formatted using Handlebars syntax and follows the same naming conventions as the ones provided with the project.

## Testing

Make sure [PhantomJS](http://phantomjs.org/) is installed and it's within your PATH. Hit `npm test` after that. If the UMD wrapper fails to run against the headless browser, you'll know.

## Contributors

* [Stéphane Bachelier](https://github.com/stephanebachelier) - Use existing `objectToExport` instead of hardcoded value `returnExportsGlobal` for AMD

## License

`libumd` is available under MIT. See LICENSE for more details.

