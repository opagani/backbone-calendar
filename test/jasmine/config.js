require.config({
    deps: ['../test/jasmine/SpecRunner'],

    baseUrl: '/webui/app/',

    paths: {
        jquery: '/webui/bower_components/jquery/jquery',
        underscore: '/webui/bower_components/lodash/lodash',
        backbone: '/webui/bower_components/backbone-amd/backbone',
        jqueryui: '/webui/bower_components/jquery-ui/ui/jquery-ui',
        tpl: '/webui/bower_components/requirejs-tpl/tpl',
        fullcalendar: '/webui/js/lib/fullcalendar/fullcalendar.min',
        date: '/webui/js/lib/date',
        combobox: '/webui/js/lib/combobox'
    },
    
    shim: {
        jqueryui: 'jquery',
        fullcalendar: 'jquery',
        date: 'jquery',
        combobox: ['jquery', 'jqueryui']
    }
});