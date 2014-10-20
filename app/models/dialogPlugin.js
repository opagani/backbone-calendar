define(function(require, exports, module) {
    var Backbone = require('backbone'); 

    module.exports = Backbone.Model.extend({
        defaults: {
            'resource': '',
            'user': '',
            'command': '',
            '_type': ''
        },
        parse: function(response) {
            if (response[0]) {
                return response[0];
            }
            return response;
        }
    });
});