const fs = require('fs');
const json = require('../db.json');
const fb = require('firebase/app');
const database = require('firebase/database');
var cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const history = require('connect-history-api-fallback');
const io = require('socket.io')(http);
const Gpio = require('onoff').Gpio;
const bodyParser = require('body-parser');
let settings = require('./savedSettings.json');
let CURRENT_DISK = 0

// handle saved settings
app.use(cors())
app.use(bodyParser.json())
app.get('/settings', cors(), function (req, res) {
  res.json(settings)
})

app.post('/settings', function (req, res) {
  settings = req.body;
  fs.writeFile('server/savedSettings.json', JSON.stringify(settings), 'utf8', () => { console.log(`saved setting file.`);});
  res.send('OK')
})

// Register static and history overrides
const staticFileMiddleware = express.static(__dirname + '../../dist/');
app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));
app.use(staticFileMiddleware);

// Hookup gpio for buttons if we're not on windows
// as well as floppy detection
if (process.platform !== "win32") {

    // floppy disk detection
    require('./floppy-detect')
      .on('DISK_REMOVED', () => {
          console.log("DISK: REMOVED")
          CURRENT_DISK = 0
          io.emit('DISK_REMOVED')
      })
      .on('DISK_FOUND', (disk) => {
          console.log(`DISK: FOUND ${disk}`)
          CURRENT_DISK = disk
          io.emit('DISK_FOUND', disk)
      });

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

// hookup firebase
const db = fb
  .initializeApp({ databaseURL: require('../db.json').prod })
  .database()

// update started time and set a ping timer
db.ref('museum/status/quiz').update({
  started: (new Date()).toLocaleString(),
  ping: (new Date()).toLocaleString()
})

// heartbeat timer
setInterval(()  => {
  db.ref('museum/status/quiz').update({
    ping: (new Date()).toLocaleString()
  })
}, 30000)

// web socket connection
io.on('connection', function(socket){
  console.log('client connected');
  if (CURRENT_DISK !== 0) {
    console.log(`current disk already present.  sending disk ${CURRENT_DISK}`);
    io.emit('DISK_FOUND', CURRENT_DISK)
  } else {
    console.log(`no disk found initially.  sending disk removed.`);
    io.emit('DISK_REMOVED')
  }
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});