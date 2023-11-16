const express = require('express')
const path = require('path')
const mailRouter = express.Router()
const app = express()
const Mailmiddleware = require('../controllers/middleware');


mailRouter.post('/mail-sent', Mailmiddleware)

mailRouter.post('/quote-sent', Mailmiddleware)

module.exports = mailRouter;