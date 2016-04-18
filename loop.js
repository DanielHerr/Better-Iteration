"use strict"

function*loop(item) {
 let itemtype = datatype(item)
 if(itemtype == "object" || itemtype == "function") {
  for(let key of Object.keys(item)) {
   yield([ key, item[key], item ])
 } }
 else if(itemtype == "array") {
  for(let index of Object.keys(item)) {
   yield([ item[index], Number(index), item ])
 } }
 else if(itemtype == "number") {
  for(let number = 1; number <= item; number = number + 1) {
   yield([ number, item ])
} } }
