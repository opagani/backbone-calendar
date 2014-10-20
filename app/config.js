require.config({
    
    deps: ['main'],

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
        parsley: '/lib/parsley'

    },
    
    shim: {
        jqueryui: 'jquery',
        fullcalendar: 'jquery',
        date: 'jquery',
        combobox: ['jquery', 'jqueryui'],
        bootstrap: 'jquery',
        parsley: 'jquery',
    }
});