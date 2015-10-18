'use strict';
var umdify = require('./');


main();

function main() {
    var result = umdify('demo();', {
        deps: {
            'default': ['foobar'],
            'amd': ['foo', 'bar'],
        }
    });

    console.log(result);
}
