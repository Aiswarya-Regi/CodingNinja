const express = require('express');
const auth = require('../middleware/auth');
const {userLoginController,userRegisterController,userLogoutController,updateUserController,saveUserDetailsController} = require('../controllers/user');

const router = express.Router();

router.post("/register",userRegisterController);
router.post("/login",userLoginController);
router.post("/updateUser",updateUserController)
router.post("/saveUserDetails",saveUserDetailsController)
router.get("/logout",auth,userLogoutController);


module.exports = router;