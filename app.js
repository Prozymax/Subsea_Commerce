const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 2000;
const bodyParser = require('body-parser');
const connection = require('./config/db');
const http = require('http')
const app = express()
dotenv.config();

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({}))


//server config
const server = http.createServer(app)
const indexRouter = require('./routes/index');
const shopRouter = require('./routes/shopRoutes');

app.use('/', indexRouter)
app.use('/shop', shopRouter)

server.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`)
})