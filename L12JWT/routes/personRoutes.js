const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt')

    router.post('/signup', async (req, res) =>{
        try{
            const data = req.body // Assuming the request body contains the person data in JSON format

            const newPerson = new Person(data);

            // Save the new person to the database
            const response = await newPerson.save();
            console.log('Person saved successfully:', response);

            const payload = {
                id: response.id,
                username: response.username
            }

            console.log(JSON.stringify(payload));
            const token = generateToken(payload);
            console.log('Token is: ', token);

            res.status(201).json({response: response, token: token}); // Send the saved person as a response with status code 201 (Created)

        }catch(error){
            console.log('Error saving person:', error);
            res.status(500).json({error: 'Internal Server Error'}); // Send an error response with status code 500 (Internal Server Error)

        }

    });


    // Login route

    router.post('/login', async(req, res) => {
        try{
            // Extract the username and password from the request body
            const {username, password} = req.body;

            // Find the person with the given username
            const user = await Person.findOne({username: username});

            // If no person is found, return an error response
            if(!user || !(await user.comparePassword(password))){
                return res.status(401).json({error: 'Invalid username or password'});
            }

            // Generate a JWT token for the user

            const payload = {
                id: user.id,
                username: user.username
            }
            const token = generateToken(payload);

            // Return the token in the response
            res.json({token: token});
        }
        catch(error){
            console.log('Error logging in:', error);
            res.status(500).json({error: 'Internal Server Error'}); // Send an error response with status code 500 (Internal Server Error)
        }

    });


    // Profile route

    router.get('/profile', jwtAuthMiddleware, async (req, res) => {
        try{
            const userData = req.user;
            console.log("User Data: ",userData);

            const userId = userData.id;
            const user = await Person.findById(userId); // Fetch the person with the given ID from the database
            res.status(200).json({user: user}); // Send the person's data in the response
        }
        catch(error){
            console.log('Error fetching profile:', error);
            res.status(500).json({error: 'Internal Server Error'}); // Send an error response with status code 500 (Internal Server Error)
        }
    });

    
    // GET methed to get the person

    router.get('/', jwtAuthMiddleware, async (req, res) => {
        try{
            const persons = await Person.find(); // Fetch all persons from the database
            res.status(200).json(persons); // Send the list of persons as a response with status code 200 (OK)
            console.log('Persons fetched successfully:', persons);
        }catch(error){
            console.log('Error fetching persons:', error);
            res.status(500).json({error: 'Internal Server Error'}); // Send an error response with status code 500 (Internal Server Error)

        }
    });


    // GET method to get the person by work type (chef, waiter, manager)
    router.get('/:workType', async (req, res) =>{
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


    // Method to update the person by ID

    router.put('/:id', async (req, res) =>{
        try{
            const PersonId = req.params.id; // Get the person ID from the URL parameter
            const updatePersonData = req.body; // Get the updated person data from the request body

            const response = await Person.findByIdAndUpdate(PersonId, updatePersonData, {   // Update the person with the specified ID
                new: true, // Return the updated person document
                runValidators: true // Run the validators before updating the document
            }); 

            if(!response){
                res.status(404).json({error: 'Person not found'});
            }

            console.log(response);
            res.status(200).json(response); // Send the updated person as a response with status code 200 (OK)
        }
        catch(error){
            console.log(`Error updating person with ID ${PersonId}:`, error);  
            res.status(500).json({error: 'Internal Server Error'});
        }
    });


    // Delete Person by ID

    router.delete('/:id', async (req, res) =>{
        try{
            const PersonId = req.params.id; // Get the person ID from the URL parameter 
            const response = await Person.findByIdAndDelete(PersonId); // Delete the person with the specified ID

            if(!response){
                res.status(404).json({error: 'Person not found'});
            }

            console.log('Person deleted successfully');
            console.log(response);
            res.status(200).json(response); // Send the deleted person as a response with status code 200 (OK)
            res.status(200).json({message: 'Person deleted successfully'});
        }
        catch(error){
            console.log(`Error deleting person with ID ${PersonId}:`, error);  
            res.status(500).json({error: 'Internal Server Error'});
        }
    });


    module.exports = router;





    
    /*
    router.post('/person', (req, res) =>{


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