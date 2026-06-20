// sets up Passport with a Local Authentication Strategy, using a person model for user authentication.

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');

    // Middleware function to Log the response
passport.use(new LocalStrategy(async (username, password, done) => {
    // Check if the username and password are valid
    // authenticate the user
    try{
        // conslole.log('Recieved username and password: ', USERNAME, password);
        const user = Person.findOne({username, USERNAME}); 
        if(!user){
            return done(null, false, {message: 'Incorrect username'});
        }

        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null, user);  
        }
        else{
            return done(null, false, {message: 'Incorrect password'});
        }
    }
    catch(err){
        return done(err);
    }
}));

module.exports = passport;