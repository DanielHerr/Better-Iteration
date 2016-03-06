"use strict"

Object.prototype[Symbol.iterator] = function*() {
 for(let key of Object.keys(this)) {
  yield({ key: key, value: this[key] })
} }

Number.prototype[Symbol.iterator] = function*() {
 for(let current = 1; current <= this; current = current + 1) {
  yield(current)
} }
