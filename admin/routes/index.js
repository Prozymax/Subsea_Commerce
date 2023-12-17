const express = require('express');
const app = express()
const router = express.Router()
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path')
const upload = require('../config/multer'); // Import the Multer configuration
const connection = require('../config/db');

app.use(cors({
    origin: 'http://app.aurumsafety.com',
    methods: 'GET, POST, DELETE, PUT, PATCH, HEAD',
    credentials: true,
  }))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));

router.post('/upload', upload.single('image'), (request, response) => {
  const { prodname, description, prodCategory, featured } = request.body;
  const imageUrl = `/uploads/${request.file.filename}`;

  const productData = {
    product_name: prodname,
    product_category: prodCategory,
    productImageDescription: description,
    productImageUrl: imageUrl,
    isFeatured: featured,
  }

  // Handle other form data and the image URL as needed
  console.log(`Title: ${prodname}, Description: ${description}, Other Form Data: ${prodCategory}, Image URL: ${imageUrl}, Featured: ${featured}`);

  let insertQuery = 'INSERT INTO all_products SET ?'
  connection.query(insertQuery, [productData], (err, result) => {
    if (err) response.json('Error');
    else if(result.affectedRows > 0) response.status(200).json(result)
    else response.json('No Internet Connection..')
  })

  // response.status(200).send('Image uploaded and form data received successfully');
});


module.exports = router;