define(function(require, exports, module) {

    var assert = chai.assert;
    var App = require('app');

    describe('Application View', function() {
        it('it exists', function() {
            assert.ok(App);
        });

        describe('.initialize', function() {
            context('creates dependencies', function() {
                before(function() {
                    this.app = new App();
                });

                it('creates a calendar view', function() {
                    assert.ok(this.app.calendar);
                });

                //it('creates a daemon view', function() {
                  //  assert.ok(this.app.daemon);
                //});
            });
        });
    });
});