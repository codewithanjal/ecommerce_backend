const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    // In serverless, we don't want to exit the process
  }
};

module.exports = connectDB;
