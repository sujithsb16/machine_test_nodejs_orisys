const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");

const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.urlencoded({ extended: true }));

const config = require("./config/config");

const db = require("./models");
dotenv.config();
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: config.sessionSecret,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
    resave: false,
  })
);

app.set("view-engine", "ejs");

// Set view engine for userRoutes
userRoutes.set("view engine", "ejs");
userRoutes.set("views", "./views/user");

app.use("/", userRoutes);
app.use("/", express.static("public"));
app.use("/", express.static("public/assets"));

const PORT = process.env.PORT || 4000;

db.sequelize.sync().then(() => {
  app.listen(PORT, console.log(`Server started on port ${PORT}`));
});
