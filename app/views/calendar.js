define(function(require, exports, module) {

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        FullCalendar = require('fullcalendar'),
        DateLib = require('date'),
        DialogCollection = require('collections/dialog'),
        DialogModel = require('models/dialog'),
        DialogView = require('views/dialog'),
        //DaemonView = require('views/daemon'),
        LogoutView = require('views/logout'); 

    module.exports = Backbone.View.extend({

        initialize: function() {
            this.dialogCollection = new DialogCollection();
            this.doubleClick = null;
            this.childViews = [];
        },

        render: function() {
            var that = this,
                $calendar = $('<div/>', {
                    id: 'calendar'
                }).appendTo('#main');

            var calendar = $calendar.fullCalendar({
                allDayDefault: false,
                allDaySlot: false,
                defaultEventMinutes: 30,
                defaultView: 'agendaWeek',
                firstDay: 1,
                header: { 
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                theme: true,

                dayClick: function(date) {
                    that.createNewDialog(date);
                },

                eventClick: function(calEvent) {
                    that.createDialog(calEvent);
                },

                events: function(start, end, callback) {
                    that.fetchCalendarEvents(start, end, callback);
                },
                
                eventRender: function(event, element) {
                    // attaches the title attribute to allow hover text
                    element.attr('title', event.title);
                },

                viewRender: function(view) {
                    that.renderCalendar(view);
                }
            });

            this.$el.html(calendar[0]);
            return this;
        },

        fetchCalendarEvents: function(start, end, callback) {
            var that = this;

            $.ajax({
                url: '/events',
                data: {
                    start_datetime: start.toLocaleString(),
                    stop_datetime: end.toLocaleString()
                }
            }).done(function(data) {
                var events = [];
                $(data).each(function(index, eventData) {
                    events.push(that.translateData(eventData));
                });
                callback(events);
            });
        },

        renderCalendar: function(view) {
            //this.childViews.push(new DaemonView(), new LogoutView());

            // fetches the day info for the current range
            $.ajax({
                url: '/data/get_dates_by_range',
                data: {
                    start_date: view.start.toISOString(),
                    stop_date: view.end.toISOString()
                },
            }).done(function(data) {
                $(data.rows).each(function(index, value) {
                    // day_map is an ordered list of day tags.
                    var day_map = ['fc-mon', 'fc-tue', 'fc-wed', 'fc-thu',
                                   'fc-fri', 'fc-sat', 'fc-sun'];

                    if (value.day_type === 'holiday') {
                        if (view.name === 'agendaWeek' || view.name === 'agendaDay') {
                            // color week & day view holidays
                            var day = day_map[value.day_of_week],
                                tag = '.'+day+'.ui-widget-content';

                            $(tag).addClass('fc-holiday-highlight');
                        } else if (view.name === 'month') {
                            // color month view holidays
                            var date = Date.parseString(value.date, 'MM/dd/yyyy'),
                                custom_date = date.format('yyyy-MM-dd'),
                                query = '[data-date="' + custom_date + '"]';

                            $(query).addClass('fc-holiday-highlight');
                        }
                    }
                });
            });
        },

        createDialog: function(calEvent) {
            var listModelIds = this.dialogCollection.pluck('event_id');

            // create a dialog model and view for a particular event if it does not exist
            if (!_.find(listModelIds, function(num) { return num === calEvent.id; })) {
                var dialogModel = new DialogModel({
                    event_id: calEvent.id,
                    day_type: calEvent.day_type
                });
                
                dialogModel.view = new DialogView({
                    model: dialogModel,
                    eventId: calEvent.id,
                    type: calEvent._type,
                    dayType: calEvent.day_type,
                    startDate: calEvent.start,
                    parentView: this
                });

                this.dialogCollection.add(dialogModel);
                this.childViews.push(dialogModel.view);
            }
        },

        createNewDialog: function(date) {
            var that = this,
                singleClick = date.toUTCString();

            if (this.doubleClick === singleClick) {
                var dialogModel = new DialogModel();

                dialogModel.view = new DialogView({
                    model: dialogModel,
                    startDate: date,
                    parentView: this
                });

                this.dialogCollection.add(dialogModel);
                this.childViews.push(dialogModel.view);
                this.doubleClick = null;
            } else {
                var clickTimer;
                this.doubleClick = date.toUTCString();
                clickTimer = setInterval(function() {
                    that.doubleClick = null;
                    clearInterval(clickTimer);
                }, 500);
            }
        },

        // Utility function that takes data returned from the server and translates it
        // to fullcalendar specific data.
        translateData: function(eventData) {
            var date_str = eventData.date + ' ' + eventData.time,
                start_date = Date.parseString(date_str, 'MM/dd/yyyy hh:mma'),
                classes = ['event'];

            eventData.title = eventData.name;
            eventData.start = start_date;
            if (eventData._type !== 'History') {
                classes.push('event-' + eventData.day_type);
            } else {
                classes.push('event-history');
                if (eventData.plugin_return_code === null) {
                    classes.push('history-running');
                } else if (eventData.plugin_return_code !== 0) {
                    classes.push('history-failed');
                }
            }
            eventData.className = classes;
            return eventData;
        }
    });
});