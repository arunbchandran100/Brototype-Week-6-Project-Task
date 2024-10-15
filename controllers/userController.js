const collection = require("../models/mongodb");
const isAuthenticated = require("../middleware/authmildware");

// Signup page logic
exports.signup = (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    res.render("user/signup");
  }
};

// Signup POST logic
exports.signuppost = async (req, res) => {
  console.log(req.body, "signup details");

  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const existingUser = await collection.findOne({ email: userData.email });
  if (existingUser) {
    res.render("user/signup");
    console.log("User already exists");
  } else {
    await collection.insertMany(userData);
    res.redirect("/user/login");
  }
};

// Login page logic
exports.login = (req, res) => {
  const errorMessage = req.session.err || " ";
  req.session.err = " "; // Clear the error after showing it
  if (req.session.user) {
    res.redirect("/user/home");
  } else {
    res.render("/user/login", { errorMessage }); // Pass errorMessage instead of message
  }
};

exports.loginpost = async (req, res) => {
  try {
    // const check = await collection.findOne({ email: req.body.email });
     if (username === req.body.username && password === req.body.password) {
       req.session.user = req.body.email;
       res.redirect("/user/home");
     } else {
       req.session.err = "Invalid email address or password";
       res.redirect("/user/login");
     }
  } catch (error) {
    req.session.err = "Invalid email address or password";
    res.redirect("/user/login");
  }
};


// Home page logic, protected by isAuthenticated middleware
exports.home = [
  isAuthenticated,
  async (req, res) => {
    try {
      const user = await collection.findOne({ email: req.session.user });
      if (user) {
        res.render("home", {
          userName: user.name,
          userEmail: req.session.user,
        });
      } else {
        req.session.user = false;
        res.redirect("/user/login");
      }
    } catch (error) {
      console.error("Error in the home", error.message);
    }
  },
];

// Logout logic
exports.logout = (req, res) => {
  req.session.user = false;
  res.redirect("/user/login");
};
