var deasync = require('./index.js');
var cp = require('child_process');
var http = require('http');

var exec = deasync(cp.exec);

var sleep = deasync(function (timeout, done) {
  setTimeout(done, timeout);
});

var request = deasync(function (url, done) {
  http.get(url, function (res) {
    res.on('error', done);

    res.setEncoding('utf8');

    var result = ''

    res.on('data', function (data) { result += data; });
    res.on('end', function () { done(null, result); });
  }).on('error', done);
});

// Expected order: "1st", "2nd", "3rd", "4th"
var sleep_without_cb_or_pred = function (timeout) {
  setTimeout(function() { console.log('2nd'); }, timeout);
};
var t = setTimeout(function () {
  console.log('4th');
}, 2000);
t.unref(); // should not make loopUntilNoEvents() to block
console.log('1st');
sleep_without_cb_or_pred(1000);
deasync.loopUntilNoMoreEvents();
console.log('3rd');
t.ref();  // should make loopUntilNoEvents() to block
deasync.loopUntilNoMoreEvents();

// Expected order: ls -la, "async2", request
setTimeout(function () {
  console.log('async2');
}, 1000);
console.log(exec('ls -la'));
sleep(2000);
console.log(request('http://nodejs.org'));
