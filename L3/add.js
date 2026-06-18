// var a = 6
// var b = 7
// var c = a + b  
// console.log(c)      // 13

// var a = 16
// var c = a + b

// console.log(c)      // 13


// let a = 16
// let b = 17
// let c = a + b
// console.log(c)      // 13
//  a = 116
//  c = a + b
// console.log(c)      // 133 


// const cars = ["Saab", "Volvo", "BMW"];
// cars[0] = "Opel";
// cars.push("Audi");
// console.log(cars);




// const person = {
//     firstName:"John", 
//     lastName:"Doe", 
//     age:50, 
//     eyeColor:"blue"
// };
// person.age = 51;
// console.log(person);



// const age = [45, 4, 9, 16, 25];
// const result = age.filter(checkAge);

// function checkAge(age) {
//     return age > 18;
// }
// console.log(result);



var prompt = require('prompt-sync')();

const age = prompt("Please enter your age: ");

if (age < 18) { 
    console.log("You are not eligible to vote.");
} else {
    console.log("You are eligible to vote.");
}