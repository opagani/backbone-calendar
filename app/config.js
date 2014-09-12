require.config({
    
    deps: ['main'],

    paths: {
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/lodash/lodash',
        backbone: '../bower_components/backbone-amd/backbone',
        jqueryui: '../bower_components/jquery-ui/ui/jquery-ui',
        tpl: '../bower_components/requirejs-tpl/tpl',
        fullcalendar: '../js/lib/fullcalendar/fullcalendar',
        date: '../js/lib/date',
        combobox: '../js/lib/combobox',
        //parsley: '../node_modules/parsleyjs/dist/parsley',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        parsley: '../js/lib/parsley'

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