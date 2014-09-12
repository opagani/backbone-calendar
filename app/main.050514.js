define(function(require, exports, module) {
    
    var Backbone = require('backbone'),
        $ = require('jquery'),
        Router = require('router');

    window.scheduler = {};

    $(function() {
        scheduler.router = new Router();
        Backbone.history.start({ pushState: true });

        var authenticated = false;

        // Authenticated user move to home page
        if (authenticated) {
            scheduler.router.navigate('calendar', { trigger: true });
            // Unauthed user move to login page
        } else {
            scheduler.router.navigate('login', { trigger: true });
        }
    });
});