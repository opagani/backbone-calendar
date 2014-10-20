define(function(require, exports, module) {
    
    var Backbone = require('backbone'),
        $ = require('jquery'),
        App = require('app');


    $(function() {
        window.BackboneCalendar = new App();
    });
});