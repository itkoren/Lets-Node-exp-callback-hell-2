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

var generator = function *(options) {
    var n = options.n;
    var completed = options.completed;

    var factor = 1;
    for (var i = 0; i < n; i++) {
        factor = yield thunkFact(factor, i + 1);
    }

    setImmediate(function() {
        completed(null, factor);
    });
};

function factorial(options) {
    var n = options.n;
    var gen = generator(options);

    // First time this runs, It will call next(null) and get a thunk.
    // After that, I'll evaluate the thunk and saves the result.
    // Then, I'll call next(savedResult).

    function nextItem(err, result) {
        var item = gen.next(result);

        if (!item.done) {
            // I use the thunk I got from the previous generator yield
            // and pass it the reference to nextItem as a callback to be called
            // from within the method which was thunked
            item.value(nextItem);
        }
    }

    nextItem();
}

setTimeout(function(){
    console.log("TIMEOUT 0");
}, 0);

factorial({ n: 50, completed: function(err, result) {
    console.log("COMPLETED:" + result);
}});