"use strict"

var objectlooptype = "both"
Object.prototype[Symbol.iterator] = function() {
 const object = this
 const keys = Object.keys(object)
 let item = 0
 return({
  next: function() {
   if(item < keys.length) {
    let result = { value: { key: keys[item], value: object[keys[item]] }, done: false }
    if(objectlooptype == "key") {
     result.value = result.value.key
    } else if(objectlooptype == "value") {
     result.value = result.value.value
    }
    item = item + 1
    return(result)
   } else {
    return({ value: undefined, done: true })
} } }) }
