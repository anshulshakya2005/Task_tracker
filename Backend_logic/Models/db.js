const mongoose = require('mongoose');
require('dotenv').config();
const DB_URL = process.env.DB_URL ;
console.log('DB_URL:', DB_URL); // Log the DB_URL to verify it's being read correctly
mongoose.connect(DB_URL).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.error('Error connecting to MongoDB:', err);
});