define(function(require, exports, module) {

    var $ = require('jquery'),
        Backbone = require('backbone'),
        jQueryUI = require('jqueryui'),
        Combobox = require('combobox'),
        DialogCollection = require('collections/dialog'),
        DialogModel = require('models/dialog'),
        DialogEventModel = require('models/dialogEvent'),
        DialogEventView = require('views/dialogEvent'),
        DialogPluginModel = require('models/dialogPlugin'),
        DialogPluginView = require('views/dialogPlugin');


    module.exports = Backbone.View.extend({
        className: 'dialog',

        initialize: function(options) {
            if (!this.model) {
                throw new Error('You must provide a Dialog model');
            }

            this.childViews = [];
            this.createDialogEvent(options);

            this.listenToOnce(this.dialogEventView, 'initialized', function() {
                this.createDialogPlugin();
                this.render();
            });
        },

        createDialogEvent: function(options) {
            this.dialogEventModel = new DialogEventModel();

            this.dialogEventView = new DialogEventView({ 
                model: this.dialogEventModel, 
                eventId: options.eventId,
                type: options.type,
                dayType: options.dayType,
                date: options.date,
                startDate: options.startDate
            });

            this.childViews.push(this.dialogEventView);
        },

        createDialogPlugin: function() {
            this.dialogPluginModel = new DialogPluginModel();

            this.dialogPluginView = new DialogPluginView({
                model: this.dialogPluginModel,
                type: this.dialogEventModel.get('_type'),
                pluginId: this.dialogEventModel.get('plugin_id'),
                pluginName: this.dialogEventModel.get('plugin_name'),
            });

            this.childViews.push(this.dialogPluginView);
        },

        render: function() {
            var that = this,
                buttons = {};

            this._type = this.dialogEventModel.get('_type');

            if (!this._type) {  // New Event
                buttons = { 
                    Cancel: function() {
                        that.removeViews();
                        var refModel = that.model;
                        that.model.trigger('destroy', refModel);
                    },
                    Create: function() {
                        that.create();
                    }
                };
            } else if (this._type === 'History') {
                buttons = {
                    Close: function() {
                        that.removeViews();
                        var refModel = that.model;
                        that.model.trigger('destroy', refModel);
                    }
                };
            } else { // DailyEvent
                buttons = { 
                    Delete: function() {
                        that.delete();
                    },
                    //Replace: function() {
                    //    that.replace();
                    //},
                    Cancel: function() {
                        that.removeViews();
                        var refModel = that.model;
                        that.model.trigger('destroy', refModel);
                    },
                    Save: function() {                       
                        that.save();
                    }
                };
            }

            var dialogWidget = this.$el.dialog({
                resizable: false,
                height: 750,
                width: 650,
                close: function() { 
                    $(this).dialog('destroy');
                },
                buttons: buttons,
                open: function() { 
                    $(this).closest('.ui-dialog').find('.ui-dialog-buttonpane button:last-of-type').focus(); 
                } 
            });

            this.renderDialogEventView();
            this.listenToOnce(this.dialogPluginView, 'initialized', this.renderDialogPluginView);
        },

        renderDialogEventView: function() {
            this.$el.append(this.dialogEventView.render().el);
        },

        renderDialogPluginView: function() {
            this.$el.append(this.dialogPluginView.render().el);
            $('.dialog input, .dialog textarea, .dialog select').addClass('text ui-widget-content ui-corner-all');
        },

        getDialogFieldValues: function() {
            var values = {},
                plugin_info = {};

            $('.dialog-event input, .dialog-event select').each(function(i, el) {
                if (el.name) {
                    values[el.name] = $(el).val();
                }
            });
            values.time = this.$('.custom-combobox-input').val();
            values.date = this.$('.date').val();
            return values;
        },

        getPluginInfo: function() {
            var values = {};

            $('.dialog-plugin input, .dialog-plugin textarea').each(function(i, el) {
                if (el.name) {
                    values[el.name] = $(el).val();
                }
            });
            return values;
        },

        updatePluginInfo: function(pluginInfo) {
            var that = this;

            $.ajax({
                type: 'POST',
                url: '/data/update_plugin_info',
                data: {
                    plugin_name: that.dialogEventModel.get('plugin_name'),
                    plugin_id: that.dialogEventModel.get('plugin_id'),
                    config: JSON.stringify(pluginInfo)
                }
            });
        },

        create: function() {
            var values = this.getDialogFieldValues(),
                pluginInfo = { plugin_info: this.getPluginInfo() };

            var extraArgs = {
                '_type': 'DailyEvent'
            };

            if (values.day_type !== 'single') {
                extraArgs.date = this.dialogEventModel.get('date');
            }

            this.model.save(_.extend(values, pluginInfo, extraArgs), { url: '/event/create' });
            this.removeViews();
            window.location.reload();
        },

        delete: function() {
            this.removeViews();
            this.model.destroy({
                url: '/event/delete/' + this.model.get('event_id'),
                data: {
                    'id': this.model.get('event_id')
                }
            });
            window.location.reload();
        },

        replace: function() {
            var values = this.getDialogFieldValues(),
                pluginInfo = { plugin_info: this.getPluginInfo() },
                extraArgs = {
                    'day_type': 'single',
                    'single_date': this.dialogEventModel.get('single_date')
                };

            this.model.save(_.extend(values, pluginInfo, extraArgs), { url: '/data/replace_daily_with_single' });
            this.removeViews();
            window.location.reload();
        },

        save: function() {
            var that = this,
                args = this.getDialogFieldValues();
                pluginInfo = this.getPluginInfo();

            if (args.day_type !== 'single') {
                args.date = this.dialogEventModel.get('date');
            }

            this.model.set('day_type', this.dialogEventModel.get('day_type'));
            this.model.save(args, { 
                url: '/event/update',
                success: function() {
                    //that.updatePluginInfo(pluginInfo);
                    that.removeViews();
                    window.location.reload();
                }
            });
        },

        removeViews: function() {
            if (this.childViews) {
                _.each(this.childViews, function(childView) {
                    console.log(childView);
                    childView.remove();
                });              
            }
            this.remove();
        }
    });
});