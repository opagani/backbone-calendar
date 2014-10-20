define(function(require, exports, module) {

    var Backbone = require('backbone'),
        $ = require('jquery'),
        CalendarView = require('views/calendar'),
        DaemonView = require('views/daemon');

    module.exports = Backbone.View.extend({
        initialize: function() {
            this.calendar = new CalendarView();
            $('#main').html(this.calendar.render().$el);
            //this.daemon = new DaemonView();
        }
    });
});