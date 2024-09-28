const pool = require ("../pool");

exports.fetchUsers = async () => {
    console.log(`userQuery fetchUsers called`);
    const sql = `select * from users;`
    const  {rows} = await pool.query(sql);
    console.log(`users fetched`);
    return rows;
}

exports.createUser = async (first_name, last_name, email, password, is_member, is_admin) => {
    console.log(`userQuery createUser called`);
    const sql = `insert into users (first_name, last_name, email, password, is_member, is_admin) values ('${first_name}', '${last_name}', '${email}', '${password}', ${is_member}, ${is_admin})`;
    const response = await pool.query(sql);
    return response;
}