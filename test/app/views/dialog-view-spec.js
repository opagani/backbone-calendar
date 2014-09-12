define(function(require, exports, module) {

    var App = require('app'),
        DialogModel = require('models/dialog'),
        DialogView = require('views/dialog'),
        assert = chai.assert;

    describe('Dialog View', function() {
        it('it exists', function() {
            assert.ok(DialogView);
        });

        before(function() {
            var curr = new Date(), // get current date
                first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week

            this.start = new Date(curr.setDate(first));
            
            this.calEvent = {
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
        });

        describe('.initialize', function(){
            context('creates dependencies', function() {
                before(function() {
                    this.app = new App();
                });

                it('should throw an error if not passed a model', function(){
                    assert.throws(function() {
                        new DialogView();
                    }, /must provide a Dialog model/);
                });

                it('calls .createDialogEvent', function() {
                    var options = {
                        eventId: this.calEvent.id,
                        type: this.calEvent._type,
                        dayType: this.calEvent.day_type,
                        startDate: this.start
                    };

                    var spy = sinon.spy(DialogView.prototype, 'createDialogEvent');
                    
                    this.dialogModel = new DialogModel({
                        event_id: this.calEvent.id,
                        day_type: this.calEvent.day_type
                    });
                    
                    this.dialogView = new DialogView(_.extend(options, { model: this.dialogModel }));

                    assert.ok(spy.calledWith(options));

                    spy.restore();
                });
            });

            context('attaches event handlers', function(){
                before(function(){
                    this.stub = sinon.stub(DialogView.prototype, 'listenToOnce');
                    this.dialogView = new DialogView({ model: new DialogModel(), startDate: new Date() });
                });

                after(function(){
                  this.stub.restore();
                });

                it('listens to .dialogEventView `initialized`', function() {
                    assert.ok(this.stub.calledWith(this.dialogView.dialogEventView, 'initialized'));
                });
            });
        });

        describe('calls save, delete, replace or create .dialog', function() {
            var xhr,
                requests = [];

            beforeEach(function () {
                xhr = sinon.useFakeXMLHttpRequest();
                xhr.onCreate = function (req) { requests.push(req); };

                this.app = new App();

                this.dialogModel = new DialogModel({
                    event_id: this.calEvent.id,
                    day_type: this.calEvent.day_type
                });
                
                this.dialogView = new DialogView({
                    model: this.dialogModel,
                    eventId: this.calEvent.id,
                    type: this.calEvent._type,
                    dayType: this.calEvent.day_type,
                    startDate: this.start
                });
             });

            afterEach(function () {
                // Like before we must clean up when tampering with globals.
                xhr.restore();
                requests = [];
            });

            it('makes a PUT request for `/data/set_attributes` on save', function () {
                this.dialogView.model.save({}, { url: '/data/set_event_attributes' }, sinon.spy());
                
                assert.equal(requests.length, 3);
                assert.equal(requests[2].method, 'PUT');
                assert.equal(requests[2].url, '/data/set_event_attributes');
            });

            it('makes a POST request for `/data/update_plugin_info` on save', function () {
                this.dialogView = new DialogView({ model: new DialogModel(), startDate: new Date() });
                this.dialogView.updatePluginInfo({ 'resource': 'a', 'user': 'b', 'command': 'c' }, sinon.spy());
                
                assert.equal(requests.length, 3);
                assert.equal(requests[2].method, 'POST');
                assert.equal(requests[2].url, '/data/update_plugin_info');
            });
        
            it('makes a DELETE request for `/data/delete_event` on delete', function () {
               this.dialogView.model.destroy({
                    data: {
                        'event_id': this.dialogView.model.get('event_id'),
                        'day_type': this.dialogView.model.get('day_type')
                    },
                    url: '/data/delete_event'
                },
                    sinon.spy()
                );
                
                assert.equal(requests.length, 3);
                assert.equal(requests[2].method, 'DELETE');
                assert.equal(requests[2].url, '/data/delete_event');
            });

            it('makes a PUT request for `/data/replace_daily_with_single` on replace', function () {
                this.dialogView.model.save({}, { url: '/data/replace_daily_with_single' }, sinon.spy());
                
                assert.equal(requests.length, 3);
                assert.equal(requests[2].method, 'PUT');
                assert.equal(requests[2].url, '/data/replace_daily_with_single');
            });

            it('makes a POST request for `/data/create_event` on create', function () {
                this.dialogView = new DialogView({ model: new DialogModel(), startDate: new Date() });
                this.dialogView.model.save({}, { url: '/data/create_event' }, sinon.spy());
                
                assert.equal(requests.length, 3);
                assert.equal(requests[2].method, 'POST');
                assert.equal(requests[2].url, '/data/create_event');
            });
        });
    });
});