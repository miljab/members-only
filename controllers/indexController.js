const db = require("../db/queries");

async function messagesGet(req, res) {
  const messages = await db.getMessages();
  res.render("messages", { messages, user: req.user });
}

function membershipGet(req, res) {
  res.render("membership", { user: req.user });
}

async function membershipPost(req, res) {
  const { membershipPassword } = req.body;

  if (membershipPassword === process.env.MEMBERSHIP_PASSWORD) {
    await db.updateUserMembershipStatus(req.user.id, true);
    res.redirect("/");
  } else {
    res.render("membership", {
      message: "Incorrect password",
      user: req.user,
    });
  }
}

function newMessageGet(req, res) {
  res.render("newMessage");
}

async function newMessagePost(req, res) {
  const { title, text } = req.body;
  await db.insertMessage(req.user.username, title, text);
  res.redirect("/");
}

async function messageDelete(req, res) {
  await db.deleteMessage(parseInt(req.params.id));
  res.redirect("/");
}

module.exports = {
  messagesGet,
  membershipGet,
  membershipPost,
  newMessageGet,
  newMessagePost,
  messageDelete,
};
