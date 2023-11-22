const express = require('express')
const app = express();
const path = require('path')
const shopRouter = express.Router()
const bodyParser = require('body-parser');
const Transporter = require('../config/mail');
const connection = require('../config/db');

app.use(express.static(path.join(__dirname, 'public')))
shopRouter.use(express.json())


shopRouter.post('/product', (request, response) => {
  const prodname = request.body.prodname;
  response.json({ message: prodname });
});

shopRouter.get('/get_all_products', (request, response) => {
  let selectQuery = 'SELECT * FROM all_products';
  connection.query(selectQuery, (selectErr, selectResult) => {
    if (selectErr) {
      response.json({ result: 'Error connecting with database' }) 
    return;
  }
  else if(selectResult.length > 0) {
    console.log(selectResult)
    response.json({ result: selectResult})
  }
  else {
    response.json({ result: 'Unable to fetch products'})
  }
  })
})

// shopRouter.get('/hello', (request, response) => {
//   const rs = 'hello';
//   response.json(rs)
// })

module.exports = shopRouter;