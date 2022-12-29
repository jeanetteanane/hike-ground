const Hikeground = require('../models/hikeGround');
const Review = require('../models/reviews');

module.exports.createReview = async (req, res ) => {
    const hikeground = await Hikeground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.owner = req.user._id; 
    hikeground.reviews.push(review);
    await review.save();
    await hikeground.save();
    req.flash('success', 'Review has been added');
    res.redirect(`/hikegrounds/${hikeground._id}`);
};

module.exports.deleteReview = async(req, res) =>{
    const {id, reviewId} = req.params;
    await Hikeground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/hikegrounds/${id}`);
};