const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


const User = require("../models/user");
const Callback = require('../models/callback');

const userRegisterController = (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(email)
    bcrypt.genSalt(10).then(salt => {
        return bcrypt.hash(password, salt)
    }).then(hash => {
        const registerDetails = new User({
            name,
            email,
            password: hash,
            courses : [],
            address1 : "" ,
            pin: "" ,
            state: "",
            city: "" ,
            country: "",
            year: "" ,
            college: "",
            degree: "" ,
            saved : "False"
        })

        registerDetails.save().then(re => {
            res.status(200).json({
                error: false,
                message: "success"
            })
        }).catch(err => {
            res.status(401).json({
                error: true,
                message: err
            })
        })
    })
}

const userLoginController = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const data = await User.findOne({ email });
        console.log(data)

        const err = await bcrypt.compare(password, data.password);
        if (!err) {
            res.status(200).json({
                error: false,
                isUserLoggedIn: false,
                message: "Invalid details",
                username: "",
                email : "",
                courses : [],
                saved : "False"
            });
        } else {
            const token = await jwt.sign({ _id: data._id }, config.SECRET_KEY, {
                expiresIn: "1h"
            });
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 60000000),
                httpOnly: true,
                secure : true,
                sameSite : "none",
                domain : "codingninja-739e.onrender.com"
            })
            res.status(200).json({
                error: false,
                isUserLoggedIn: true,
                username: data.name,
                email : data.email,
                courses : data.courses,
                saved : data?.saved || "False",
                message: "Valid details"
    
            })
        }
    } catch (err) {
        res.status(200).json({
            error: true,
            isUserLoggedIn: false,
            message: err,
            username: "",
            email : "",
            courses : [],
            saved : "False"
        });
    }

}

const updateUserController = async (req,res) =>{
try{
    const email = req.body.email;
    const course = req.body.course;
    const data = await User.findOne({ email });
    console.log("data",data)
    const existingList =  data?.courses || [];
    existingList.push(course.trim());
console.log(existingList)
  const result = await  User.updateOne({email},{$set : {
    courses : existingList
  } })
  console.log(result)
  res.status(200).json({
    error : false,
    message : "success",
    courses : existingList
  })
}catch(err){
    res.status(401).json({
        error : true,
        message : "failure",
        courses : existingList
      })
}
}

const saveUserDetailsController = async (req, res) => {
    try{
        const email = req.body.email;
        const address1 = req.body.address1;
        const pin = req.body.pin;
        const state = req.body.state;
        const city = req.body.city;
        const country = req.body.country;
        const year = req.body.year;
        const college = req.body.college;
        const degree = req.body.degree;
        console.log("degree",email)
        
 const obj = {
    address1 : address1 ,
    pin : pin ,
    state : state,
    city : city ,
    country : country,
    year : year ,
    college : college,
    degree : degree ,
    saved : "True"
  }
  const data = await User.findOne({ email });
  console.log("data",data)
      const result = await  User.updateMany({email},{$set : obj })
      console.log("obj",obj)
      res.status(200).json({
        error : false,
        message : "success",
        saved : "True"
      })
    }catch(err){
        res.status(401).json({
            error : true,
            message : "failure",
            saved : "False"
          })
    }
}

const userLogoutController = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({
            error: false,
            message: "Logged out successfully"
        })
    } catch (err) {
        res.status(401).json({
            error: true,
            message: err
        })
    }

}

const initialLoader = (req, res) => {
    console.log(req.cookies.jwt)
}

const callbackController = (req,res) =>{
    try{
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const year = req.body.year;
    const callbackDetails = new Callback({
        name,
        email,
        phone,
        year
    })

    callbackDetails.save().then(re => {
        res.status(200).json({
            error: false,
            message: "success"
        })
    }).catch(err => {
        res.status(401).json({
            error: true,
            message: err
        })
    })
}catch(err){
    res.status(401).json({
        error: true,
        message: err
    })
}
}


module.exports = {
    userLoginController,
    userRegisterController,
    userLogoutController,
    initialLoader,
    updateUserController,
    saveUserDetailsController,
    callbackController

}
