define(function(require, exports, module) {

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        jQueryUI = require('jqueryui'),
        DialogPluginModel = require('models/dialogPlugin'),
        DialogPluginView = require('views/dialogPlugin');

    module.exports = Backbone.View.extend({
        className: 'dialog-plugin',

        template: require('tpl!templates/dialogPlugin.ejs'),

        initialize: function(options) {
            var that = this,
                url = '';

            if (!this.model) {
                throw new Error('You must provide a DialogPlugin model');
            }

            if (!options.type) {  // new event
                setTimeout(function() {
                    that.trigger('initialized');
                }, 100);
            } else {
                if (options.type !== 'History') {
                    url = '/data/get_plugin';
                } else {
                    url = '/data/get_plugin_history';
                }
            
                this.model.fetch({
                    url: url,
                    data: {
                        plugin_id: options.pluginId,
                        plugin_name: options.pluginName
                    },
                    success: function() {
                        that.trigger('initialized');
                    }
                });
            }
        },

        render: function() {
            this.$el.html(this.template(this));
            return this;
        }
    });
});