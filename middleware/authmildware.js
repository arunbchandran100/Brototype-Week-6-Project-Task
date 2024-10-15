module.exports = (req, res, next) => {
  if (req.session.user) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.redirect("/login"); // User is not authenticated, redirect to login
  }
};
