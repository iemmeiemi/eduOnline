const mongoose = require('mongoose');
require('dotenv').config();


const dbConnect = () => {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodi-db.lawxb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`)
    .then(
        console.log("MongoDB Connected!")
    )
    .catch((error) => {console.log("Error with MongoDb connection: " + error)});
}

module.exports = dbConnect;