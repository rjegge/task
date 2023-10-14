const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  try {
    // Connect to MongoDB
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB using Mongoose!");
    return mongoose.connection; // Return the connection for further use
  } catch (error) {
    console.dir(error);
    mongoose.connection.close();
  }
};