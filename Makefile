env:
	~/node-latest-install/deps/npm/bin/npm-cli.js install; ~/node-latest-install/deps/npm/bin/npm-cli.js install bower; node_modules/bower/bin/bower install;

test:
	npm install; bower install; node_modules/.bin/grunt test;

.PHONY: all test clean