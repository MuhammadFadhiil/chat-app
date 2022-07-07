const mongoose = require('mongoose');

// setup mongodb
mongoose.connect('mongodb://localhost:27017/chat-app');

const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connected'));