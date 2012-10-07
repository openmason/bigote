var uubench    = require('./uubench'),
    bigote     = require('..'),
    bigoteBench  = require('./suites/bigote_suite').bigoteBench;

uubench.nextTick = process.nextTick;

var suite = new uubench.Suite({
  iterations: 10000,
  result: function(name, stats) {
    var opms = stats.iterations/stats.elapsed;
    console.log(pad(12, name + ": "), pad(5, Math.round(opms), true));
  }
});

function pad(amt, val, pre) {
  val = String(val);
  var len = amt - val.length, out = '';
  for (var i=0; i<len; i++) {
    out += ' ';
  }
  return pre ? out + val : val + out;
}

console.log("ops/ms");
console.log("------");

global.bigote = bigote;

for (var key in bigoteBench.benches) {
  bigoteBench(suite, key);
}

suite.run();
