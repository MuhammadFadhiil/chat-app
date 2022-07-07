const express = require('express');
const cors = require('cors')
const room = require('../src/routes/room');
const chat = require('../src/routes/chat');
require('../src/routes/socketio');
require('../src/db/mongoose');

const app = express();
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/room', room);
app.use('/api/chat', chat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});

module.exports = app;