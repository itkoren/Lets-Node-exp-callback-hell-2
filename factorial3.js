// Include The 'co' Module
var co = require("co");

// Include The 'thunkify' Module
var thunkify = require("thunkify");

var facter = function(fact, index, callback) {
    setImmediate(function() {
        console.log("step" + index);
        callback(null, fact * index);
    });
};

var thunkFact = thunkify(facter);

var factorial = co(function *(options) {
    var n = options.n;
    var completed = options.completed;

    var factor = 1;
    for (var i = 0; i < n; i++) {
        factor = yield thunkFact(factor, i + 1);
    }

    setImmediate(function() {
        completed(null, factor);
    });
});

setTimeout(function(){
    console.log("TIMEOUT 0");
}, 0);

factorial({ n: 50, completed: function(err, result) {
    console.log("COMPLETED:" + result);
}});