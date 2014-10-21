backbone-calendar
================

This is a sample app based on Arshaw FullCalendar that uses:  Backbone.js, RequireJS, MongoDB, Express.js and Node.js.

This application allows the user to create, update and delete events. The data is persistent and it is kept in the MongoDB database.

Every time you click on a day event a dialog appears where you can create a new event.  If you click on an existing event, you will have the option to change the information and save the event in the database.

After cloning/downloading the app, you need to follow all the installation steps including the MongoDB installation.  Then, you need to run the Mongo Server, import data into the Mongo Database and start the  app server.

Requirements
------------
- ([Backbone.js](http://www.backbonejs.org/))
- ([RequireJS](http://wwww.requirejs.org//))
- ([node.js v0.10.x](http://nodejs.org/download/))
- ([fullcalendar.js 1.6.4 and it's dependencies](https://github.com/arshaw/fullcalendar/releases/tag/v1.6.4))

Installation
------------

```bash
$ npm install -g bower
$ npm install -g grunt-cli
$ npm install -g grunt
$ cd backbone-calendar
$ npm install
$ grunt
```

Install MongoDB
---------------

Go to the [mongodb.org](http://www.mongodb.org/downloads) and download the binary to install on your system.

Unpack the package into your web development folder (~/*Documents/Development or /Users/yourname or any other). If you want, you could install MongoDB into the /usr/local/mongodb folder.

If you would like to access MongoDB commands from anywhere on your system, you need to add your
mongodb path to the $PATH variable. For Mac OS X, you need the open-system paths file with:

```bash
$ sudo vi /etc/paths
  * Add the following line:  /Users/yourname/mongodb/bin or /usr/local/mongodb/bin
```

Create a data folder; by default, MongoDB uses /data/db.

```bash
$ sudo mkdir -p /data/db
$ sudo chown `id -u` /data/db
```

Run the Mongo Server
--------------------

Make sure you added $PATH for the MongoDB location

```bash
$ mongod --dbpath /data/db
MongoDB starting : pid=49735 port=27017 dbpath=/data/db ...
waiting for connections on port 27017
... 
```

Import data into the Mongo Database
---------------------------------

```bash
$ cd backbone-calendar
$ chmod 755 ./db/seed.sh
$ bash ./db/seed.sh
  * mongoimport --db backbone-calendar --collection events --file ./db/seed_events.json --jsonArray
```

Database Models
---------------

```
Events
    {
      "username": "opagani",
      "_type": "DailyEvent",
      "name": "good afternoon",
      "tags": [],
      "fail_mail": "",
      "plugin_name": "generic",
      "day_type": "weekday",
      "time": "01:00PM",
      "date": "10/13/2014",
      "plugin_id": 47,
      "id": 1
    }
```

How to manipulate data from the Mongo Console
---------------------------------------------

```bash
$ mongod
MongoDB shell version: 2.6.4
connecting to: test
> use backbone-calendar
switched to db backbone-calendar
> db.users.find()
{{ "_id" : ObjectId("54449343e6ce1d4c1252600c"), "username" : "opagani", "_type" : "DailyEvent", "name" : "test failed", "tags" : [ ], "fail_mail" : "", "plugin_name" : "generic", "day_type" : "weekday", "time" : "02:00PM", "date" : "10/21/2014", "plugin_id" : 38, "id" : 17 }
...
```

Start the server and run our app
--------------------------------

```bash
$ grunt server
```

Testing
-------

We use mocha, chai, sinon and grunt to ensure the quality of the code.

```bash
$ grunt test
```

License
-------

MIT