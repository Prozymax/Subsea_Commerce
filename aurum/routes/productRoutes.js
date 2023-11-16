const express = require('express')
const productRoutes = express.Router()
productRoutes.use(express.json())
const connection = require('../config/db')

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

module.exports = productRoutes;