const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to DB
const connectDB = require('./config/db');
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/uploads", express.static("uploads"));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use("/api/orders", require('./routes/order.routes'));

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get("/favicon.ico", (req, res) => res.status(204));

module.exports = app;

