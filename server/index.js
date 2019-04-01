const express = require('express');
const app = express();
const http = require('http').Server(app);
const history = require('connect-history-api-fallback');
const io = require('socket.io')(http);
const Gpio = require('onoff').Gpio;
const floppyDetect = require('./floppy-detect');

// Setup floppy detection callbacks
floppyDetect
  .on('DISK_REMOVED', () => {
    console.log("DISK REMOVED")
  })
  .on('DISK_FOUND', (disk) => {
    console.log(`FOUND ${disk}`);
});

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