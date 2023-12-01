const express = require('express')
const path = require('path')
const connection = require('../config/db')
const { ifError } = require('assert')
const { assert } = require('console')
const router = express.Router()
const app = express()
router.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

router.get('/company', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/company.html'))
})
router.get('/blog', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/blog.html'))
})
router.get('/shop', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/shop.html'))
})
router.get('/privacy-policy', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/privacy.html'))
})
router.get('/quality-policy', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/quality.html'))
})
router.get('/refund-policy', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/refund.html'))
})
router.get('/contact-us', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/contact.html'))
})
router.get('/services', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/services.html'))
})
router.get('/mission', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/mission.html'))
})
router.get('/delivery', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/delivery.html'))
})
router.get('/privacy', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/privacy.html'))
})
router.get('/quality', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/quality.html'))
})
router.get('/refund', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/refund.html'))
})

router.get('/product', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/product.html'))
})

router.get('/get-featured', (request, response) => {
    let getFeaturedQuery = `SELECT * FROM all_products WHERE isFeatured = ?`
    connection.query(getFeaturedQuery, ['Yes'], (err, result) => {
        if (err) {
            console.log('Error Connection with Database....');
            // response.json({ result: 'Error Connecting with Database...' })
            throw err
        }
        else if(result.length > 0) {
            console.log(result)
            response.json({ result: result });
        }
        else {
            console.log('Error getting featured products available');
            response.json('Error getting featured products available');
        }
    })
})

router.post('mail-us,', )
module.exports = router;