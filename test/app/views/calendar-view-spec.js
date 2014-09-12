define(function(require, exports, module) {

    var App = require('app'),
        CalendarView = require('views/calendar'),
        assert = chai.assert;

    describe('Calendar View', function(){
        it('it exists', function() {
            assert.ok(CalendarView);
        });

        before(function() {
            var curr = new Date(), // get current date
                first = curr.getDate() - curr.getDay(), // First day is the day of the month - the day of the week
                last = first + 6; // last day is the first day + 6

            this.start = new Date(curr.setDate(first));
            this.end = new Date(this.start.getTime() + 7 * 24 * 60 * 60 * 1000);
        });

        describe('.initialize', function() {
            context('creates dependencies', function() {
                before(function() {
                    this.app = new App();
                });

                it('creates a dialog collection', function() {
                    assert.ok(this.app.calendar.dialogCollection);
                });

                it('calls .createCalendar', function() {
                    var spy = sinon.spy(CalendarView.prototype, 'createCalendar'),
                        app = new App();

                    assert.ok(spy.called);

                    spy.restore();
                });
            });
        });

        describe('.fetchCalendarEvents', function() {
            var xhr, 
                requests;

            before(function () {
                xhr = sinon.useFakeXMLHttpRequest();
                requests = [];
                xhr.onCreate = function (req) { requests.push(req); };

                this.app = new App();
            });

            after(function () {
                // Like before we must clean up when tampering with globals.
                xhr.restore();
            });

            it('makes a GET request for "/data/get_events_and_history_by_range"', function () {
                this.app.calendar.fetchCalendarEvents(this.start, this.end, sinon.spy());

                assert.equal(requests.length, 2);
                assert.equal(requests[1].method, 'GET');
                assert.equal(requests[1].url.split('?')[0], '/data/get_events_and_history_by_range');
            });
        });

        describe('.renderCalendar', function() {
            var xhr, 
                requests;

            before(function () {
                xhr = sinon.useFakeXMLHttpRequest();
                requests = [];
                xhr.onCreate = function (req) { requests.push(req); };

                this.app = new App();
            });

            after(function () {
                // Like before we must clean up when tampering with globals.
                xhr.restore();
            });

            it('makes a GET request for "/data/get_dates_by_range"', function () {
                var view = {
                    start: this.start, 
                    end: this.end
                };

                this.app.calendar.renderCalendar(view, sinon.spy());
                
                assert.equal(requests.length, 2);
                assert.equal(requests[1].method, 'GET');
                assert.equal(requests[1].url.split('?')[0], '/data/get_dates_by_range');
            });
        });

        describe('.createDialog', function() {
            var calEvent = {
                _type: "DailyEvent",
                date: "01/20/2014",
                day_type: "everyday",
                fail_mail: "",
                id: 1120,
                name: "New Event",
                plugin_id: 1140,
                plugin_name: "plugin_generic",
                tags: [],
                time: "04:50PM",
                username: "unknown"
            };

            before(function() {
                this.app = new App();
                this.stub = sinon.stub(this.app.calendar.dialogCollection, 'add');
            });

            after(function() {
                this.stub.restore();
            });

            it('calls .dialogCollection add', function() {
                var event = { preventDefault: sinon.stub() };
                this.app.calendar.createDialog(calEvent, event);
    
                assert.ok(this.stub.called);
            });
        });

        describe('.createNewDialog', function() {
            before(function() {
                this.app = new App();
                this.stub = sinon.stub(this.app.calendar.dialogCollection, 'add');
                this.date = new Date();
            });

            after(function() {
                this.stub.restore();
            });

            it('calls .dialogCollection add', function() {
                var event = { preventDefault: sinon.stub() };
                // call the function twice to fake a doubleClick event
                this.app.calendar.createNewDialog(this.date, event);
                this.app.calendar.createNewDialog(this.date, event);

                assert.ok(this.stub.called);
            });
        });
    });
});