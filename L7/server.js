    const express = require('express');
    const app = express();

    const db  = require('./db');

    const bodyParser = require('body-parser');
    app.use(bodyParser.json()); // req.body

    const Person = require('./models/Person');
    const MenuItem = require('./models/MenuItem');


    app.post('/menu', async(req, res) =>{
        try{
            const data = req.body // Assuming the request body contains the menu data
            const newMenuItem = new MenuItem(data);
            const response = await newMenuItem.save();
            console.log('Menu item saved successfully:', response);
            res.status(201).json(response); // Send the saved menu item as a response with status code 201 (Created)
        }catch(error){
            console.log('Error saving menu item:', error);
            res.status(500).json({error: 'Internal Server Error'}); // Send an error response with status code 500 (Internal Server Error)
        }
    });

    app.get('/menu', async (req, res) =>{
        try{
            const menuItems = await MenuItem.find(); // Fetch all menu items from the database
            res.status(200).json(menuItems); // Send the list of menu items as a response with status code 200 (OK)
            console.log('Menu items fetched successfully:', menuItems);
        }catch(error){
            console.log('Error fetching menu items:', error);
            res.status(500).json({error: 'Internal Server Error'}); // Send an error response with status code 500 (Internal Server Error)
        }
    });


    app.get('/', (req, res) =>{
        res.send('Welcome to my website. How I can help you?');
    });


    app.post('/person', async (req, res) =>{
        try{
            const data = req.body // Assuming the request body contains the person data in JSON format

            const newPerson = new Person(data);

            const response = await newPerson.save();
            console.log('Person saved successfully:', response);
            res.status(201).json(response); // Send the saved person as a response with status code 201 (Created)

        }catch(error){
            console.log('Error saving person:', error);
            res.status(500).json({error: 'Internal Server Error'}); // Send an error response with status code 500 (Internal Server Error)

        }

    });

    // GET methed to get the person

    app.get('/person', async (req, res) => {
        try{
            const persons = await Person.find(); // Fetch all persons from the database
            res.status(200).json(persons); // Send the list of persons as a response with status code 200 (OK)
            console.log('Persons fetched successfully:', persons);
        }catch(error){
            console.log('Error fetching persons:', error);
            res.status(500).json({error: 'Internal Server Error'}); // Send an error response with status code 500 (Internal Server Error)

        }
    })


    /*
    app.post('/person', (req, res) =>{


        const data = req.body; // {name: 'John', age: 20, work: 'waiter', mobile: '1234567890', email: 'john@gmail.com', address: 'New York', salary: 1000}

        // Create a new person instance using the data from the request body
        const newPerson = new Person(data);
        

        // Save the new person to the database
        
        newPerson.save((error, savedPerson) => {
            if(error){
                console.log("Error saving person:", error);
                res.status(500).json({error: 'Error saving person'});
            }
            else{
                console.log("Person saved successfully:", savedPerson);
                res.status(201).json(savedPerson);  
            }
        });

    })

    */

// GET method to get the person by work type (chef, waiter, manager)
    app.get('/person/:workType', async (req, res) =>{
        try{
            const workType = req.params.workType; // Get the work type from the URL parameter
            if(workType === 'chef' || workType === 'waiter' || workType === 'manager'){
                    const response = await Person.find({work: workType}); // Fetch persons with the specified work type
                    console.log(`Persons with work type ${workType} fetched successfully:`, response);
                    res.status(200).json(response); // Send the list of persons as a response with status code 200 (OK)
                }  
            
            else{
                res.status(404).json({error: 'Invalid work type. Valid types are chef, waiter, manager.'});
            }
        }
        catch(error){
                console.log(`Error fetching persons with work type ${workType}:`, error);
                res.status(500).json({error: 'Internal Server Error'});
        }
    });

    const port = 3000;
    app.listen(port, ()=>{
        console.log(`Server is running on http://localhost:${port}`);
    });