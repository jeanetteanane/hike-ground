const express = require('express');
const router = express.Router();
const asyncCatch = require('../utilities/asyncCatch'); 
const hikegrounds = require('../controllers/hikegrounds');
const { loggedIn, verifyOwner, validateHikeground } = require('../middleware');
const multer  = require('multer')
const {storage} = require('../cloudinary');
const upload = multer({storage});

router.route('/')
    .get(asyncCatch(hikegrounds.index))
    .post(loggedIn, upload.array('image'), validateHikeground, asyncCatch(hikegrounds.createHikeground))


router.get('/new', loggedIn, hikegrounds.newForm)

router.route('/:id')
    .get(asyncCatch(hikegrounds.showHikeground))
    .put(loggedIn,  verifyOwner, upload.array('image'), validateHikeground, asyncCatch(hikegrounds.updateHikeground))
    .delete(loggedIn, verifyOwner, asyncCatch(hikegrounds.deleteHikeground));

router.get('/:id/edit', loggedIn,  verifyOwner, asyncCatch(hikegrounds.editForm))


module.exports = router;