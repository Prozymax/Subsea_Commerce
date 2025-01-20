const express = require('express')
const productRoutes = express.Router()
const mailer = require('../config/mail')
productRoutes.use(express.json())
const connection = require('../config/db')
const Mailmiddleware = require('../controllers/middleware')

productRoutes.get('/product_details', async (request, response) => {
    const productname = request.query.prodname;
    let selectQuery = 'SELECT * from all_products where product_name = ?'
    const [allProducts] = await connection.query(selectQuery, [productname])
        
       if(allProducts.length > 0) {
        response.json({ result: allProducts[0]})
       }
       else {
        response.json({ result: 'This data doesn\'t exist' })
       }
})


productRoutes.post('/product-category', async (request, response) => {
    const category = request.body.category
    let catQuery = 'SELECT * FROM all_products where product_category = ?'
    const [categoryProduct] = await connection.query(catQuery, [category])
        
        if(categoryProduct.length > 0) {
            response.json({ result: categoryProduct })
        }
        else {
            response.json({ result: 'No data found' })
        }
})

productRoutes.post('/quote-sent', Mailmiddleware)

module.exports = productRoutes;