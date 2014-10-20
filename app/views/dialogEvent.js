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
                    url = '/single_event';
                    data.event_id = options.eventId;
                    data.day_type = options.dayType;
                } else {
                    url = '/get_historic_event';
                    data.history_id = options.eventId;
                }
                
                this.model.fetch({
                    url: url,
                    data: data,
                    success: function(data) {
                        that.model.set('single_date', options.startDate);
                        that.trigger('initialized');
                    }
                });
            } else {  // new event
                setTimeout(function() {
                    that.model.set('single_date', options.startDate);
                    that.model.set('time', options.startDate.format('hh:mma'));
                    var mydate = new Date(options.startDate);
                    var dateStr = (mydate.getMonth()+1).toString() + "/" + (mydate.getDate()).toString() + 
                        "/" + (mydate.getFullYear()).toString();
                    that.model.set('date', dateStr);
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
                    '01:00AM', '01:15AM', '01:30AM', '01:45AM',
                    '02:00AM', '02:15AM', '02:30AM', '02:45AM',
                    '03:00AM', '03:15AM', '03:30AM', '03:45AM',
                    '04:00AM', '04:15AM', '04:30AM', '04:45AM',
                    '05:00AM', '05:15AM', '05:30AM', '05:45AM',
                    '06:00AM', '06:15AM', '06:30AM', '06:45AM',
                    '07:00AM', '07:15AM', '07:30AM', '07:45AM',
                    '08:00AM', '08:15AM', '08:30AM', '08:45AM',
                    '09:00AM', '09:15AM', '09:30AM', '09:45AM',                   
                    '10:00AM', '10:15AM', '10:30AM', '10:45AM',
                    '11:00AM', '11:15AM', '11:30AM', '11:45AM',
                    '12:00PM', '12:15PM', '12:30PM', '12:45PM',
                    '01:00PM', '01:15PM', '01:30PM', '01:45PM',
                    '02:00PM', '02:15PM', '02:30PM', '02:45PM',
                    '03:00PM', '03:15PM', '03:30PM', '03:45PM',
                    '04:00PM', '04:15PM', '04:30PM', '04:45PM',
                    '05:00PM', '05:15PM', '05:30PM', '05:45PM',
                    '06:00PM', '06:15PM', '06:30PM', '06:45PM',
                    '07:00PM', '07:15PM', '07:30PM', '07:45PM',
                    '08:00PM', '08:15PM', '08:30PM', '08:45PM',
                    '09:00PM', '09:15PM', '09:30PM', '09:45PM',                   
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
            this.comboboxInput.val(this.model.get('time'));

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