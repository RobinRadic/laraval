var path = require('path'),
    util = require('util'),
    fs   = require('fs');

var grunt = require('grunt');
var lib = require('./lib');



module.exports = function (_grunt) {
    grunt = _grunt;

    function asset(file) {
        return path.join('resources', 'assets', file);
    }

    var vfile = asset('jquery.validate.laravel');
    var demoTsSrc = [
        asset('demo/@init.ts'),
        asset('demo/**/*.ts'),
        asset('demo.ts')
    ];
    var tsSrc = [
        asset('lib/@init.ts'),/*
        asset('lib/util/*.ts'),
        asset('lib/widget.ts'),
        asset('lib/methods.php.ts'),
        asset('lib/methods.validate.ts'),
        asset('lib/methods.laravel.ts'),*/
        vfile + '.ts'
    ];
    var schemaPath = asset('demo-data.json');

    var config = {
        target : {
            vfile: vfile,
            asset: asset
        },
        umd    : {
            validator: {
                src : vfile + '.js', dest: vfile + '.js', //objectToExport: '$', //globalAlias: 'jquery',
                deps: {
                    'default': ['$'],
                    amd      : ['jquery'],
                    cjs      : ['jquery'],
                    global   : [{jQuery: '$'}]
                }
            }
        },
        sass   : {
            options: {sourcemap: true, style: 'expanded'},
            demo   : {files: {'<%= target.asset("demo.css") %>': '<%= target.asset("demo.scss") %>'}}
        },
        uglify : {
            validator: {files: {'<%= target.vfile %>.min.js': [asset('vendor/jquery-ui/ui/widget.js'), '<%= target.vfile %>.js']}}
        },
        ts     : {
            options: {compiler: './node_modules/.bin/tsc', module: 'commonjs', experimentalDecorators: true, target: 'es5', declaration: false, sourceMap: true},
            demo   : {options: {declaration: true}, src: demoTsSrc, out: asset('demo.js')},
            dev    : {options: {declaration: true}, src: tsSrc, out: vfile + '.dev.js'},
            dist   : {options: {sourceMap: false}, src: tsSrc, out: vfile + '.js'}
        },
        typedoc: {
            options  : {target: 'es5', mode: 'file', hideGenerator: '', experimentalDecorators: '', includeDeclarations: '', readme: 'README.md'},
            validator: {
                options: {out: 'docs/jquery.validate.laravel', name: 'Laravel jQuery Validator API Documentation', ignoreCompilerErrors: ''}, //readme: 'docs/packadic.md', excludeExternals: '',
                src    : ['resources/assets/**/*.ts', '!resources/assets/jquery.validate.laravel.d.ts']
            }
        },
        watch  : {
            options   : {livereload: true},
            umd_uglify: {files: [vfile + '.js'], tasks: ['umd:validator', 'uglify:validator']},
            ts        : {files: [vfile + '.ts', asset('lib/**/*.ts')], tasks: ['ts:dev']},
            ts_demo   : {files: demoTsSrc, tasks: ['ts:demo']},
            sass      : {files: [asset('demo.css')], tasks: ['sass:demo']}
        }
    };

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    grunt.initConfig(config);


    [
        ['gen:json', 'Generate json', function () {
            var taskDone = this.async();
            grunt.log.writeln('Downloading schema data. Please hold on...');
            lib.getSchema('radic', {
                count: 1000
            }).then(function (data) {
                fs.writeFileSync(schemaPath, JSON.stringify(data));
                grunt.log.ok('Schema data saved to ' + schemaPath);
                taskDone();
            })
        }],
        ['build', 'Build all', ['ts', 'umd:validator', 'uglify:validator', 'sass:demo']],
        ['default', 'Default task (build)', ['build']]
    ].forEach(function (task) {
        grunt.registerTask(task[0], task[1], task[2]);
    })
}
;
