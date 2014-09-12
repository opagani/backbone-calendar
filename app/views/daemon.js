define(function(require, exports, module) {

    var $ = require('jquery'),
        Backbone = require('backbone');

    module.exports = Backbone.View.extend({
        className: 'daemon-status-container',

        events: {
            'click .logout': 'logout'
        },

        initialize: function() {
            var that = this;

            $(window).on('focus', function() { 
                that.render();
            });

            this.$el.insertBefore($('.fc-header-right :first-child')[0]);
            this.render();
        },

        render: function() {
            var that = this;
    
            $.ajax({
                url: '/data/is_daemon_alive',
            }).done(function(data) {
                var statusClass = data.success ? 'daemon-status-running' : 'daemon-status-dead',
                    textContent = data.success ? 'Running' : 'Dead';

                that.$el.empty();  // remove all child nodes of the view container 'el' from the DOM
                //that.$el.append('<span class="logout"><a href="#login">Logout   </a></span>');
                that.$el.append('<span class="daemon-status-prefix">Daemon: </span>');
                that.$el.append('<span class=' + statusClass + '>' + textContent + '</span>');
            }).fail(function(data) {
                that.$el.empty();
                that.$el.append('<span class="daemon-status-dead">' +
                                'Error: could not retrieve daemon status from server</span>');
            });
        },

        logout: function() {
            Backbone.history.navigate('logout', true);
        }
    });
});