const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
  ssl: true,
});

async function getAllMessages() {
  const result = await pool.query("SELECT * FROM messages");
  return result.rows;
}

async function addMessage(username, text) {
  await pool.query("INSERT INTO messages (username, text) VALUES ($1, $2)", [
    username,
    text,
  ]);
}

async function getMessage(id) {
  const result = await pool.query("SELECT * FROM messages WHERE id=$1", [id]);
  return result.rows[0];
}

module.exports = {
  getAllMessages,
  addMessage,
  getMessage,
};
