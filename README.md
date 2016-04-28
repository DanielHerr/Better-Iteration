# Loop
Enables iteration of objects, functions, and numbers in for..of loops, and enhances array and string iteration. Iteration method can be specified as second argument. Otherwise the default [Symbol.iterator] will be used.

Usage:
```
for(let [ key, value, original ] of loop({ done: false, testing: true }, "object")) {
 console.log(key, value, original)
}
for(let [ value, index, original ] of loop([ "done", "testing" ], "array")) {
 console.log(value, index, original)
}
for(let [ letter, index, original ] of loop("testing", "string")) {
 console.log(letter, index, original)
}
for(let [ number, original ] of loop(4, "number")) {
 console.log(number, original)
}
```
