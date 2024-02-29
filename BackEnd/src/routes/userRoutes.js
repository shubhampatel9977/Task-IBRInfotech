const express = require("express");
const { authUser } = require("../utils/generateToken");
const { upload } = require("../utils/uploadProfile");
const { userUpdate, userDetails, getAllUsers } = require("../controllers/userController");

const userRoute = express.Router();

userRoute.get('/details', authUser, userDetails)
userRoute.post("/update", authUser, upload.single('profilePicture'), userUpdate )
userRoute.get('/all', authUser, getAllUsers)

module.exports = userRoute;