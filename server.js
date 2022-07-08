// load .env data into process.env
require("dotenv").config();
let alert = require("alert");
// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const cookieSession = require("cookie-session");
// $ = require("jquery");

const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

//Mail sending API
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const {
//   // pollsDatabase,
//   // getUserByEmail,
//   // users,
//   // generateRandomString,
//   // pollsForUser
// } = require("./helpers");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["oh", "Lord", "Christ", "Jesus"],
  })
);

app.set("view engine", "ejs");

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));
app.use("/styles", express.static("styles"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
//const { user } = require("pg/lib/defaults");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

//Link root project directory to the index page
app.get("/", (req, res) => {
  res.render("index");
});

//Map url /polls to the polls page
app.get("/polls", (req, res) => {
  res.render("polls");
});

<<<<<<< HEAD
//Start up the server
=======
app.get("/results", (req, res) => {
  let firstChoice;
  let firstPoints;
  let secondChoice;
  let secondPoints;
  let thirdPoints;
  let thirdChoice;

  db.query(
    `SELECT activity, rating FROM submission JOIN polls on poll_id = polls.id WHERE poll_id = 2 ORDER BY rating DESC;`,
    [],
    (err, response) => {
      console.log(response.rows);
      firstChoice =response.rows[0].activity;
      firstPoints =response.rows[0].rating;
      secondChoice = response.rows[1].activity;
      secondPoints = response.rows[1].rating;
      thirdPoints  = response.rows[2].rating;
      thirdChoice =response.rows[2].activity;

      const templateVars = {
        firstChoice: firstChoice,
        firstPoints: firstPoints,
        secondChoice: secondChoice,
        secondPoints: secondPoints,
        thirdChoice: thirdChoice,
        thirdPoints: thirdPoints
      };
      console.log(templateVars);
      res.render("results", templateVars);
    }
  );
});

>>>>>>> 95e8980bc3bbe3873c0a105ff871c6c6c6e52eb7
app.listen(PORT, () => {
  console.log(`Votr app listening on port ${PORT}.`);
});

//Map url /vote to the voters page
app.get("/vote", (req, res) => {
  const templateVars = {
    firstChoice: choice1,
    secondChoice: choice2,
    thirdChoice: choice3,
  };
  res.render("voters", templateVars);
});

//Map url /results to the results page
app.get("/results", (req, res) => {
  res.render("results");
});

//User create a poll
app.post("/polls", (req, res) => {
  const userEmail = req.body.email;

  if (userEmail) {
    db.query(`INSERT INTO users (email)
    VALUES ($1)`, [userEmail], (err, response) => {
    });
  }


  /*
  db.query(`INSERT INTO polls (
    user_id,
    title,
    description,
    poll_link,
    results_link
  )VALUES (
    4,
    'Movies',
    'Movies to watch',
    'www.google.com/links',
    'www.google.com/results'
  ),`);
  db.query(`SELECT * FROM `, [], (err, response) => {
    console.log(err ? err.stack : response.rows);
  });*/

  const msg = {
    to: userEmail, // recipient
    from: "hamza.asim090@gmail.com", // verified sender
    subject: "Mail test",
    text: "If you can read this, it worked",
    html: '<p><a href="http://localhost:8080/vote">Voting Link</a></p> <p><a href="http://localhost:8080/results">Results Link</a></p>',
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });

  res.redirect("/");
  alert("Email Sent!");
});
