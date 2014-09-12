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
        fullcalendar: '../js/lib/fullcalendar/fullcalendar',
        date: '../js/lib/date',
        combobox: '../js/lib/combobox',

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