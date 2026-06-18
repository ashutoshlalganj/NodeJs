    const express = require('express');
    const app = express();
    const db  = require('./db');
    require('dotenv').config();

    const bodyParser = require('body-parser');
    app.use(bodyParser.json()); // req.body

    
    app.get('/', (req, res) =>{
        res.send('Welcome to our Hotel. How I can help you?');
    });


    // Import the router files
    const personRoutes = require('./routes/personRoutes');
    const menuRoutes = require('./routes/menuItemRoutes');

    // Use the router files
    app.use('/person', personRoutes);
    app.use('/menu', menuRoutes);


    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, ()=>{
        console.log(`Server is running on http://localhost:${port}`);
    });