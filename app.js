
const express = require('express');
const mongoose = require('mongoose');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');

const app = express();

// Connect to database
mongoose.connect('mongodb://localhost/27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());

// Routes
app.use('/products', productsRouter);
app.use('/cart', cartRouter);

// Start server
app.listen(4000, () => {
  console.log('Server started on port 4000');
});
