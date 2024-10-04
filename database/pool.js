const { Pool } = require("pg");
require("dotenv").config();

const mode = process.env.MODE;

let host;
let user;
let database;
let password;


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



module.exports = new Pool({
  host,
  user,
  database,
  password,
  port: 5432,
});

// **********************************************************************

// insert into users (first_name, last_name, email, password, is_member, is_admin) values ('Kevin', 'Boutilier', 'kevin.f.boutilier@gmail.com', 'somethingSilly', true, true);

// insert into posts (author, title, message) values (1, 'First', 'I am the first one to post');