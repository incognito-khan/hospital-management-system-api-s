const mongoose = require('mongoose');


// MongoDB connection string
// const localDB = 'mongodb+srv://prostep:prostep123@pharmacy-pos.86ggams.mongodb.net/';
const localDB = 'mongodb+srv://prostep:prostep123@prostep.kvnevfi.mongodb.net/pharmacy-pos';

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