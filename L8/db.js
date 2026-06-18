// db.js
const mongoose = require('mongoose');
// MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

// Connect to MongoDB
mongoose.connect(mongoURL);

// Get the default connection
const db = mongoose.connection;

// Event listeners for the connection
db.on('connected', () => {
    console.log('Connected to MongoDB successfully!');
});
db.on('error', (err) =>{
    console.error('Error connecting to MongoDB:', err);
})

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

module.exports = db;
