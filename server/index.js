const express = require('express');
const app = express();
const http = require('http').Server(app);
const history = require('connect-history-api-fallback');
const io = require('socket.io')(http);
const Gpio = require('onoff').Gpio;
const floppyDetect = require('./floppy-detect');

// Setup floppy detection callbacks
let CURRENT_DISK = -1
floppyDetect
  .on('DISK_REMOVED', () => {
    console.log("DISK: REMOVED")
    CURRENT_DISK = -1
    io.emit('DISK_REMOVED')
  })
  .on('DISK_FOUND', (disk) => {
    console.log(`DISK: FOUND ${disk}`)
    CURRENT_DISK = disk
    io.emit('DISK_FOUND', disk)
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
        console.log(`BUTTON: 1`);
        io.emit('BUTTON', { index: 0});
    });

    new Gpio(15, 'in', 'rising', {debounceTimeout: 10}).watch((err, value) => {
        console.log(`BUTTON: 2`);
        io.emit('BUTTON', { index: 1});
    });

    new Gpio(18, 'in', 'rising', {debounceTimeout: 10}).watch((err, value) => {
        console.log(`BUTTON: 3`);
        io.emit('BUTTON', { index: 2});
    });

    new Gpio(23, 'in', 'rising', {debounceTimeout: 10}).watch((err, value) => {
      console.log(`BUTTON: 4`);
      io.emit('BUTTON', { index: 3});
    });

    new Gpio(24, 'in', 'rising', {debounceTimeout: 10}).watch((err, value) => {
      console.log(`BUTTON: 5`);
      io.emit('BUTTON', { index: 4});
    });
}

io.on('connection', function(socket){
  console.log('client connected');
  if (CURRENT_DISK !== -1) {
    io.emit('DISK_FOUND', CURRENT_DISK)
  } else {
    io.emit('DISK_REMOVED')
  }
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});