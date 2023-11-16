const express = require('express')
const app = express();
const path = require('path')
const shopRouter = express.Router()
const bodyParser = require('body-parser');
const Transporter = require('../config/mail')

app.use(express.static(path.join(__dirname, 'public')))
shopRouter.use(express.json())


shopRouter.post('/product', (request, response) => {
  const prodname = request.body.prodname;
  response.json({ message: prodname });
});

// shopRouter.get('/hello', (request, response) => {
//   const rs = 'hello';
//   response.json(rs)
// })

module.exports = shopRouter;