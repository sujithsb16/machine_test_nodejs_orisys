const express = require("express");
const userRoute = express();
const userController = require("../controller/userController");
const multer = require("../utility/multer");


userRoute.use(express.json());
userRoute.use(express.urlencoded({ extended: true }));


// userRoute.get("/", userController.loadHome);

userRoute.get("/home", userController.loadHome);


userRoute.get("/register", userController.loadUserRegistration);

userRoute.post("/register", userController.registerUser);

userRoute.get("/login", userController.loadUserLogin);

userRoute.post("/login", userController.verifyUserLogin);

userRoute.get("/addblog", userController.loadAddBlog);


userRoute.post("/addblog", multer.upload.array('image'),userController.addBlog);




module.exports = userRoute;
