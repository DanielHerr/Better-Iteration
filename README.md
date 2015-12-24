# Object Loops
Allows objects to be used in for of loops.

Usage:

```javascript
objectlooptype = "both" || "key" || "value"

for(let item of { object: true }) {
 if(objectlooptype == "both") {
  console.log("key: ", item.key, " value: ", item.value)
 } else if(objectlooptype == "key") {
  console.log("key: ", item)
 } else if(objectlooptype == "value") {
  console.log("value: ", item)
 }
}
```
