const mongoose = require('mongoose');
require("dotenv").config({ path: '../.env' });
const connectDB = async() => {
    try{
        mongoose.connect("mongodb+srv://mongotut:testing123@cluster0.olqwa.mongodb.net/GraphqlAPI?retryWrites=true&w=majority",{
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    }catch(err){
        throw new Error(err);
    }
}

module.exports = connectDB;