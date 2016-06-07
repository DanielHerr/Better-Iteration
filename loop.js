"use strict"

function*loop(item, type = "", inherited = true) {
 let itemtype = type || typeof(item)
 if(itemtype == "object") {
  if(item == null) {
   itemtype = "null"
  } else if(Array.isArray(item)) {
   itemtype = type || "array"
 } }
 function itemkeys() {
  let keys = []
  if(inherited) {
   for(let key in item) {
    keys.push(key)
   }
  } else {
   keys = Object.keys(item)
  }
  return(keys)
 }
 if(itemtype == "object" || itemtype == "function") {
  for(let key of itemkeys()) {
   yield([ key, item[key], item ])
  }
 } else if(itemtype == "array" || itemtype == "string") {
  for(let index of itemkeys()) {
   yield([ item[index], Number(index), item ])
  }
 } else if(itemtype == "number") {
  for(let number = 1; number <= item; number = number + 1) {
   yield([ number, item ])
  }
 } else if(item && item[Symbol.iterator]) {
  for(let value of item) {
   yield([ value, item ])
  }
 } else {
  throw(new Error("Unable to iterate: " + JSON.stringify(item))) 
} }