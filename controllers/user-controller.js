const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const Car = require('mongoose').model('Car');
const RentedCarInfo = require('mongoose').model('RentedCarInfo');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },

    //Registration POST--------------------------------------------------------------------
    registerPost: async (req, res) => {
        const reqUser = req.body;
        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, reqUser.password);
        try {
            const user = await User.create({
                username: reqUser.username,
                hashedPass,
                salt,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                roles: []
            });
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;                //създаваме res.locals променлива, която идва от express и е достъпна навсякъде, можем да си я извикваме полсле през handlebars във темплейта.
                    res.render('users/register', user);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/register');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('users/login');
    },

    //Login POST--------------------------------------------------------------
    loginPost: async (req, res) => {
        const reqUser = req.body;
        try {
            const user = await User.findOne({ username: reqUser.username });
            if (!user) {
                errorHandler('Invalid user data');
                return;
            }
            if (!user.authenticate(reqUser.password)) {
                errorHandler('Invalid user data');
                return;
            }
            req.logIn(user, (err, user) => {     //req.logIn идава от passport
                if (err) {
                    errorHandler(err);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            errorHandler(e);
        }

        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/login');
        }
    },
    profil: (req, res) => {
        let id = req.user._id
        RentedCarInfo.find({ user: id }).populate('user').populate('car').then(
            info => {
                res.render('users/profil', {info})

            })
    }
};