const mongoose = require('mongoose');


// MongoDB connection string
const localDB = 'mongodb://localhost:27017/pharmacy-pos';

// Connect to MongoDB
const connectDB = async()=> {
    await mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('Connected to MongoDB!');
};
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
 
// });


module.exports = connectDB;