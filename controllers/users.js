const User = require('../models/user');

module.exports.registrationForm = (req, res) => {
    res.render('users/register')
};

module.exports.register = async (req, res, next) =>{
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const userRegistered = await User.register(user, password);
        req.login(userRegistered, err => {
            if(err) return next(err);
            req.flash('success', 'Welcome to Hikegrounds!')
            res.redirect('/hikegrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

module.exports.loginForm = (req, res) => {
    if(req.query.returnTo){
        req.session.returnTo = req.query.returnTo;
    }
    res.render('users/login')
};

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome!');
    const urlRedirect = res.locals.returnTo || '/hikegrounds';
    res.redirect(urlRedirect);
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'Goodbye!');
        res.redirect('/hikegrounds');
    })
};