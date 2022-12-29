const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./place')
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
        const random65 = Math.floor(Math.random() * 65);
        const price = Math.floor(Math.random() * 20) + 10;
        const hike = new Hikeground({
          //YOUR USER ID
            owner: '638ad9d35c164d936b690239' ,
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
                  url: 'https://res.cloudinary.com/dzolpsb2q/image/upload/v1671035191/Hikeground/arikxo1uei9rgouilf65.jpg',
                  filename: 'Hikeground/arikxo1uei9rgouilf65'
                },
                {
                  url: 'https://res.cloudinary.com/dzolpsb2q/image/upload/v1671035192/Hikeground/xk1dlxsmhpmdpriw09co.jpg',
                  filename: 'Hikeground/xk1dlxsmhpmdpriw09co'
                },
                {
                  url: 'https://res.cloudinary.com/dzolpsb2q/image/upload/v1671035192/Hikeground/h9ed1xlhp9jeto9kfwc7.jpg',
                  filename: 'Hikeground/h9ed1xlhp9jeto9kfwc7'
                }
            ]
        })
        await hike.save();
    }
}

hikeDB().then(() => {
    mongoose.connection.close();
})
