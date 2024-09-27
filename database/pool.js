const { Pool } = require("pg");


const mode = process.env.MODE;

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.database,
    port: 5432
})