const express = require('express')
const path = require('path')
const mailRouter = express.Router()
const app = express()
const Mailmiddleware = require('../controllers/middleware');
mailRouter.use(express.json())


mailRouter.post('/mail-sent', Mailmiddleware)



module.exports = mailRouter;