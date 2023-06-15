const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email :  {
        type : String,
        required : true,
        unique : true
    },
    password :  {
        type : String,
        required : true
    },
    courses : {
        type : Array
    }
     ,
    address1 :   {
        type : String
    }
     ,
    pin :   {
        type : String
    }
     ,
    state:   {
        type : String
    }
     ,
    city :   {
        type : String
    }
     ,
    country:   {
        type : String
    }
     ,
    year :   {
        type : String
    }
     ,
    college:   {
        type : String
    }
     ,
    degree :   {
        type : String
    },
    saved : {
        type : String
    }
     
})

const User = new  mongoose.model("user",userSchema);


module.exports = User;