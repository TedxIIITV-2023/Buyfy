//hi i am vansh
const express = require('express');
const path = require('path');
const app = express();

const products = [
  // Your product data goes here
  {
    "id": 1,
    "name": "iPhone Pro 11",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "price": 500.99,
    "image": "./assets/pro1.jpg",
    "rating": 4.5
  },
  {
    "id": 2,
    "name": "lorem",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "price": 500.99,
    "image": "./assets/pro2.jpg",
    "rating": 4.5
  },
  {
    "id": 3,
    "name": "ipsum",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "price": 500.99,
    "image": "./assets/pro3.jpg",
    "rating": 4.5
  },
  {
    "id": 4,
    "name": "ipsum",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "price": 500.99,
    "image": "./assets/pro4.jpg",
    "rating": 4.5
  },
  {
    "id": 5,
    "name": "ipsum",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "price": 500.99,
    "image": "./assets/pro5.jpg",
    "rating": 4.5
  },
  {
    "id": 6,
    "name": "ipsum",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "price": 500.99,
    "image": "./assets/pro6.jpg",
    "rating": 4.5
  }
];

app.use(express.static(path.join(__dirname, '../public')));

// Define the API endpoint to serve the products data
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Add the route for serving the 'index.html' file
app.get('/', (req, res) => {
  // Send the 'index.html' file as a response
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Add the route for serving the 'cart.html' file
app.get('/cart.html', (req, res) => {
  // Send the 'cart.html' file as a response
  res.sendFile(path.join(__dirname, '../public/cart.html'));
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
