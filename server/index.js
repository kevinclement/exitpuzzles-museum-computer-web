var express = require('express');
var app = express();
var http = require('http').Server(app);
var history = require('connect-history-api-fallback');
var io = require('socket.io')(http);
const Gpio = require('onoff').Gpio;

// Register static and history overrides
const staticFileMiddleware = express.static(__dirname + '../../dist/');
app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));
app.use(staticFileMiddleware);

// Hookup gpio for buttons if we're not on windows
if (process.platform !== "win32") {
    new Gpio(14, 'in', 'rising', {debounceTimeout: 10}).watch((err, value) => {
        console.log(`button1`);
        io.emit('button', { index: 0});
    });

    new Gpio(15, 'in', 'rising', {debounceTimeout: 10}).watch((err, value) => {
        console.log(`button2`);
        io.emit('button', { index: 1});
    });

    new Gpio(18, 'in', 'rising', {debounceTimeout: 10}).watch((err, value) => {
        console.log(`button3`);
        io.emit('button', { index: 2});
    });

    new Gpio(23, 'in', 'rising', {debounceTimeout: 10}).watch((err, value) => {
      console.log(`button4`);
      io.emit('button', { index: 3});
    });

    new Gpio(24, 'in', 'rising', {debounceTimeout: 10}).watch((err, value) => {
      console.log(`button5`);
      io.emit('button', { index: 4});
    });
}

io.on('connection', function(socket){
  console.log('client connected');
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});