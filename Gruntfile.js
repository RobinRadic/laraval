var path = require('path'),
    util = require('util'),
    fs   = require('fs');

var grunt = require('grunt');



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
        asset('lib/@init.ts'),
        asset('lib/php.ts'),
        asset('lib/validator.ts'),
        //asset('lib/mimes.ts'),
        asset('lib/messages.ts'),
        vfile + '.ts',
        asset('lib/~bootstrap.ts')
    ];
    var schemaPath = asset('demo-data.json');

    var config = {
        target  : {
            vfile: vfile,
            asset: asset
        },
        umd     : {
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
        copy: {
            docdemo: { cwd: 'resources/assets', src: ['demo.{css,js}', 'demo-data.json', 'jquery.validate.laravel.js', 'index.html'], dest: 'gh-pages/demo/', expand: true}
        },
        sass    : {
            options: {sourcemap: true, style: 'expanded'},
            demo   : {files: {'<%= target.asset("demo.css") %>': '<%= target.asset("demo.scss") %>'}}
        },
        uglify  : {
            validator: {files: {'<%= target.vfile %>.min.js': ['<%= target.vfile %>.js']}}
        },
        bytesize: {validator: {src: [vfile + '.min.js', vfile + '.js']}},
        ts      : {
            options: {compiler: './node_modules/.bin/tsc', module: 'commonjs', experimentalDecorators: true, target: 'es5', declaration: false, sourceMap: true},
            demo   : {options: {declaration: true}, src: demoTsSrc, out: asset('demo.js')},
            dev    : {options: {declaration: true}, src: tsSrc, out: vfile + '.dev.js'},
            dist   : {options: {sourceMap: false}, src: tsSrc, out: vfile + '.js'}
        },
        typedoc : {
            options  : {target: 'es5', mode: 'file', hideGenerator: '', experimentalDecorators: '', includeDeclarations: '', readme: 'README.md'},
            validator: {
                options: {out: 'docs/jquery.validate.laravel', name: 'Laravel jQuery Validator API Documentation', ignoreCompilerErrors: ''}, //readme: 'docs/packadic.md', excludeExternals: '',
                src    : ['resources/assets/**/*.ts', '!resources/assets/jquery.validate.laravel.d.ts']
            }
        },
        watch   : {
            options   : {livereload: true},
            umd_uglify: {files: [vfile + '.js'], tasks: ['umd:validator', 'uglify:validator']},
            ts        : {files: [vfile + '.ts', asset('lib/**/*.ts')], tasks: ['ts:dev']},
            ts_demo   : {files: demoTsSrc, tasks: ['ts:demo']},
            sass      : {files: [asset('demo.scss')], tasks: ['sass:demo']}
        }
    };

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    grunt.initConfig(config);


    [
        ['build:dev', 'Build dev version', ['ts:dev', 'umd:validator']],
        ['build:demo', 'Build demo stuff', ['ts:demo', 'sass:demo']],
        ['build', 'Build all', ['build:dev', 'build:demo']],
        ['dist', 'Build dist version', ['ts:dist', 'umd:validator', 'uglify:validator']],
        ['default', 'Default task (build)', ['build']]
    ].forEach(function (task) {
        grunt.registerTask(task[0], task[1], task[2]);
    })
}
;
