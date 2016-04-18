# Loop
Enables iteration of objects and numbers in for..of loops, and enhances array iteration.

Usage:
```
for(let [ key, value, original ] of loop({ done: false, testing: true })) {
 console.log(key, value, original)
}
for(let [ value, index, original ] of loop([ "done", "testing" ])) {
 console.log(value, index, original)
}
for(let [ number, original ] of loop(4)) {
 console.log(number, original)
}
```
