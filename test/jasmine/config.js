require.config({
    deps: ['../test/jasmine/SpecRunner'],

    baseUrl: '/app',

    paths: {
        jquery: '/bower_components/jquery/jquery',
        underscore: '/bower_components/lodash/lodash',
        backbone: '/bower_components/backbone-amd/backbone',
        jqueryui: '/bower_components/jquery-ui/ui/jquery-ui',
        tpl: '/bower_components/requirejs-tpl/tpl',
        fullcalendar: '/lib/fullcalendar/fullcalendar',
        date: '/lib/date',
        combobox: '/lib/combobox',
        bootstrap: '/bower_components/bootstrap/dist/js/bootstrap',
        jasmine: '../test/jasmine/lib/jasmine-1.3.1/jasmine',
        'jasmine-html': '../test/jasmine/lib/jasmine-1.3.1/jasmine-html',
        spec: '../test/jasmine/spec'
    },
    
    shim: {
        jqueryui: 'jquery',
        fullcalendar: 'jquery',
        date: 'jquery',
        combobox: ['jquery', 'jqueryui'],
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
});