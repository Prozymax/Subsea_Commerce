const express = require('express')
const path = require('path')
const PORT = 3000;
const http = require('http')
const app = express()
const cors = require('cors')
const server = http.createServer(app)
const dotenv = require('dotenv');

dotenv.config(); 


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


// routers
const adminIndexRouter = require('./routes/index');
const pool = require('./config/db');

// Handling connection errors to avoid crashing the application


// routes
app.use('/', adminIndexRouter);
server.listen(PORT, () => console.log(`App is listening at ${PORT}`))