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

shopRouter.get('/get_all_products',async  (request, response) => {
  let selectQuery = 'SELECT * FROM all_products';
  const [products] = await connection.query(selectQuery);
  
  if(products.length > 0) {
    response.json({ result: products})
  }
  else {
    response.json({ result: 'Unable to fetch products'})
  }

})

shopRouter.get('/category_products', async (request, response) => {
  const categoryProductVariable = request.query.categoryVariable;
  let getProducts = `SELECT * FROM all_products WHERE product_category = ?`;
  const [categorizedProducts] = await connection.query(getProducts, [categoryProductVariable])

    if(categorizedProducts.length > 0) {
      response.json({ result: categorizedProducts })
    }
    else {
      response.json({ result: 'No Products Found in this Category'})
    }
})

module.exports = shopRouter;