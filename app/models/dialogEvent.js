define(function(require, exports, module) {
    var Backbone = require('backbone'); 

    module.exports = Backbone.Model.extend({
        idAttribute: 'event_id',
        defaults: {
            'name': 'New Event',
            'day_type': 'everyday',
            'day_range_start': '',
            'day_range_stop': '',
            'username': '',
            'fail_mail': '',
            'event_tags': '',
            'log_name': '',
            '_type': '',
            'time': '',
            'plugin_name': 'plugin_generic',
            'plugin_info': ''
        },
        parse: function(response) {
            if (response[0]) {
                return response[0];
            }
            return response;
        }
    });
});