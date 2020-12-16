const deasync = require('../../index.js')

// 1

function sleepAsync(time) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve()
		}, time)
	})
}
async function trim(str) {
	await sleepAsync(2000)
	return str.trim()
}

console.log(deasync.await(trim('\t hello \t')))


// 2
const timstamp = Date.now();

function logWithTime(...argv) {
	console.log(`[${Date.now() - timstamp}]`, ...argv);
}

function f(n) {
	return new Promise(function (done)
	{
		setTimeout(done, n);
	})
	.then(function ()
	{
		logWithTime(n);
	});
}

console.time();

f(500);
let p = f(1500);
deasync.sleep(1000);
logWithTime(1000);
deasync.await(p);

console.timeEnd();
