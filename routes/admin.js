const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");


router.get("/login", adminController.login);
router.post("/login", adminController.loginpost);
router.get("/home", adminController.home);
router.post("/logout", adminController.logout);

module.exports = router;
