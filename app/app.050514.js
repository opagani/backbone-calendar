define(function(require, exports, module) {

    var Backbone = require('backbone'),
        CalendarView = require('views/calendar'),
        DaemonView = require('views/daemon');

    module.exports = Backbone.View.extend({
        initialize: function() {
            this.calendar = new CalendarView();
            this.daemon = new DaemonView();
        }
    });
});