const express = require("express");
const passport = require("passport");

const {
  loginGet,
  registerGet,
  registerPost,
} = require("../controllers/authController");
const router = express.Router();

router.get("/login", loginGet);
router.get("/register", registerGet);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
router.post("/register", registerPost);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error during logout." });
    }
    res.redirect("/login");
  });
});

module.exports = router;
