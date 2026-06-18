
var _ = require('lodash');
var data = ["person", "person", 1,2,1,2, "name", 'age', 2];
var filter = _.uniq(data);
console.log(filter);

// var result = _.add(5, 10);
var result = _.uniqueId(data);
console.log(result);

console.log(_.isString("Hello World!"));






// ---------------------------

// const notes = require('./notes');

// console.log(notes);
// console.log("This is the server file");


// var age = notes.age;
// console.log(age);

// var result = notes.addnumber(age + 18, 100);
// console.log(result);

// --------------------------




// File System

// const fs = require('fs');
// var os = require('os');


// var user = os.userInfo();
// console.log(user);

// fs.appendFile('message.txt', 'Hi ' + user.username + '!\n', () => {
//     console.log('Message appended to file');
// });




// -----------------------------





// Call Back Function

// const add = function(a, b, callback){
//     var result = a + b;
//     console.log("The result of addition is: " + result);
//     callback();
// }

// add(2, 3, () => console.log("This is a callback function"));



// -------------------------------------

/*

// Call Back Function

function callbackFunction() {
    console.log("This is a callback function");
}

const add = function(a, b, callbackFunction) {
    var result = a + b;
    console.log("The result of addition is: " + result);
    callbackFunction();
}

add(5, 10, callbackFunction);

*/








// console.log("Server is running on port 3000");


// function add(a, b) {
//     return a + b;
// }

// var result = add(5, 100);
// console.log("The result of addition is: " + result);

// var add = function(a, b) {
//     return a + b;
// }
// var result = add(50, 100);
// console.log("The result of addition is: " + result);


// var add = (a, b) => {
//     return a + b;
// }
// var result = add(50, 10);
// console.log("The result of addition is: " + result);


// var add = (a, b) => a + b;
// var result = add(50, 10);
// console.log("The result of addition is: " + result);


// (function() {
//     console.log('This is an IIFE (Immediately Invoked Function Expression)');
// })();





