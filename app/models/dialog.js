define(function(require, exports, module) {
    var Backbone = require('backbone'); 

    module.exports = Backbone.Model.extend({
        idAttribute: 'event_id',
        sync : function(method, model, options) {
            if (method === 'update') {
                if (model.has('config')) {
                    model.set('config', JSON.stringify(model.get('config')));
                }
            }

            if (method === 'create') {
                model.set('plugin_info', JSON.stringify(model.get('plugin_info')));
            }

            if (method === 'delete') {
                if (options.data) {
                    // properly formats data for back-end to parse
                    options.data = JSON.stringify(options.data);
                }
                // transform all delete requests to application/json
                options.contentType = 'applicaton/json';
            }

            return Backbone.sync.apply(this, [method, model, options]);
        }
    });
});