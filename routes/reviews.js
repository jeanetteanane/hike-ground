const express = require('express');
const router = express.Router({mergeParams: true});
const {validateReview, loggedIn, verifyReviewOwner} = require('../middleware');
const reviews = require('../controllers/reviews');
const asyncCatch = require('../utilities/asyncCatch');



router.post('/', loggedIn, validateReview, asyncCatch(reviews.createReview));

router.delete('/:reviewId', loggedIn, verifyReviewOwner, asyncCatch(reviews.deleteReview))

module.exports = router;