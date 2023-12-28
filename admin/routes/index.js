const express = require('express');
const app = express()
const router = express.Router()
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path')
const upload = require('../config/multer'); // Import the Multer configuration
const pool = require('../config/db');

const allowedOrigins = [
  'http://localhost:2000',
  'https://aurum-kappa.vercel.app',
  'https://aurumsafety.com',
];

app.use(cors({
  origin: allowedOrigins,
  methods: 'GET, POST, DELETE, PUT, PATCH, HEAD',
  credentials: true,
}));
app.use(express.json());

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

  let insertQuery = 'INSERT INTO all_products SET ?';

  pool.query(insertQuery, [productData], (err, result) => {
      if (err) {
          response.json({ error: 'Error' });
      } else if (result.affectedRows > 0) {
          response.status(200).send('Image uploaded and form data received successfully');
      } else {
          response.json({ error: 'No rows affected' });
      }
  });
  

});


module.exports = router;