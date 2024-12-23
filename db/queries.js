const pool = require("./pool");

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  const user = rows[0];

  return user;
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  const user = rows[0];

  return user;
}

async function insertUser(username, password) {
  await pool.query(
    "INSERT INTO users (username, password, membership_status, admin) VALUES ($1, $2, $3, $4)",
    [username, password, false, false]
  );
}

async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  const messages = rows;

  return messages;
}

async function updateUserMembershipStatus(id, membershipStatus) {
  await pool.query("UPDATE users SET membership_status = $1 WHERE id = $2", [
    membershipStatus,
    id,
  ]);
}

async function insertMessage(username, title, text) {
  await pool.query(
    "INSERT INTO messages (username, title, text) VALUES ($1, $2, $3)",
    [username, title, text]
  );
}

async function deleteMessage(id) {
  await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}

module.exports = {
  getUserByUsername,
  getUserById,
  insertUser,
  getMessages,
  updateUserMembershipStatus,
  insertMessage,
  deleteMessage,
};
