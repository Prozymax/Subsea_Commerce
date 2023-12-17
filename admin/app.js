const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const connection = require('./config/db');
const http = require('http')
const app = express()
const cors = require('cors')
const server = http.createServer(app)
require('dotenv').config()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:2000',
    methods: 'GET, POST, DELETE, PUT, PATCH, HEAD',
    credentials: true,
  }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(bodyParser.urlencoded({ extended: true }))

// db connectioon check
connection.connect((err) => {
    if(err) console.log(err)
    else console.log('Connection Succesfull')
})

// routers
const adminIndexRouter = require('./routes/index')


// routes
app.use('/', adminIndexRouter);
// server.listen(PORT, () => console.log(`App is listening at ${PORT}`))
server.listen()