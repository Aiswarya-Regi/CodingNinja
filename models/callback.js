const mongoose = require('mongoose');

const callbackSchema =  new mongoose.Schema({
       name :  {
        type : String,
        required : true
    },
    email :  {
        type : String,
        required : true,
        unique : true
    },
    phone :  {
        type : String,
        required : true
    },
    year :  {
        type : String,
        required : true
    },
})

const Callback = new  mongoose.model("callback",callbackSchema);
module.exports = Callback;