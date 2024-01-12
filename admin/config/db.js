const express = require('express');
const mySql = require('mysql');
require('dotenv').config();

// db.js
const pool = mySql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database!');
        connection.release();
    }
});

module.exports = pool;
