const express  = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.send('Welcome to my website. How I can help you?');
});

app.get('/about', (req, res) =>{
    res.send('This is the about page');
}); 


app.get('/contact', (req, res) =>{
    console.log('This is the contact page');
    res.send('This is the contact page');
});

const port = 3000;
app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
});




/*


//JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string

//JSON.stringify() and JSON.parse() are used to convert between JavaScript objects and JSON strings.   


const objectToConvert ={
    name: "John",  
    age: 30,
}

const convertedObject = JSON.stringify(objectToConvert);
console.log(convertedObject);

//JSON.stringify() method converts a JavaScript object or value to a JSON string

const convertedObject2 = JSON.parse(convertedObject);
console.log(convertedObject2);

*/

