/**
 * Created by user on 2018/4/13/013.
 */

const deasync = require("..");
const timstamp = Date.now();

function f(n)
{
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
//msleep(1000);
logWithTime(1000);
deasync.await(p);
console.timeEnd();

function logWithTime(...argv)
{
	console.log(`[${Date.now() - timstamp}]`, ...argv);
}
