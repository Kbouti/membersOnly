const pool = require ("../pool");

exports.fetchUsers = async (req, res) => {
    console.log(`userQuery fetchUsers called`);
    const sql = `select * from users;`
    const  {rows} = pool.query(sql);
    console.log(`users fetched`);
    return rows;
}