const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.send('Welcome to my website. How I can help you?');
});

app.get('/about', (req, res) =>{
    res.send('This is my about page');
});

app.post('/contact', (req, res) =>{
    res.send('This is my contact page');

})

const port = 3000;
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});

