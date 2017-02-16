"use strict"

test("default object iteration", function() {
 let result = [ ...{ key1: "value1", key2: "value2" } ]
 if(JSON.stringify(result) != '[["key1","value1"],["key2","value2"]]') {
   throw('result should be [ [ "key1", "value1" ], [ "key2", "value2" ] ] but is ' + result)
} })

test("default number iteration", function() {
 let result = [ ...4 ]
 if(JSON.stringify(result) != "[1,2,3,4]") {
  throw("result should be [ 1, 2, 3, 4 ] but is " + result)
} })


test("foreach iterable", function() {
 let result1 = []
 foreach([ 0, 1, 2 ], function(result2) {
  result1.push(result2)
 })
 if(JSON.stringify(result1) != "[0,1,2]") {
  throw("result should be [ 0, 1, 2 ] but is " + result1)
} })

test("foreach noniterable", function() {
 try {
  let result1 = foreach(true, function(...result2) {
   throw("should throw but executes callback with " + result2)
  })
  throw("should throw but returns " + result1)
 } catch(error) { }
})

test("foreach current iteration parameter", function() {
 let result1 = []
 foreach([ 0, 1, 2 ], function(result2, stop, current) {
  result1.push(current)
 })
 if(JSON.stringify(result1) != "[1,2,3]") {
  throw("result should be [ 1, 2, 3 ] but is " + result1)
} })

test("foreach original reference parameter", function() {
 let result1 = [ 1, 2 ], result2 = []
 foreach(result1, function(result3, stop, current, original) {
  result2.push(original)
 })
 if(JSON.stringify(result2) != "[[1,2],[1,2]]") {
  throw("result should be [ [ 1, 2 ], [ 1, 2 ] ] but is " + result2)
} })

test("foreach stopping iteration", function() {
 let result1 = []
 foreach([ 0, 1, 2, 3, 4 ], function(result2, stop) {
  if(result2 == 2) {
   let result3 = stop("value")
   if(result3 != "value") {
    fail("stop should return 'value' but returns " + result3)
  } }
  result1.push(result2)
 })
 if(JSON.stringify(result1) != "[0,1,2]") {
  throw("result should be [ 0, 1, 2 ] but is " + result1)
} })

test("foreach returned results", function() {
 let result1 = foreach([ 0, 1, 2 ], function(result2) {
  return(result2 + 2)
 })
 if(JSON.stringify(result1) != "[2,3,4]") {
  throw("result should be [ 2, 3, 4 ] but is " + result1)
} })

test("foreach callback error", function(pass, fail) {
 try {
  let result = foreach([ 0, 1, 2 ], function() {
   throw("value")
  })
  fail("should reject but resolves with " + result)
 } catch(error) {
  if(error == "value") {
   pass()
  } else {
   fail('error should be "value" but is ' + error)
} } })


test("object.foreach", function() {
 let result1 = { key1: "value1", key2: "value2" }
 let result2 = result1.foreach(function(...result3) {
  if(JSON.stringify(result3) != '["key1","value1",null,1,{"key1":"value1","key2":"value2"}]') {
   throw(`callback parameters should be [ "key", "value", stop(), 1, ${result1} ] but are ` + result3)
  }
  return(result3[2]("value"))
 })
 if(JSON.stringify(result2) != '["value"]') {
  throw('foreach result should be "value" but is ' + result2)
} })

test("array.foreach", function() {
 let result1 = [ "value1", "value2" ]
 let result2 = result1.foreach(function(...result3) {
  if(JSON.stringify(result3) != '["value1",0,null,1,["value1","value2"]]') {
   throw(`callback parameters should be [ "value", 0, stop(), 1, ${result1} ] but are ` + result3)
  }
  return(result3[2]("value"))
 })
 if(JSON.stringify(result2) != '["value"]') {
  throw('foreach result should be "value" but is ' + result2)
} })

test("string.foreach", function() {
 let result1 = "value"
 let result2 = result1.foreach(function(...result3) {
  if(JSON.stringify(result3) != '["v",0,null,1,"value"]') {
   throw('callback parameters should be [ "v", 0, stop(), 1, "value" ] but are ' + result3)
  }
  return(result3[2]("value"))
 })
 if(JSON.stringify(result2) != '["value"]') {
  throw('foreach result should be "value" but is ' + result2)
} })

test("number.foreach", function() {
 let result1 = 4
 let result2 = result1.foreach(function(...result3) {
  if(JSON.stringify(result3) != '[1,null,1,4]') {
   throw('callback parameters should be [ 1, stop(), 1, 4 ] but are ' + result3)
  }
  return(result3[1]("value"))
 })
 if(JSON.stringify(result2) != '["value"]') {
  throw('foreach result should be "value" but is ' + result2)
} })


