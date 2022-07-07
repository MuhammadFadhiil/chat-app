var app = require('../index')
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(4000);

// socket io
io.on('connection', function (socket) {
  console.log('User connected');
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
  socket.on('save-message', function (data) {
    console.log(`data from socket`);
    console.log(data);
    io.emit('new-message', data);
  });
});

module.exports = io;