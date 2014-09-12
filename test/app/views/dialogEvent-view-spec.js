define(function(require, exports, module) {

    var App = require('app'),
        DialogEventView = require('views/dialogEvent'),
        assert = chai.assert;

    describe('DialogEvent View', function() {
        it('it exists', function() {
            assert.ok(DialogEventView);
        });
    });

    describe('.initialize', function(){
        before(function() {
            this.app = new App();
        });

        it('should throw an error if not passed a model', function(){
            assert.throws(function() {
                new DialogEventView();
            }, /must provide a DialogEvent model/);
        });
    });
});