const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./place')
const Hikeground = require('../models/hikeGround');

mongoose.set('strictQuery', false);


mongoose.connect('mongodb://localhost:27017/hike-ground')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const placeCombo = array => array[Math.floor(Math.random() * array.length)];

const hikeDB = async () => {
  await Hikeground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random65 = Math.floor(Math.random() * 20);
    const price = Math.floor(Math.random() * 20) + 10;
    const hike = new Hikeground({
      //YOUR USER ID
      owner: '63b48b16831189d53ca1c5ff',
      location: `${cities[random65].city}, ${cities[random65].area}`,
      title: `${placeCombo(descriptors)} ${placeCombo(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random65].longitude,
          cities[random65].latitude,
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dzolpsb2q/image/upload/v1672453256/Hikeground/wace8dbyaymnnk7r46ia.avif',
          filename: 'Hikeground/wace8dbyaymnnk7r46ia'
        },
        {
          url: 'https://res.cloudinary.com/dzolpsb2q/image/upload/v1672453258/Hikeground/vojlzvhszbxrsyfu9gbl.avif',
          filename: 'Hikeground/vojlzvhszbxrsyfu9gbl'
        },
        {
          url: 'https://res.cloudinary.com/dzolpsb2q/image/upload/v1672453258/Hikeground/j1y8id0iuhhlxc5woeio.avif',
          filename: 'Hikeground/j1y8id0iuhhlxc5woeio'
        }
      ]
    })
    await hike.save();
  }
}

hikeDB().then(() => {
  mongoose.connection.close();
})
