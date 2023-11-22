const express = require('express')
const productRoutes = express.Router()
const mailer = require('../config/mail')
productRoutes.use(express.json())
const connection = require('../config/db')
const Mailmiddleware = require('../controllers/middleware')

productRoutes.get('/product_details', (request, response) => {
    const productname = request.query.prodname;
    let selectQuery = 'SELECT * from all_products where product_name = ?'
    connection.query(selectQuery, [productname], (selectError, selectResult) => {
        if (selectError) {
                console.log('Error while connecting to database') 
                response.json({ result: 'Error while connecting to database'})
                return;
        }
       else if(selectResult.length > 0) {
        response.json({ result: selectResult[0]})
       }
       else {
        response.json({ result: 'This data doesnt exist' })
       }
    })
})


productRoutes.post('/product-category', (request, response) => {
    const category = request.body.category
    let catQuery = 'SELECT * FROM all_products where product_category = ?'
    connection.query(catQuery, [category], (err, catResult) => {
        if (err) {
        console.log('Error')
        response.json({ result: 'Error Connecting to database' })
        }
        else if(catResult.length > 0) {
            console.log(catResult)
            response.json({ result: catResult })
        }
        else {
            response.json({ result: 'No data found' })
        }
    })
})

productRoutes.post('/quote-sent', Mailmiddleware)

module.exports = productRoutes;