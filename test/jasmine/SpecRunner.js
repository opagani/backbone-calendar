define(function(require, exports, module) {

    var $ = require('jquery')
      , Backbone = require('backbone')
      , JasmineHtml = require('jasmine-html');

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;
 
    var htmlReporter = new jasmine.HtmlReporter();
 
    jasmineEnv.addReporter(htmlReporter);
 
    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };
 
    var specs = [];
 
    //specs.push('spec/models/TodoSpec');
    specs.push('spec/views/calendar');
    specs.push('spec/views/dialog');
 
    $(function(){
        require(specs, function(){
            jasmineEnv.execute();
        });
    });
});