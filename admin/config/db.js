const express = require('express');
const mySql = require('mysql');
require('dotenv').config();

const pool = mySql.createPool({
    connectionLimit: 10, // Adjust this number based on your application's needs
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

// Handling connection errors to avoid crashing the application
pool.on('error', (err) => {
    console.error('MySQL Pool Error:', err.code);
});

module.exports = pool;
