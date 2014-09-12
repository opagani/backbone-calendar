config =
  cssmin:
    compress:
      files:
        'css/scheduler.css': [
          'css/login.css',
          'css/fullcalendar.css'
          'css/calendar.css'
          'css/dialog.css'
          'css/combobox.css'
          'css/app.css'
        ]
      options:
        keepSpecialComments: 0

  requirejs:
    compile:
      options:
        mainConfigFile: 'app/config.js'
        name: 'config'
        out: 'app/scheduler.js'
        optimize: 'uglify2'
        wrap: false
        preserveLicenseComments: false
        almond: true

  jshint:
    files: ['Gruntfile.js', 'app/**/*.js', 'test/app/**/*.js', '!app/scheduler.js']
    options:
      curly: true
      eqeqeq: true
      eqnull: true
      browser: true
      globals:
        jQuery: true

  watch:
    options:
      livereload: true
    app:
      files: 'app/**/*.js'
      tasks: ['newer:requirejs']
      options:
        interrupt: true
        spawn: false
    css:
      files: 'css/*.css'
      tasks: ['newer:cssmin']
      options:
        interrupt: true
        spawn: false
    jshint:
      files: '<%= jshint.files %>',
      tasks: ['newer:jshint:files']

  nodemon:
    main: {}
    debug:
      options:
        nodeArgs: ['--debug']
            
  concurrent:
    main:
      tasks: ['nodemon', 'watch']
      options:
            logConcurrentOutput: true
    debug:
        tasks: ['nodemon:debug', 'watch']
        options:
            logConcurrentOutput: true

  mocha:
    test:
      src: ['test/*.html']
      options:
        reporter: 'Nyan'

module.exports = (grunt) ->

  require('time-grunt')(grunt);

  grunt.initConfig(config)

  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-requirejs')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-concurrent')
  grunt.loadNpmTasks('grunt-newer')
  grunt.loadNpmTasks('grunt-mocha')

  grunt.registerTask('compile', ['newer:cssmin', 'newer:requirejs', 'newer:jshint'])
  grunt.registerTask('default', ['compile'])
  grunt.registerTask('devel', ['compile', 'concurrent'])
  grunt.registerTask('devel:debug', ['compile', 'concurrent:debug'])
  grunt.registerTask('test', ['compile', 'mocha'])