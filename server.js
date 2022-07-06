// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const nodemon = require("nodemon");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/index", (req, res) => {
  //res.render("index");
  res.render("index");
});

app.get("/voters", (req, res) => {
  res.render("voters");
});

//index page
app.get("/polls", (req, res) => {
  // const userId = req.session.user_id;
  // let _url = urlsForUser(userId);
  // let shortURLArr = [];

  // shortURLArr.push(_url);
  // const userUrls = {}

  // for (const url in urlDatabase) {
  //   const urldetails = urlDatabase[url]
  //   if (urldetails["userID"] === userId) {
  //     userUrls[url] = urldetails;
  //   }
  // }

  // const templateVars = {
  //   user: users[userId],
  //   urls: userUrls,
  //   shortURL: shortURLArr
  // };

  res.render("polls"); //, templateVars);
});

app.get("/register", (req, res) => {
  render("views/register.ejs");
});

//auto login the user with user's id
// app.get("/login/:id", (req, res) => {
//   // using encrypted cookies
//   req.session.user_id = req.params.id;

//   // send the user to root home page
//   res.redirect("/");
// });

// app.post("/register", (req, res) => {
//   const userEmail = req.session.email;
//   const userPassword = req.session.password;
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
