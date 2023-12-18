const mySql = require('mysql')
require('dotenv').config()
const connection = mySql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})
module.exports = connection;