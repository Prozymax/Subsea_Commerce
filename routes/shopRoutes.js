const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const shopRouter = express.Router()
const PORT = process.env.PORT || 2000;
const bodyParser = require('body-parser');
const http = require('http');
const Transporter = require('../config/mail')
const { isModuleNamespaceObject } = require('util/types');
const app = express()
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({}))


shopRouter.get('/product', (request, response) => {
    const productName = request.query.productName;
    console.log(productName);
      setTimeout(() => {
        response.json({ message: productName })
      }, 5000)
})



module.exports = shopRouter;