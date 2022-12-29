const {hikegroundSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utilities/expressError');
const Hikeground = require('./models/hikeGround');
const Review = require('./models/reviews');

module.exports.loggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'Please sign it first.')
        return res.redirect('/login')
    }
    next();
}

module.exports.validateHikeground =(req, res, next) =>{
    const {error} = hikegroundSchema.validate(req.body);
    if (error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else {
        next();
    }
}

module.exports.verifyOwner = async(req, res, next) => {
    const {id} = req.params;
    const hikeground = await Hikeground.findById(id);
    if (!hikeground.owner.equals(req.user._id)){
        req.flash('error', 'You are not permitted to do that.')
        return res.redirect(`/hikegrounds/${id}`);
    }
    next();
}

module.exports.verifyReviewOwner = async(req, res, next) => {
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if (!review.owner.equals(req.user._id)){
        req.flash('error', 'You are not permitted to do that.')
        return res.redirect(`/hikegrounds/${id}`);
    }
    next();
}

module.exports.validateReview =(req, res, next) =>{
    const {error} = reviewSchema.validate(req.body);
    if (error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else {
        next();
    }
}

module.exports.checkingReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}
