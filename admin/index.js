const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const PORT = 3000;
const bodyParser = require('body-parser');
const connection = require('./config/db');
const http = require('http')
const app = express()
const cors = require('cors')
const server = http.createServer(app)
require('dotenv').config()

app.use(express.json())
const allowedOrigins = [
  'http://localhost:2000',
  'https://www.aurumsafety.com',
];

app.use(cors({
  origin: allowedOrigins,
  methods: 'GET, POST, DELETE, PUT, PATCH, HEAD',
  credentials: true,
}));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }))

// db connectioon check
// pool.connect((err) => {
//     if(err) console.log(err)
//     else console.log('Connection Succesfull')
// })

// routers
const adminIndexRouter = require('./routes/index');
const pool = require('./config/db');


// routes
app.use('/', adminIndexRouter);
// server.listen(PORT, () => console.log(`App is listening at ${PORT}`))
server.listen()