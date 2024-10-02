const pool = require("../pool");

exports.addPost = async (user, title, message, timestamp) => {
  console.log(`query addPost triggered`);

  const sql = `insert into posts (author, title, message, timestamp) values ($1, $2, $3, $4)`;

  const array = [user, title, message, timestamp];
  const response = await pool.query(sql, array);
  return;
};
