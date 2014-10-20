require.config({
    deps: ['../test/jasmine/SpecRunner'],

    baseUrl: '/app/',

    paths: {
        jquery: '/bower_components/jquery/jquery',
        underscore: '/bower_components/lodash/lodash',
        backbone: '/bower_components/backbone-amd/backbone',
        jqueryui: '/bower_components/jquery-ui/ui/jquery-ui',
        tpl: '/bower_components/requirejs-tpl/tpl',
        fullcalendar: '/lib/fullcalendar/fullcalendar.min',
        date: '/lib/date',
        combobox: '/lib/combobox'
    },
    
    shim: {
        jqueryui: 'jquery',
        fullcalendar: 'jquery',
        date: 'jquery',
        combobox: ['jquery', 'jqueryui']
    }
});