const express = require('express')
const mySql = require('mysql')
const connection = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Aurum',
})

module.exports = connection;