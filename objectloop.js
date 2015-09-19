Object.prototype[Symbol.iterator] = function() {
 var object = this
 var keys = Object.keys(object)
 var item = 0
 return { next: function() {
  if(item < keys.length) {
   var key = keys[item]
   item = item + 1
   return { value: { key: key, value: object[key] }, done: false }
  } else {
   return { value: undefined, done: true }
  }
 } }
}
