define(function(require, exports, module) {

    var $ = require('jquery'),
        Backbone = require('backbone'),
        bootstrap = require('bootstrap');

    module.exports = Backbone.View.extend({
        className: 'logout-container',

        events: {
            'click .logout': 'logout'
        },

        initialize: function() {
            this.$el.insertAfter($('.fc-header-right :last-child')[0]);
            this.$el.append('<span class="logout"><a>Logout</a></span>');
            this.render();
        },

        render: function() {
            console.log("logout view render");
        },

        logout: function() {
            Backbone.history.navigate('logout', true);
        }
    });
});