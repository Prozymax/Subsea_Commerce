const express = require('express')
const path = require('path')
const router = express.Router()
const app = express()

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
router.get('/delivery', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/delivery.html'))
})
module.exports = router;