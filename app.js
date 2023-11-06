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


// middlewares
const Mailmiddleware = require('./controllers/middleware')

//server config
const server = http.createServer(app)
const indexRouter = require('./routes/index');
const shopRouter = require('./routes/shopRoutes');
const mailRouter = require('./routes/mailRoutes')

app.use('/', indexRouter)
app.use('/shop', shopRouter)
app.use('/contact-us', mailRouter)

server.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`)
})