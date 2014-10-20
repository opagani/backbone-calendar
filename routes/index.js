var express = require('express')
  , path = require('path');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', { title: 'Express' });
    });

    var db_controller = require('./db_controller');
    app.get('/events', db_controller.getEvents);
    app.get('/single_event', db_controller.getSingleEvent);
    app.get('/plugin_event', db_controller.getPluginEvent);
    app.post('/event/create', db_controller.createEvent);
    app.delete('/event/delete/:id', db_controller.deleteEvent);
    app.post('/event/update', db_controller.updateEvent);
};