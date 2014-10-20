require.config({

    deps: ['test/main'],

    baseUrl: '../app',

    paths: {
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/lodash/lodash',
        backbone: '../bower_components/backbone-amd/backbone',
        jqueryui: '../bower_components/jquery-ui/ui/jquery-ui',
        markdown: '../bower_components/markdown/lib/markdown',
        tpl: '../bower_components/requirejs-tpl/tpl',
        fullcalendar: '../public/lib/fullcalendar/fullcalendar',
        date: '../public/lib/date',
        combobox: '../public/lib/combobox',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',

        test: '../test/app'
    },

    shim: {
        jqueryui: 'jquery',
        fullcalendar: 'jquery',
        date: 'jquery',
        combobox: ['jquery', 'jqueryui'],
        markdown: {
            exports: 'markdown'
        }
    }
});