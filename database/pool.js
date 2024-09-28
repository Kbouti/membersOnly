const { Pool } = require("pg");

const mode = process.env.MODE;

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

// **********************************************************************
// First we gotta make our tables

// CREATE TABLE IF NOT EXISTS users (
//     user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//     first_name VARCHAR ( 30 ),
//     last_name VARCHAR ( 30 ),
//     email VARCHAR ( 100 ),
// password varchar (100),
//     is_member BOOLEAN NOT NULL,
//      is_admin BOOLEAN NOT NULL
//   );

// CREATE TABLE IF NOT EXISTS posts (
//     post_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//     author int,
//     foreign key (author) references users(user_id),
//     title VARCHAR ( 50 ),
//     message VARCHAR ( 1000 )
//   );


// insert into users (first_name, last_name, email, password, is_member, is_admin) values ('Kevin', 'Boutilier', 'kevin.f.boutilier@gmail.com', 'somethingSilly', true, true);

// insert into posts (author, title, message) values (1, 'First', 'I am the first one to post');