"use strict"

function foreach(iterable, callback) {
 let results = [], stopped = false
 let iterator = iterable[Symbol.iterator]()
 while(true) {
  let { value, done } = iterator.next()
  if(done || stopped) {
   return(results)
  } else {
   function stop(value) {
    stopped = true
    if(typeof(iterator.return) == "function") {
     iterator.return()
    }
    return(value)
   }
   results.push(callback(value, stop, results.length + 1, iterable))
} } }

function*iterate(item, type = "", { inherited = false, nonenumerable = false, symbols = false } = {}) {
 type = type || datatype(item)
 if([ "object", "array", "function" ].includes(type)) {
  if(type != "array" || inherited || nonenumerable || symbols) {
   function ownkeys(item) {
    let keys = []
    if(nonenumerable) {
     keys = keys.concat(Object.getOwnPropertyNames(item))
    } else {
     keys = keys.concat(Object.keys(item))
    }
    if(symbols) {
     keys = keys.concat(Object.getOwnPropertySymbols(item))
    }
    return(keys)
   }
   let prototype, keys = ownkeys(item)
   if(inherited) {
    while(prototype = Object.getPrototypeOf(prototype || item)) {
     keys = keys.concat(ownkeys(prototype || item))
   } }
   for(let key of keys) {
    yield(Object.assign([ key, item[key] ], { key, value: item[key] }))
   }
  } else {
   for(let index = 0; index < item.length; index++) {
    yield(Object.assign([ item[index], index ], { value: item[index], index }))
  } }
 } else if(type == "string") {
  for(let index = 0; index < item.length; index++) {
   yield(Object.assign([ item[index], index ], { letter: item[index], index }))
  }
 } else if(type == "number") {
  for(let current = 1; current <= item; current++) {
   yield(current)
  } 
 } else if(item[Symbol.iterator]) {
  yield*(item[Symbol.iterator]())
 } else {
  throw(Error("Unable to iterate: " + item)) 
} }

Object.prototype[Symbol.iterator] = function*() {
 for(let [ key, value ] of Object.entries(this)) {
  yield(Object.assign([ key, value ], { key, value }))
} }
Number.prototype[Symbol.iterator] = function*() {
 for(let current = 1; current <= this; current++) {
  yield(current)
} }
Boolean.prototype[Symbol.iterator] = undefined
Symbol.prototype[Symbol.iterator] = undefined

for(let datatype of [ Object, Array, String ]) {
 Object.defineProperty(datatype.prototype, "foreach", {
  writable: true, configurable: true, enumerable: false, value(callback) {
   let iterable = this
   return(foreach(iterate(iterable), function(...results) {
    results.pop()
    return(callback(...results.shift(), ...results, iterable))
})) } }) }
Object.defineProperty(Number.prototype, "foreach", {
  writable: true, configurable: true, enumerable: false, value(callback) {
   return(foreach(this, callback))
} })
for(let datatype of [ Boolean, Symbol ]) {
 Object.defineProperty(datatype.prototype, "foreach", {
  writable: true, configurable: true, enumerable: false, value: undefined
}) }