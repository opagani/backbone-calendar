define(function(require, exports, module){

    var Backbone = require('backbone'),
        DialogModel = require('models/dialog');

    module.exports = Backbone.Collection.extend({
        model: DialogModel
    });
});