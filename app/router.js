define(function(require, exports, module) {

    var Backbone = require('backbone'),
        _ = require('underscore'),
        CalendarView = require('views/calendar'),
        LoginView = require('views/login');

    module.exports = Backbone.Router.extend({
        routes: {
            '': 'login',
            'login': 'login',
            'logout': 'logout',
            'calendar': 'calendar'
        },

        initialize: function(){
            _.bindAll(this);
        },

        login: function() {
            var loginView = new LoginView();
            this.changeView(loginView);
        },

        logout: function() {
            alert("inss");
            var that = this;

            Backbone.history.navigate('login', true);

            $.ajax({
                url: '/login',
                type: 'POST',
                username: 'logout',
                password: 'logout',
                success: function () { 
                    Backbone.history.navigate('login', true);
                }
            });
        },

        calendar: function() {
            this.calendarView = new CalendarView();
            this.changeView(this.calendarView);
        },

        changeView : function(view) {
            if (this.currentView) {
                if (this.currentView.childViews) {
                    _.each(this.currentView.childViews, function(childView) {
                        console.log(childView);
                        childView.remove();
                    })                
                }
                this.currentView.remove();
            }

            this.currentView = view;
            $('#main').html(view.render().$el);
        }
    });
});