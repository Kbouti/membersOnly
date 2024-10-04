const pool = require("../pool");

exports.addPost = async (user, title, message, timestamp) => {
  console.log(`query addPost triggered`);

  const sql = `insert into posts (author, title, message, timestamp) values ($1, $2, $3, $4)`;

  const array = [user, title, message, timestamp];
  const response = await pool.query(sql, array);
  return;
};


exports.fetchPosts = async () => {
    console.log(`query fetchPosts triggered`);
    const sql = "select posts.post_id, posts.title, posts.message, posts.timestamp, users.first_name from posts inner join users on posts.author = users.user_id"
    const {rows} = await pool.query(sql);
    return rows;
}

exports.deletePost = async (post_id) => {
    console.log(`Query deletePost called for post_id ${post_id}`);

    const sql = `delete from posts where post_id = ${post_id}`;
    const response = await pool.query(sql);
    return response;
}