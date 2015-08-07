module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: [ 'public/*' ],

        nodemon: {
            server: {
                script: 'server.js',

                options: {
                    watch: [ 'server.js' ]
                }
            }
        },

        shell: {
            webpack: {
                command: 'webpack --config webpack.config.js'
            },

            'webpack-watch': {
                command: 'webpack --config webpack.config.js --watch'
            },

            'hot-server': {
                command: 'webpack-dev-server --hot --inline --host localhost --port 4321 --config webpack.config.js --colors'
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },

            start: {
                tasks: [ 'nodemon', 'shell:webpack-watch' ]
            },

            hot: {
                tasks: [ 'nodemon', 'shell:hot-server' ]
            }
        }
    });

    grunt.registerTask('build', [ 'clean', 'shell:webpack' ]);
    grunt.registerTask('server', [ 'nodemon' ]);
    grunt.registerTask('watch', [ 'clean', 'shell:webpack-watch' ]);
    grunt.registerTask('start', [ 'clean', 'concurrent:start' ]);
    grunt.registerTask('hot', [ 'clean', 'concurrent:hot' ]);
    grunt.registerTask('default', [ 'start' ]);
};