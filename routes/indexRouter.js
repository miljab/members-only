const express = require("express");
const {
  messagesGet,
  membershipGet,
  membershipPost,
  newMessageGet,
  newMessagePost,
  messageDelete,
} = require("../controllers/indexController");
const { isAuth } = require("../controllers/authController");
const router = express.Router();

router.get("/", isAuth, messagesGet);
router.get("/membership", isAuth, membershipGet);
router.post("/membership", isAuth, membershipPost);
router.get("/message", isAuth, newMessageGet);
router.post("/message", isAuth, newMessagePost);
router.post("/message/delete/:id", isAuth, messageDelete);

module.exports = router;
