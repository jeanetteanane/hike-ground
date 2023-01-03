const Hikeground = require('../models/hikeGround');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mbtoken = process.env.MAPBOX_TOKEN;
const geocode = mbxGeocoding({accessToken: mbtoken});
const {cloudinary} = require('../cloudinary');


module.exports.index = async (req, res) => {
    const hikegrounds = await Hikeground.find({});
    res.render('hikegrounds/index', { hikegrounds })
}

module.exports.newForm = (req, res) => {
    res.render('hikegrounds/new');
}; 

module.exports.createHikeground = async (req, res, next) => {
    const geoInfo = await geocode.forwardGeocode({
        query: req.body.hikeground.location,
        limit: 1
    }).send()
    const hikeground = new Hikeground(req.body.hikeground);
    hikeground.geometry = geoInfo.body.features[0].geometry;
    hikeground.images = req.files.map(i => ({ url: i.path, filename: i.filename}));
    hikeground.owner = req.user._id;
    await hikeground.save();
    console.log(hikeground);
    req.flash('success', 'New Hikeground has been created!');
    res.redirect(`/hikegrounds/${hikeground._id}`)
};

module.exports.showHikeground = async (req, res) => {
    const hikeground = await Hikeground.findById(req.params.id).populate({
        path:'reviews', populate: {path: 'owner'}}).populate('owner');
    if(!hikeground) {
        req.flash('error', 'The Hikeground you are looking for does not exist!')
        return res.redirect('/hikegrounds')
    }
    res.render('hikegrounds/show', {hikeground});
};

module.exports.editForm = async (req, res) => {
    const {id} = req.params;
    const hikeground = await Hikeground.findById(id);
    if(!hikeground) {
        req.flash('error', 'Hikeground does not exist!')
        return res.redirect('/hikegrounds')
    }
    res.render('hikegrounds/edit', {hikeground});
};

module.exports.updateHikeground = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const hikeground = await Hikeground.findByIdAndUpdate(id, { ...req.body.hikeground });
    const imgs = req.files.map(i => ({ url: i.path, filename: i.filename }));
    hikeground.images.push(...imgs);
    await hikeground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await hikeground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/hikegrounds/${hikeground._id}`)
}

module.exports.deleteHikeground = async(req, res) => {
    const {id} = req.params;
    await Hikeground.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted the Hikeground')
    res.redirect('/hikegrounds');
};