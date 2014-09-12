#!/bin/bash

APP_NAME="scheduler"
APP_HOME=$(pwd)

# To simplify paths below, require the user to run this script from its directory.
if [ $(dirname $0) != '.' ] ; then
    echo "Please run this script from its own directory."
    exit 1
fi

logit () {
    echo $'\e[32m'[${APP_NAME}]$'\e[0m' $*
}

if [ `uname` == "Linux" ] ; then
    NODE="/usr/bin/node"
elif [ `uname` == "Darwin" ] ; then
    NODE="/usr/local/bin/node"
fi

if [ ! -f $NODE ] ; then
    # install node locally
    if [ ! -f ~/node-latest-install/node ] ; then
        echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc
        . ~/.bashrc
        mkdir ~/local
        mkdir ~/node-latest-install
        cd ~/node-latest-install
        curl http://nodejs.org/dist/node-latest.tar.gz | tar xz --strip-components=1
        ./configure --prefix=~/local
        make install
    fi

    # install local dependencies via npm
    cd $APP_HOME
    ~/node-latest-install/deps/npm/bin/npm-cli.js install
    ~/node-latest-install/deps/npm/bin/npm-cli.js install bower
else
    # install local dependencies via npm
    npm install
    npm install bower
fi

# install local dependencies via bower
node_modules/bower/bin/bower install

# build and run tests
node_modules/.bin/grunt test

echo
logit "Make sure the server is running!  Run the script 'runtestserver.sh' from the scheduler directory."
echo
logit "${APP_NAME} is ready to go!"
echo