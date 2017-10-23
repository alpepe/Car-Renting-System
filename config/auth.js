module.exports = {
    isAuthed: (req, res, next) => {
        if (req.isAuthenticated()) {         //функция на passport проверява дали има потребител в сесията
            next();
        } else {
            res.redirect('/login');
        }
    },
    hasRole: (role) => (req, res, next) => {      //проверяваме дали има дадена roles в логнатия потребител
        if (req.isAuthenticated() &&
            req.user.roles.indexOf(role) > -1) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}