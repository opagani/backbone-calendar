# Scheduler Application

The Scheduler application uses:

Backend: Twisted 

Frontend: Backbone.js, underscore.js, RequireJS, CommonJS, EJS templates, fullcalendar.js

Testing Frontend: Mocha, Chai, Sinon.js

# Frontend Setup

You have the option of doing an automatic setup or a manual setup.

The automatic setup will install and run the libraries locally.

The manual setup will install the libraries globally.  This is very useful if you are planning to do frontend development on the scheduler.

## Automatic setup

### Run setup-env.sh

Run the script setup-env.sh from the webui directory.

This script will check if you have node installed globally.  If you don't, then it will install node locally under ~/node-latest-version.

Then it will install the local npm dependencies and bower dependencies.

Finally it will build the front end libraries and execute the test suite.

## Manual setup

### Install Node.js >= 0.8.x globally

If Node.js version 0.8.x (preferably 0.10.x) is not already installed on your system, install it so you can run this app.

#### Check if it's installed

The command `which node` will return a path to your installed version of Node.js, if it exists on your system.

    $ which node
    /usr/local/bin/node

If it is installed, make sure it's at least version 0.8.x, and preferably 0.10.x.

    $ node --version
    v0.10.26

#### To install

##### Mac

Preferably install using Homebrew:

    $ brew install node

##### Else

Otherwise, go to the [nodejs.org](http://nodejs.org/) and download the binary to install on your system.

### Install Bower globally

All client side dependencies are installed with
[bower](http://twitter.github.com/bower).

You may need to use sudo to install bower globally.

    $ npm install -g bower

### Install `grunt-cli` globally

This app uses [Grunt](http://gruntjs.com/) to build its assets. To run Grunt, we need to install the `grunt-cli` package globally on your system using NPM.


You may need to use sudo to install grunt-cli globally.

    $ npm install -g grunt-cli

### Install Grunt globally

You may need to use sudo to install grunt globally.

    $ npm install -g grunt

### Run `npm install` to install local dependencies

    $ npm install

### Run `bower install` to install client side dependencies

    $ bower install

### Run the app!

#### You will build our app using Grunt

    $ grunt

#### You will automatically recompile changes in development mode

This feature works in development mode (default port is 8885).

You can automatically do useful things when you change files like recompiling css and js files and automatically reloading the page.  Instead of running $ grunt, you could run:

    $ grunt devel

#### You will build our app and run tests using PhantomJS and Mocha

    $ grunt test

## License

MIT