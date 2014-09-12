define(function(require, exports, module) {

    var App = require('app'),
        DaemonView = require('views/daemon'),
        assert = chai.assert;

    describe('Daemon View', function(){
        it('it exists', function() {
            assert.ok(DaemonView);
        });
    });

    describe('.initialize', function() {
        before(function() {
            this.app = new App();
        });

        it('calls .render', function() {
            var spy = sinon.spy(DaemonView.prototype, 'render'),
                app = new App();

            assert.ok(spy.called);

            spy.restore();
        });
    });

    describe('.render.daemon', function() {
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

        it('makes a GET request for `/data/is_daemon_alive`', function () {
            this.app.daemon.render(sinon.spy());

            assert.equal(requests.length, 2);
            assert.equal(requests[0].method, 'GET');
            assert.equal(requests[0].url, '/data/is_daemon_alive');
        });
    });
});