module.exports = function(grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssmin: {
            compress: {
                files: {
                    'public/build/backbone-calendar.css': [
                        'public/css/login.css',
                        'public/css/font-awesome.css',
                        'public/css/fullcalendar.css',
                        'public/css/calendar.css',
                        'public/css/dialog.css',
                        'public/css/combobox.css',
                        'public/css/app.css'
                    ]
                },
                options: {
                    keepSpecialComments: 0
                }
            }
        },

        requirejs: {
            compile: {
                options: {
                    mainConfigFile: 'app/config.js',
                    name: 'config',
                    out: 'public/build/backbone-calendar.js',
                    optimize: 'uglify2',
                    wrap: false,
                    preserveLicenseComments: false,
                    almond: true
                }
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'app/**/*.js', 'test/app/**/*.js', '!public/build/backbone-calendar.js'],
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                  jQuery: true,
                }
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            app: {
                files: 'app/**/*.js',
                tasks: ['newer:requirejs'],
                options: {
                    interrupt: true,
                    spawn: false
                }
            },
            css: {
                files: 'css/*.css',
                tasks: ['newer:cssmin'],
                options: {
                    interrupt: true,
                    spawn: false
                }
            },
            jshint:{
                files: '<%= jshint.files %>',
                tasks: ['newer:jshint:files']
            },
            server: {
                files: ['.rebooted']
            } 
        },

        // Watches back-end files for changes, restarts the server
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    env: {
                        PORT: 3000
                    },
                    ext: 'js,ejs,html',
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });

                        // opens browser on initial server start
                        nodemon.on('config:update', function () {
                            // Delay before server listens on port
                            setTimeout(function() {
                                require('open')('http://localhost:3000');
                            }, 1000);
                        });

                        // refreshes browser when server reboots
                        nodemon.on('restart', function () {
                            // Delay before server listens on port
                            setTimeout(function() {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    }
                }
            }
        },

        // Allows us to run watch and nodemon concurrently with logging
        concurrent: {
            dev: {
                tasks: ['nodemon:dev', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        mocha: {
            test: {
                src: ['test/*.html'],
                options: {
                    reporter: 'Nyan',
                    logErrors: true,
                    ui: 'bdd'
                }
            }
        },

        jasmine: {
            test: {
                src : 'app/**/*.js',
                options : {
                    specs : 'test/jasmine/spec/**/*.js',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: {
                            requireConfig: {
                                File: ['app/config.js', 'test/jasmine/config.js']
                            }
                        }
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('compile', ['newer:cssmin', 'newer:requirejs', 'newer:jshint']);
    grunt.registerTask('default', ['compile']);
    grunt.registerTask('devel', ['compile', 'concurrent']);
    grunt.registerTask('devel:debug', ['compile', 'concurrent:debug']);
    grunt.registerTask('test', ['compile', 'mocha']);

    // Starts a server and runs nodemon and watch using concurrent
    grunt.registerTask('server', ['concurrent:dev']);
};