const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

module.exports = app => {
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }));

    app.use(cookieParser());                           //минавайки от тук ако има логнат user, се закача цялата информация на usera за req
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({                               //при генериране на сесия слага парола(подсигурява, че само сесии, кото са генерирани от нашия сървар са валидни)
        secret: '123456',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;    //създаваме res.locals променлива (currentUser), която идва от express и е достъпна навсякъде, можем да си я извикваме полсле през handlebars във темплейта.
        }
        next();
    });

    app.set('view engine', '.hbs');

    app.use(express.static('./static'));
};