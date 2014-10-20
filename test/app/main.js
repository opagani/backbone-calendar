define([
    'test/app-spec',
    'test/views/calendar-view-spec',
    'test/views/dialog-view-spec',
    'test/views/dialogEvent-view-spec',
    'test/views/dialogPlugin-view-spec'
    //'test/views/daemon-view-spec'
],function(){
    if (window.mochaPhantomJS) {
        window.mochaPhantomJS.run();
    } else {
        window.mocha.run();
    }
});