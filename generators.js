// The generator function - DON'T FORGET THE '*'
function* values() {
    for (var i = 0; i < arguments.length; i++) {
        // 'yeild' returns the control to the caller
        // until the generator is resumed using next
        yield arguments[i];
    }
}

// Gets the generator - generators are iterators
var generator = values(1, 2, 3);  // => [object Generator]

// Calling next on the iterator resumes the generator, 
// lets it run until the next yield or return, 
// and then suspends it again
console.log(generator.next()); // => { value: 1, done: false }
console.log(generator.next()); // => { value: 2, done: false }
console.log(generator.next()); // => { value: 3, done: false }
console.log(generator.next()); // => { value: undefined, done: true }