const mySql = require('mysql2')
require('dotenv').config()
const pool = mySql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

const connection = pool.promise()

const testConnection = async () => {
    try 
    {
        const db_connection = await connection.getConnection();
        console.log('Connection is active');
        db_connection.release()
    }
    catch (error) {
        console.log('Error connecting to the database', error.message)
    }
}

testConnection()


module.exports = connection;