const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const db = require("../db/queries");

function loginGet(req, res) {
  res.render("login");
}

function registerGet(req, res) {
  res.render("register");
}

const registerValidation = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .custom(async (value) => {
      const user = await db.getUserByUsername(value);
      if (user) {
        throw new Error("Username already exists");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

registerPost = [
  registerValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("register", {
        formData: req.body,
        errors: errors.array(),
      });
    }

    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await db.insertUser(username, hashedPassword);
      res.redirect("/login");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error registering user");
    }
  },
];

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = {
  loginGet,
  registerGet,
  registerPost,
  isAuth,
};
