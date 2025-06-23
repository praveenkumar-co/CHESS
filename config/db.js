const mongoose = require('mongoose');
const connectDB  = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log(`Mongo DB connected`);
    }
    catch(error){
    console.log(`Mongo NOT connected !`);
    }
}
module.exports = connectDB;