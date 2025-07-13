const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seedData = require('./seedData');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Ecommerce';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('🔗 Connected to MongoDB');
  return seedData();
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
}); 