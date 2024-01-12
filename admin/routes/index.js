const express = require('express');
const app = express()
const router = express.Router()
const cors = require('cors')
const path = require('path')
const upload = require('../config/multer'); // Import the Multer configuration
const pool = require('../config/db');

const allowedOrigins = [
  'http://localhost:2000',
  'https://www.aurumsafety.com',
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

  const insertQuery = 'INSERT INTO all_products SET ?';
  
  // Assuming productData is an object containing the data you want to insert
  
  pool.getConnection((err, connection) => {
    if (err) {
      // Handle error in getting a connection from the pool
      response.json({ error: 'Error getting a database connection' });
      return;
    }
  
    // Use the connection to execute the query
    connection.query(insertQuery, [productData], (err, result) => {
      // Release the connection back to the pool
      connection.release();
  
      if (err) {
        // Handle query execution error
        response.json({ error: 'Error executing the query' });
      } else if (result.affectedRows > 0) {
        // Query executed successfully
        response.status(200).send('Image uploaded and form data received successfully');
      } else {
        // No rows affected
        response.json({ error: 'No rows affected' });
      }
    });
  });
  

});


module.exports = router;