define(function(require, exports, module) {

    var _ = require('underscore'),
        Backbone = require('backbone');

    module.exports = Backbone.View.extend({
        close: function(){
            if(this.childViews){
                this.childViews.close();
            }
            this.remove();
        }
    });
});