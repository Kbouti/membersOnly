const pool = require("../pool");

const correctMemberCode = "bikes";
const correctAdminCode = "moreBikes";

exports.fetchUsers = async () => {
  console.log(`userQuery fetchUsers called`);
  const sql = `select * from users;`;
  const { rows } = await pool.query(sql);
  console.log(`users fetched`);
  return rows;
};

exports.createUser = async (
  first_name,
  last_name,
  email,
  loginCode,
  password
) => {
  console.log(`userQuery createUser called`);

  let isMember = false;
  let isAdmin = false;
  if (loginCode == correctMemberCode) {
    isMember = true;
  } else if (loginCode == correctAdminCode) {
    isMember = true;
    isAdmin = true;
  }

  const sql = `insert into users (first_name, last_name, email, password, is_member, is_admin) values ('${first_name}', '${last_name}', '${email}', '${password}', ${isMember}, ${isAdmin});`;
  console.log(`sql: ${sql}`);
  const response = await pool.query(sql);
  return response;
};

exports.getUserByEmail = async (email) => {
  console.log(`userQuery getUserByEmail called, email: ${email}`);
  const { rows } = await pool.query(
    `select * from users where email = '${email}';`
  );
  return rows;
};
