const express = require('express');
const router = express.Router();

const MenuItem = require('../models/MenuItem');

router.post('/', async(req, res) =>{
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

router.get('/', async (req, res) =>{
        try{
            const menuItems = await MenuItem.find(); // Fetch all menu items from the database
            res.status(200).json(menuItems); // Send the list of menu items as a response with status code 200 (OK)
            console.log('Menu items fetched successfully:', menuItems);
        }catch(error){
            console.log('Error fetching menu items:', error);
            res.status(500).json({error: 'Internal Server Error'}); // Send an error response with status code 500 (Internal Server Error)
        }
    });

router.get('/:taste', async (req, res) =>{
        try{
            const taste = req.params.taste;
            if(taste === 'sweet' || taste === 'sour' || taste === 'spicy'){
                const response = await MenuItem.find({taste: taste});
                console.log('Menu items fetched successfully:', response);
                res.status(200).json(response);
            }
            else{
                res.status(400).json({error: 'Invalid taste parameter'});
            }  
        }
        catch(error){
            console.log('Error fetching menu items:', error);
            res.status(500).json({error: 'Internal Server Error'}); // Send an error response with status code 500 (Internal Server Error)
        }
});


module.exports = router;