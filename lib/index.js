var path = require('path');
var fs = require('fs');
var util = require('util');
var dotenv = require('dotenv');
var _ = require('lodash');
var Mockaroo = require('mockaroo');

var getEnvFileVars = exports.getEnvFileVars = function () {
    var filePath = path.join(__dirname, '..', '..', '..', '..', '.env');
    var env = {};
    if(fs.existsSync(filePath)){
        var buf = new Buffer(fs.readFileSync(filePath, 'utf8'));
        env = dotenv.parse(buf);
    }
    return env;
};

var getSchema = exports.getSchema = function(schema, opts) {
    opts = opts || {};

    var client = new Mockaroo.Client({
        apiKey: getEnvFileVars()['MOCKAROO_API']
    });

    return client.generate(_.merge({
        schema: schema
    }, opts))
};
