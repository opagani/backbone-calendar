var ObjectId = require('mongodb').ObjectID
  , dbConn = require('../db/db_connection')
  , myDB = null
  , users = null
  , events = null;

dbConn.getDBConnection(function(currentDB) {
    myDB = currentDB;
    users = myDB.collection('users');
    events = myDB.collection('events');
});

function createNewId() {
    events.find({},{ id:1, _id: 0 }).sort({id:-1}).limit(1).toArray(function(err, event) {
        if (!event) {
            console.log(err);
            return -1;
        } else {
            console.log(event[0].id + 1);
            return (event[0].id + 1);
        }
    });
}

exports.getEvents = function(req, res) {
    events.find({}).toArray(function(err, events) {
        if (!events) {
            console.log(err);
        } else {
            res.json(events);
        }
    });
};

exports.getSingleEvent = function(req, res) {
    var id = +req.query.event_id;
    events.find({ id: id, day_type: req.query.day_type }).toArray(function(err, event) {
        if (!event) {
            console.log(err);
        } else {
            res.json(event);
        }
    });
};

exports.getPluginEvent = function(req, res) {
    var id = +req.query.plugin_id;
    events.find({ id: id, day_type: req.query.plugin_name }).toArray(function(err, event) {
        if (!event) {
            console.log(err);
        } else {
            res.json(event);
        }
    });
};

exports.createEvent = function(req, res) {
    events.find({},{ id:1, _id: 0 }).sort({id:-1}).limit(1).toArray(function(err, event) {
        if (err) {
            console.log(err);
        } else {
            req.body.id = event[0].id + 1;
            req.body.username = "opagani";  // needs to be changed in the future to reflect a user
            events.insert(req.body, function(err, event) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Event Created.');
                    res.json(event[0]);
                }
            });
        }
    });
};

exports.deleteEvent = function(req, res) {
    var id = +req.params.id;
    events.remove({ id: id }, function(err, event) {
        if (err) {
            console.log(err);
        } else {
            console.log('Event Deleted.');
            res.json(event);
        }
    });
};

exports.updateEvent = function(req, res) {
    var id = +req.body.event_id;
    events.update({ id: id }, { $set: { name: req.body.name }}, function(err, event) {
        if (err) {
            console.log(err);
        } else {
            console.log('Event Updated.');
            res.json(event);
        }
    });
};