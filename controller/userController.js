const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { Blogs } = require("../models");


const { Users } = require("../models");

let userSession = false || {};


const registerUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
  try {
    const userExist = await Users.findOne({ where: { email: email } });
    if (userExist) {
      res.status(400);
      throw new Error("Email already exists");
    } else {
      const salt = await bcrypt.genSaltSync(10);
      let hashPassword = await bcrypt.hash(req.body.password, salt);
      if (hashPassword) {
        

        const newUser = await Users.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashPassword,
        });

        if (newUser) {
          console.log(newUser.dataValues.id);
                res.render("registration", {
                  message: "Registration Successfull",
                });

        }
      }
    }
  } catch (error) {
    console.log("trycatch error :", error.message);
    res.render("registration", {
      message: error.message,
    });
  }

});

const verifyUserLogin = asyncHandler(async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Users.findOne({ where: { email: email } });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.dataValues.password))) {
      userSession = req.session;
      userSession.userId = user.dataValues.id;
      console.log(userSession);
      res.redirect("/home");
      console.log("log in");
    } else {
      if (!user) {
        res.json({
          message: "User does not exist!!!",
        });
      }
      res.json({
        message: "Password Incorrect!!!",
      });
    }
  } catch (error) {
    console.log("trycatch error :", error.message);
  }
});

const loadUserLogin = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error.message);
  }
};

const loadUserRegistration = async (req, res) => {
  try {
    res.render("registration");
  } catch (error) {
    console.log(error.message);
  }
};

const loadHome = async (req, res) => {
  try {

    userSession = req.session;
    console.log(userSession.userId);
    const blogs = await Blogs.findAll({
      where: { userId: userSession.userId },
    });

    console.log(blogs);

    res.render("home", { blogs
    });
  } catch (error) {
    console.log(error.message);
  }
};


const loadAddBlog = async (req, res) => {
  try {
    res.render("addBlog", {  });
  } catch (error) {
    console.log(error.message);
  }
};


const addBlog = async (req, res) => {
  try {
    const images = req.files;
console.log(images);
    

    const blog = Blogs.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      image: images[0].filename,
      userId: userSession.userId,
    });
   
    if (blog) {
      console.log("added");
      res.render("addBlog", {
        blog,
        message: "blog added successfully.",
      });
    } else {
            console.log("else");

      res.render("addBlog", {
        message: "registration failed",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadUserLogin,
  loadUserRegistration,
  registerUser,
  loadHome,
  verifyUserLogin,
  loadAddBlog,
  addBlog,
};