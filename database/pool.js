const { Pool } = require("pg");
require("dotenv").config();

const mode = process.env.MODE;

module.exports = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

// **********************************************************************

// insert into users (first_name, last_name, email, password, is_member, is_admin) values ('Kevin', 'Boutilier', 'kevin.f.boutilier@gmail.com', 'somethingSilly', true, true);

// insert into posts (author, title, message) values (1, 'First', 'I am the first one to post');