// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const cookieSession = require('cookie-session');

const express = require("express");
const app = express();
const morgan = require("morgan");
const nodemon = require("nodemon");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const {
      pollsDatabase,
       getUserByEmail,
                 users,
  generateRandomString
  // pollsForUser
} = require('./helpers');


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ['oh', 'Lord', 'Christ', 'Jesus'],
}));


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

<<<<<<< HEAD
app.get("/index", (req, res) => {
  //res.render("index");
  res.render("index");
});
=======
//Link project root directory to the index page
app.get("/", (req, res) => {
  //res.render("index");
  res.redirect("/polls");
>>>>>>> e3d117ddf3cd52a987fb4727ec79a60d6f648124

app.get("/voters", (req, res) => {
  res.render("voters");
});

//Link to the index page
app.get("/polls", (req, res) => {
  const user_id = req.session.user_id;
  // let _poll = pollsForUser(userId);
  // let userPollsArr = [];

  // userPollsArr.push(_poll);
  // const userPolls = {}

  // for (const poll in pollsDatabase) {
  //   const pollDetails = pollsDatabase[poll]
  //   if (pollDetails["user_id"] === user_id) {
  //     userPolls[poll] = urldetails;
  //   }
  // }

  const templateVars = {
    user: users[user_id],
    // polls: userPolls,
    // choices: userPollsArr
  };

<<<<<<< HEAD
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
=======
  res.render("index", templateVars);

});


//Link to the voter page
app.get('/polls/polls', (req, res) => {
  res.render('polls');
});


//Link to the voter page
app.get('/polls/voters', (req, res) => {
  res.render('voters');
});


//Link to the results page
app.get('/polls/results', (req, res) => {
  res.render('results');
});


//Link to the register page
app.get('/register', (req, res) => {
  res.render('register');
});


//auto login the user with user's email address
app.get('/login/:user_id', (req, res) => {

  // using encrypted cookies
  req.session.user_id = req.params.user_id;

  // send the user to the index page
  res.redirect('/polls');
});

//from register page back to the index page
app.post('/register', (req, res) => {
  const newUser = req.body.username;
  const userEmail = req.body.email;

  const user_id = generateRandomString();

  // const user_id = db.query(
  //   `SELECT users.id
  //    FROM users
  //    WHERE users.email = $1
  //    LIMIT 1;`, [userEmail])
  //  .then((result) => {
  //    console.log(result.rows[0]);
  //    return result.rows[0];
  //  })
  //  .catch((err) => {
  //    console.log(err.message)
  //  });

  const currentUser = getUserByEmail(userEmail, users);

  if (user_id === '') {
    res.status(400).send('400. Please enter email/password.');
  }

  if(currentUser) {
    res.status(400).send('400. A user with that email has already exist.');
  }

  let user = {
    id: user_id,
    name: newUser,
    email: userEmail
  };
  users[user_id] = user;

  // db
  // .query(
  //  `INSERT INTO users (
  //   id, name, email)
  //   VALUES (
  //   $1, $2, $3) RETURNING *;`,
  //   [user_id, newUser, userEmail])
  // .then((result) => {
  //   console.log(result.rows[0]);
  //   return result.rows[0];
  // })
  // .catch((err) => {
  //   console.log(err.message)
  // });


  req.session.user_id = user_id;
  // req.session.userEmail = userEmail;
  res.redirect("/polls");
});


//To create a poll: polls page
app.post("/polls", (req, res) => {
  // const shortURL = generateRandomString();
  const userEmail = req.body.email;
  const userID = req.session.user_id;

  if (!userID) {
    res.redirect("/register");
  } else {
    // pollsDatabase[userID] = {
    //   id: 1,
    //   user_id: 1,
    //   title: 4,
    //   description: "movie to watch",
    //   poll_link: //administration_link,
    //   results_link:
    // };
    // res.redirect(`/urls/${userID}`);

    //to create one new pol for one user
    // db
    // .query(
    //  `INSERT INTO polls (
    //   user_id, title, description, poll_link, results_link)
    //   VALUES (
    //   $1, $2, $3, $4, $5) RETURNING *;`,
    //   [user_id, "Movie", "Movie to watch", "", "")
    // .then((result) => {
    //   console.log(result.rows[0]);
    //   return result.rows[0];
    // })
    // .catch((err) => {
    //   console.log(err.message)
    // });


    //email for user:
    // const email4User = db.query(
    //   `SELECT poll_link AS administration_link
    //           results_link AS submission_link
    //    FROM users
    //    JOIN polls ON polls.user_id = users.id
    //    WHERE users.id = $1
    //    LIMIT 1;`, [userID])
    //  .then((result) => {
    //    console.log(result.rows[0]);
    //    return result.rows[0];
    //  })
    //  .catch((err) => {
    //    console.log(err.message)
    //  });

    //Choices from the poll for a user
    // const choices = db.query(
    //   `SELECT polls.title AS choice-title
    //           polls.description AS choice-description
    //    FROM users
    //    JOIN polls ON polls.user_id = users.id
    //    WHERE users.id = $1;`, [userID])
    //  .then((result) => {
    //    console.log(result.rows[0]);
    //    return result.rows[0];
    //  })
    //  .catch((err) => {
    //    console.log(err.message)
    //  });

    //should send user a email with two links
    res.redirect('/polls/polls');
  }
});


//from polls page to the voters page
app.post('/polls/polls', (req, res) => {
  //const

  res.redirect('/polls/voters');
});


//from voters page to the results page
app.post('/polls/vote', (req, res) => {
  //const

  res.redirect('/polls/results');
});


//User's logout page
app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/polls');
});

>>>>>>> e3d117ddf3cd52a987fb4727ec79a60d6f648124

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}.`);
});
