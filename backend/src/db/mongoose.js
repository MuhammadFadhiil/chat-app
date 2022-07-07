const mongoose = require('mongoose');

// setup mongodb
mongoose.connect(`mongodb://root:ch4t4pp@chatapp-mongodb:27017/chat-app?authSource=admin`);

const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connected'));