test("iterate object", function() {
 let result = [ ...iterate({ key1: "value1", key2: "value2" }, "object") ]
 if(JSON.stringify(result) != '[["key1","value1"],["key2","value2"]]') {
   throw('result should be [ [ "key1", "value1" ], [ "key2", "value2" ] ] but is' + result)
} })

test("iterate array", function() {
 let result = [ ...iterate([ "value1", "value2" ], "array") ]
 if(JSON.stringify(result) != '[["value1",0],["value2",1]]') {
  throw('result should be [ [ "value1", 0 ], [ "value2", 1 ] ] but is ' + result)
} })

test("iterate array object", function() {
 let result = [ ...iterate(Object.assign([ "value" ], { key: "value" }), "object") ]
 if(JSON.stringify(result) != '[["0","value"],["key","value"]]') {
   throw('result should be [ [ "0", "value" ], [ "key", "value" ] ] but is ' + result)
} })

test("iterate function", function() {
 let result1 = function() { }
 result1.key = "value"
 let result2 = [ ...iterate(result1, "function") ]
 if(JSON.stringify(result2) != '[["key","value"]]') {
  throw('result should be [ "key", "value" ] but is ' + result2)
} })

test("iterate number", function() {
 let result = [ ...iterate(4, "number") ]
 if(JSON.stringify(result) != "[1,2,3,4]") {
  throw('result should be "[ 1, 2, 3, 4 ]" but is ' + result)
} })

test("iterate string", function() {
 let result = [ ...iterate("value", "string") ]
 if(JSON.stringify(result) != '[["v",0],["a",1],["l",2],["u",3],["e",4]]') {
  throw('result should be ["v", 0 ], ["a", 1 ], ["l", 2 ], ["u", 3 ], ["e", 4 ] but is ' + result)
} })

test("iterate inherited false", function() {
 let result = [...iterate(Object.assign(Object.create({ key1: "value1" }), { key2: "value2" }), "object") ]
 if(JSON.stringify(result) != '[["key2","value2"]]') {
  throw('result should be [ [ "key2", "value2" ] ] but is ' + result)
} })

test("iterate inherited true", function() {
 let result = [...iterate(Object.create({ key: "value" }), "object", { inherited: true }) ]
 if(JSON.stringify(result) != '[["key","value"]]') {
  throw('result should be [ [ "key", "value" ] ] but is ' + result)
} })

test("iterate nonenumerable false", function() {
 let result1 = { key1: "value1" }
 Object.defineProperty(result1, "key2", { value: "value2", enumerable: false })
 let result2 = [...iterate(result1, "object") ]
 if(JSON.stringify(result2) != '[["key1","value1"]]') {
  throw('result should be [ [ "key1", "value1" ] ] but is ' + result2)
} })

test("iterate nonenumerable true", function() {
 let result1 = { key1: "value1" }
 Object.defineProperty(result1, "key2", { value: "value2", enumerable: false })
 let result2 = [...iterate(result1, "object", { nonenumerable: true }) ]
 if(JSON.stringify(result2) != '[["key1","value1"],["key2","value2"]]') {
  throw('result should be [ [ "key1", "value1" ], [ "key2", "value2" ] ] but is ' + result2)
} })

test("iterate symbols false", function() {
 let result = [ ...iterate({ key: "value1", [Symbol("symbol")]: "value2" }, "object") ]
 if(JSON.stringify(result) != '[["key","value1"]]') {
  throw('result should be [ [ "key", "value1" ] ] but is ' + result)
} })

test("iterate symbols true", function() {
 let result = [ ...iterate({ key: "value1", [Symbol("symbol")]: "value2" }, "object", { symbols: true }) ]
 if(JSON.stringify(result) != '[["key","value1"],[null,"value2"]]') {
  throw('result should be [ [ "key", "value1" ], [ Symbol(symbol), "value2" ] ] but is ' + result)
} })

test("iterate iterable", function() {
 let result = [ ...iterate([ 1, 2, 3, 4 ], "other") ]
 if(JSON.stringify(result) != "[1,2,3,4]") {
  throw("result should be [ 1, 2, 3, 4 ] but is " + result)
} })

test("iterate noniterable", function(pass, fail) {
 try {
  let result = [ ...iterate(true) ]
  fail("should throw but returns " + result)
 } catch(error) {
  pass()
} })