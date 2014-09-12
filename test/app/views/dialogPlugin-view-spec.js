define(function(require, exports, module) {

    var App = require('app'),
        DialogPluginView = require('views/dialogPlugin'),
        assert = chai.assert;

    describe('DialogPlugin View', function() {
        it('it exists', function() {
            assert.ok(DialogPluginView);
        });
    });

    describe('.initialize', function(){
        before(function() {
            this.app = new App();
        });

        it('should throw an error if not passed a model', function(){
            assert.throws(function() {
                new DialogPluginView();
            }, /must provide a DialogPlugin model/);
        });
    });
});