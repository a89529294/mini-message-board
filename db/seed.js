require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR ( 255 ),
  username VARCHAR ( 255 ),
  added TIMESTAMPTZ(0) DEFAULT NOW()
);

INSERT INTO messages (text, username) 
VALUES ('Hi, I''m Bryan', 'Bryan');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    ssl: true,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
