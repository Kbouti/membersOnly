const { Client } = require("pg");

require("dotenv").config();
console.log(`populate database file running`);

const database = process.env.DATABASE;
const user = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const connectionString = `postgresql://${user}:${password}@${host}:5432/${database}`;


const SQL = `

CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR ( 30 ),
    last_name VARCHAR ( 30 ),
    email VARCHAR ( 100 ),
    password varchar (100),
    is_member BOOLEAN NOT NULL,
    is_admin BOOLEAN NOT NULL
  );


CREATE TABLE IF NOT EXISTS posts (
    post_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    author int,
    foreign key (author) references users(user_id),
    title VARCHAR ( 50 ),
    message VARCHAR ( 1000 )
  );
`;

async function main() {
  console.log("Creating project tables");
  const client = new Client({
    connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
