const mongoose = require('mongoose');
require("dotenv").config({ path: '../.env' });
const connectDB = async() => {
    try{
        mongoose.connect("Your mongo connect url",{
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    }catch(err){
        throw new Error(err);
    }
}

module.exports = connectDB;
