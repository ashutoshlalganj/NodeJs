    const express = require('express');
    const app = express();
    const db  = require('./db');
    require('dotenv').config();
    const passport = require('./auth')

    

    const bodyParser = require('body-parser');
    app.use(bodyParser.json()); // req.body


    // Middleware function to Log the request
    const logRequest = (req, res, next) =>{
        console.log(`[${new Date().toLocaleString()} Request Made to : ${req.oiginalUrl}]`);
        next(); // Move on to the next phase
    }
    app.use(logRequest);



    app.use(passport.initialize());
    const localAuthMiddleware = passport.authenticate('local', {session: false});

    app.get('/', (req, res) =>{
        res.send('Welcome to our Hotel. How I can help you?');
    });


    // Import the router files
    const personRoutes = require('./routes/personRoutes');
    const menuRoutes = require('./routes/menuItemRoutes');

    // Use the router files
    app.use('/person', localAuthMiddleware, personRoutes);
    app.use('/menu', menuRoutes);


    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, ()=>{
        console.log(`Server is running on http://localhost:${port}`);
    });