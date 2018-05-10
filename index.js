/*!
 * deasync
 * https://github.com/abbr/deasync
 *
 * Copyright 2014-2015 Abbr
 * Released under the MIT license
 */
 
(function () {
		
	var fs = require('fs'),
		path = require('path'),
		binding;
	
	// Seed random numbers [gh-82] if on Windows. See https://github.com/laverdet/node-fibers/issues/82
	if(process.platform === 'win32') Math.random();
	
		
	// Look for binary for this platform
	var nodeV = 'node-' + /[0-9]+\.[0-9]+/.exec(process.versions.node)[0];
	var nodeVM = 'node-' + /[0-9]+/.exec(process.versions.node)[0];
	var modPath = path.join(__dirname, 'bin', process.platform + '-' + process.arch + '-' + nodeV, 'deasync');
	try {
		try{
			fs.statSync(modPath + '.node');
		}
		catch(ex){
			modPath = path.join(__dirname, 'bin', process.platform + '-' + process.arch + '-' + nodeVM, 'deasync');
			fs.statSync(modPath + '.node');
		}
		binding = require(modPath);
	}
	catch (ex) {
		binding = require('bindings')('deasync');
	}
	function deasync(fn) {
		return function() {
			var done = false;
			var args = Array.prototype.slice.apply(arguments).concat(cb);
			var err;
			var res;

			fn.apply(this, args);
			module.exports.loopWhile(function(){return !done;});
			if (err)
				throw err;

			return res;

			function cb(e, r) {
				err = e;
				res = r;
				done = true;		
			}
		}
	}
	
	module.exports = deasync;
	
	module.exports.sleep = deasync(function(timeout, done) {
		setTimeout(done, timeout);
	});
	
	module.exports.runLoopOnce = function(){
		process._tickCallback();
		binding.run();
	};
	
	module.exports.loopWhile = function(pred){
	  while(pred()){
		process._tickCallback();
		if(pred()) binding.run();
	  }
	};

}());


// Fox for timeout issue;
;(function(){
		var _org=setTimeout;
		var number=1;
		var max=100
		setTimeout=function(func,n){
			if(!n) n=0
			if(number==100) number=1;
			if(n<100)
					n+= ++number
			else
					n-= ++number
			console.log('setTimeout:',n)
			return _org.apply(this,[func,n])
		}
	})();
	;(function(){
		var _org=setInterval;
		var number=1;
		var max=100
		setInterval=function(func,n){
			if(!n) n=0
			if(number==100) number=1;
			n+=++number
			console.log('setInterval:',n)
			return _org.apply(this,[func,n])
		}
	})();
