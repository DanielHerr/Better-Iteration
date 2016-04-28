"use strict"

function*loop(item, type) {
 let itemtype = type || typeof(item)
 if(itemtype == "object" && Array.isArray(item)) {
  itemtype = type || "array"
 }
 if(itemtype == "object" || itemtype == "function") {
  for(let key of Object.keys(item)) {
   yield([ key, item[key], item ])
 } }
 else if(itemtype == "array" || itemtype == "string") {
  for(let index of Object.keys(item)) {
   yield([ item[index], Number(index), item ])
 } }
 else if(itemtype == "number") {
  for(let number = 1; number <= item; number = number + 1) {
   yield([ number, item ])
 } }
 else if(item && item[Symbol.iterator]) {
  for(let value of item) {
   yield(value)
  }
 } else {
  throw(new Error("Unable to iterate: " + JSON.stringify(item))) 
} }