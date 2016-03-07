/*!
 * deasync
 * https://github.com/abbr/deasync
 *
 * Copyright 2014-2015 Abbr
 * Released under the MIT license
 */

var fs = require('fs');
var path = require('path');

// Seed random numbers [gh-82] if on Windows. See https://github.com/laverdet/node-fibers/issues/82
if (process.platform === 'win32') Math.random();

// Look for binary for this platform
var nodeV = 'node-' + /[0-9]+\.[0-9]+/.exec(process.versions.node)[0];
var nodeVM = 'node-' + /[0-9]+/.exec(process.versions.node)[0];
var modPath = path.join(__dirname, 'bin', process.platform + '-' + process.arch + '-' + nodeV, 'deasync');
var binding;
try {
	try {
		fs.statSync(modPath + '.node');
	}
	catch (ex) {
		modPath = path.join(__dirname, 'bin', process.platform + '-' + process.arch + '-' + nodeVM, 'deasync');
		fs.statSync(modPath + '.node');
	}
	binding = require(modPath);
}
catch (ex) {
	binding = require('bindings')('deasync');
}


function deasync(fn) {
	return function () {
		var err;
		var res;
		var done = false;
		function cb(e, r) {
			err = e;
			res = r;
			done = true;
		}

		var args = Array.prototype.slice.apply(arguments).concat(cb);

		fn.apply(this, args);
		loopWhile(function () {
			return !done;
		});
		if (err) throw err;

		return res;
	};
}

var sleep = deasync(function(timeout, done) {
	setTimeout(done, timeout);
});
deasync.sleep = sleep;

function runLoopOnce() {
	process._tickDomainCallback();
	binding.run();
}
deasync.runLoopOnce = deasync;

function loopWhile(pred) {
	while (pred()) {
		process._tickDomainCallback();
		if (pred()) binding.run();
	}
}
deasync.loopWhile = loopWhile;

function promise(fn) {
	return function () {
		var err;
		var res;
		var done = false;

		fn(arguments).then(
			function (r) {
				res = r;
				done = true;
			},
			function (e) {
				err = e;
				done = true;
			}
		);

		loopWhile(function () {
			return !done;
		});

		if (err) throw err;

		return res;
	};
}
deasync.promise = promise;

module.exports = deasync;
