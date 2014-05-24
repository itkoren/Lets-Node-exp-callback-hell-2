// Include The 'co' Module
var co = require("co");

var facter = function(fact, index, callback) {
    setImmediate(function() {
        console.log("step" + index);
        callback(null, fact * index);
    });
};

var thunkFact = function(fact, index) {
    return function(callback) {
        facter(fact, index, callback);
    };
};

var factorial = co(function *(options) {
    var n = options.n;
    var completed = options.completed;

    var factor = 1;
    for (var i = 0; i < n; i++) {
        setTimeout(function(){
            console.log("TIMEOUT 0");
        }, 0);
        factor = yield thunkFact(factor, i + 1);
    }

    setImmediate(function() {
        completed(null, factor);
    });
});

factorial({ n: 5, completed: function(err, result) {
    console.log("COMPLETED:" + result);
}});

setTimeout(function(){
    console.log("TIMEOUT 0");
}, 0);