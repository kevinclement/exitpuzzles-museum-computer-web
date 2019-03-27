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
    const button = new Gpio(14, 'in', 'rising', {debounceTimeout: 10});
    button.watch((err, value) => {
        console.log(`button: ${value}`);
        io.emit('button', { index: 0});
    });
}

io.on('connection', function(socket){
  console.log('client connected');
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});