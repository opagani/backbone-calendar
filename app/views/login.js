define(function(require, exports, module) {

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        jQueryUI = require('jqueryui'),
        bootstrap = require('bootstrap'),
        parsley = require('parsley'),
        LoginView = require('views/login');

    module.exports = Backbone.View.extend({
        template: require('tpl!templates/login.ejs'),

        events: {
            'click #login-btn': 'doLogin',
            'keyup #login-password-input': 'onPasswordKeyup'
        },

        render: function() {
            this.$el.html(this.template(this));
            return this;
        },

        // Allow enter press to trigger login
        onPasswordKeyup: function(evt){
            var k = evt.keyCode || evt.which;

            if (k == 13 && $('#login-password-input').val() === '') {
                evt.preventDefault();    // prevent enter-press submit when input is empty
            } else if (k == 13) {
                evt.preventDefault();
                this.doLogin();            
            }
        },

        doLogin: function(evt) {
            if (evt) {
                evt.preventDefault();
            }

             if (this.$("#login-form").parsley('validate')) {
                var username = this.$("#login-username-input").val(),
                    password = this.$("#login-password-input").val();

                Backbone.history.navigate('calendar', true);

                $.ajax({
                    url: '/login',
                    type: 'POST',
                    username: username,
                    password: password,
                    success: function () { 
                        Backbone.history.navigate('calendar', true);
                    }
                });
            }
        }
    });
});