const mongoose = require("mongoose");
const brcypt = require('bcrypt')

// Define the schema for the person
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save', async function(next){
    const person = this;

    // Hash the password only if it has been modified or is new
    if(!person.isModified('password')) return next();
    try{
        // hash passwod generate by bcrypt
        const salt = await bcrypt.genSalt(10);
        
        // hash password
        const hashedPassword = await brcypt.hash(person.password, salt);

        // Overwrite the plain text password with the hashed one
        person.password = hashedPassword;
        next();
    }
    catch(err){
        return next(err);
    }
});

personSchema.methods.comparePassword = async function(password){
    try{
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}

const Person = mongoose.model('Person', personSchema);

module.exports = Person;