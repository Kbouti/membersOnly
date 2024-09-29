const { Client } = require("pg");

require("dotenv").config();
console.log(`dropTables file running`);

const database = process.env.DATABASE;
const user = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const connectionString = `postgresql://${user}:${password}@${host}:5432/${database}`;


const SQL = `
drop table posts;
drop table users;
`;

async function main() {
  console.log("Deleting all tables");
  const client = new Client({
    connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
