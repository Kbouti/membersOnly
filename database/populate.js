const { Client } = require("pg");

require("dotenv").config();
console.log(`populate database file running`);

const mode = process.env.MODE;

let host;
let user;
let database;
let password;

console.log(`accessing env variables for mode: ${mode}`);

if (mode == "development") {
  host = process.env.HOST;
  user = process.env.USER;
  database = process.env.DATABASE;
  password = process.env.PASSWORD
}

else if (mode == "deployment") {
  host = process.env.PGHOST;
  user = process.env.PGUSER;
  database = process.env.PGDATABASE;
  password = process.env.PGPASSWORD;
}

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
    message VARCHAR ( 1000 ),
    timestamp bigint

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
