const passport = require('passport');
const LocalPassport = require('passport-local');
const User = require('mongoose').model('User');

module.exports = () => {                                                  //проверява по подадени username и password, дали съществува дадения потребител
    passport.use(new LocalPassport((username, password, done) => {
        User.findOne({ username: username }).then(user => {
            if (!user) return done(null, false);
            if (!user.authenticate(password)) return done(null, false);
            return done(null, user);
        });
    }));

    passport.serializeUser((user, done) => {                              //връща ID по подаден user
        if (user) return done(null, user._id);
    });

    passport.deserializeUser((id, done) => {                             //връща user по подадено ID
        User.findById(id).then(user => {
            if (!user) return done(null, false);
            return done(null, user);        
        });
    });
};