define(function(require, exports, module) {

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        jQueryUI = require('jqueryui'),
        Combobox = require('combobox'),
        DateLib = require('date'),
        DialogEventModel = require('models/dialogEvent'),
        DialogEventView = require('views/dialogEvent');

    module.exports = Backbone.View.extend({
        className: 'dialog-event',

        template: require('tpl!templates/dialogEvent.ejs'),

        events: {
           'change .dayType': 'dayTypeChange'
        },

        initialize: function(options) {
            var that = this,
                url = '',            
                data = {},
                everyDayList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
                                'Saturday', 'Sunday'];
    
            this.dayTypeList = ['Everyday', 'Weekday', 'Weekend', 'Holiday', 'Single'];
            this.dayTypeLogicDict = {
                'everyday': everyDayList,
                'weekday': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                'weekend': ['Saturday', 'Sunday'],
                'holiday': everyDayList,
                'single': [],
            }; 

            if (!this.model) {
                throw new Error('You must provide a DialogEvent model');
            }        

            if (options.eventId) {
                if (options.type !== 'History') {
                    url = '/data/get_event';
                    data.event_id = options.eventId;
                    data.day_type = options.dayType;
                } else {
                    url = '/data/get_historic_event';
                    data.history_id = options.eventId;
                }
                
                this.model.fetch({
                    url: url,
                    data: data,
                    success: function() {
                        that.model.set('single_date', options.startDate);
                        that.trigger('initialized');
                    }
                });
            } else {  // new event
                setTimeout(function() {
                    that.model.set('single_date', options.startDate);
                    that.model.set('time', options.startDate.format('hh:mma'));
                    that.trigger('initialized');
                }, 100);
            }
        },

        render: function() {
            this.setInitialModelValues();

            this.$el.html(this.template(this));

            this.listenTo(this.model, 'change:day_type', function(e) {
                this.hideShowFields();
                this.setStartStopDayOptions(e);
            });

            this.cacheSelectors();

            this.datepicker.datepicker();
            this.combobox.combobox();
            this.comboboxInput = this.$('.custom-combobox-input');
            
            this.initDialogFields();

            return this;                    
        },

        setInitialModelValues: function() {
            var timeList = ['12:00AM', '12:15AM', '12:30AM', '12:45AM',
                    '1:00AM', '1:15AM', '1:30AM', '1:45AM',
                    '2:00AM', '2:15AM', '2:30AM', '2:45AM',
                    '3:00AM', '3:15AM', '3:30AM', '3:45AM',
                    '4:00AM', '4:15AM', '4:30AM', '4:45AM',
                    '5:00AM', '5:15AM', '5:30AM', '5:45AM',
                    '6:00AM', '6:15AM', '6:30AM', '6:45AM',
                    '7:00AM', '7:15AM', '7:30AM', '7:45AM',
                    '8:00AM', '8:15AM', '8:30AM', '8:45AM',
                    '9:00AM', '9:15AM', '9:30AM', '9:45AM',                   
                    '10:00AM', '10:15AM', '10:30AM', '10:45AM',
                    '11:00AM', '11:15AM', '11:30AM', '11:45AM',
                    '12:00PM', '12:15PM', '12:30PM', '12:45PM',
                    '1:00PM', '1:15PM', '1:30PM', '1:45PM',
                    '2:00PM', '2:15PM', '2:30PM', '2:45PM',
                    '3:00PM', '3:15PM', '3:30PM', '3:45PM',
                    '4:00PM', '4:15PM', '4:30PM', '4:45PM',
                    '5:00PM', '5:15PM', '5:30PM', '5:45PM',
                    '6:00PM', '6:15PM', '6:30PM', '6:45PM',
                    '7:00PM', '7:15PM', '7:30PM', '7:45PM',
                    '8:00PM', '8:15PM', '8:30PM', '8:45PM',
                    '9:00PM', '9:15PM', '9:30PM', '9:45PM',                   
                    '10:00PM', '10:15PM', '10:30PM', '10:45PM',
                    '11:00PM', '11:15PM', '11:30PM', '11:45PM'];  

            if (!this.model.get('_type')) {
                this.model.set('labelId', 'Create a new event');
            } else if (this.model.get('_type') === 'History') {
                this.model.set('labelId', 'History ID: ' + this.model.get('id'));
            } else {
                this.model.set('labelId', 'ID: ' + this.model.get('id'));
            }

            this.model.set('dayTypeList', this.dayTypeList);
            this.model.set('startDayList', this.dayTypeLogicDict[this.model.get('day_type')]);
            this.model.set('stopDayList', this.dayTypeLogicDict[this.model.get('day_type')]);
            this.model.set('timeList', timeList);
        },

        cacheSelectors: function() {
            this.dayType = this.$('.dayType');
            this.startDay = this.$('.startDay');
            this.stopDay = this.$('.stopDay');
            this.date = this.$('.date');
            this.plugin = this.$('.plugin');
            this.datepicker = this.$('#datepicker');
            this.combobox = this.$('#combobox');
        },

        initDialogFields: function() {
            var that = this,
                offset = 0;

            $(this.dayTypeList).each(function(index, value) {
                if (value.toLowerCase() === that.model.get('day_type')) {
                    that.dayType[0].options.selectedIndex = index;
                }
            });

            if (!this.model.get('_type')) {
                this.$('.plugin').prop('disabled', false);
            }

            // Shifting the indices to take out the weekdays for the weekend only selection.
            // Also, there is an extra 'default' option to take into account
            if (this.model.get('day_type') === 'weekend') {
                offset = -5;
            }
            this.startDay[0].options.selectedIndex = this.model.get('day_range_start') + offset;
            this.stopDay[0].options.selectedIndex = this.model.get('day_range_stop') + offset;

            if (!this.model.get('_type')) { // create event
                this.stopDay[0].options.selectedIndex = 6;
                this.plugin.prop('disabled', false);
            }
            
            this.hideShowFields();
            this.comboboxInput.val(this.model.get('time').replace(/^0+/, ''));

            this.plugin[0].options.selectedIndex = 0;
            if (this.model.get('plugin_name') !== 'plugin_generic') {
                this.plugin[0].options.selectedIndex = 1;
            }
        },

        dayTypeChange: function(e) {
            var value = $(e.currentTarget).val().toLowerCase();
            this.model.set('day_type', value);
        },

        hideShowFields: function() {
            if (this.model.get('day_type') === 'single') {
                this.model.set('day_range_start', null);
                this.model.set('day_range_stop', null);
                this.startDay.parent().hide();
                this.stopDay.parent().hide();
                this.date.datepicker('setDate', this.model.get('single_date'));
                this.date.parent().show();
            } else {
                this.startDay.parent().show();
                this.stopDay.parent().show();
                this.date.parent().hide();
            }
        },

        setStartStopDayOptions: function() {
            var html = '',
                selectedList = this.dayTypeLogicDict[this.model.get('day_type')];
        
            if (this.model.get('day_type') !== 'single') {
                $(selectedList).each(function(index, value) { 
                    html += '<option value=' + value + '>' + value[0].toUpperCase() +
                        value.slice(1) + '</option>';
                });

                this.model.set('day_range_start', '');
                this.model.set('day_range_stop', '');
                this.startDay.html(html);
                this.stopDay.html(html);
                this.startDay[0].value = '';
                this.stopDay[0].value = '';
            }
        }
    });
});