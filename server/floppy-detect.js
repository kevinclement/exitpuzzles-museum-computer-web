const EventEmitter = require('events');
const Mfrc522 = require("mfrc522-rpi");
const SoftSPI = require("rpi-softspi");

// consts
const EVENTS = {
  DISK_REMOVED: 'DISK_REMOVED',
  DISK_FOUND: 'DISK_FOUND'
}

// vars
let curDisk = -1;
const myEmitter = new EventEmitter();

const softSPI = new SoftSPI({
  clock: 23,   // pin number of SCLK
  mosi: 19,    // pin number of MOSI
  miso: 21,    // pin number of MISO
  client: 24   // pin number of CS
});

const mfrc522 = new Mfrc522(softSPI).setResetPin(22)

// test for file already mounted, do it in a timeout so 
// main program will have event registered
setInterval(() => {
    let disk = checkForDisk()
    if (disk !== curDisk) {
      if (disk === 0) {
        myEmitter.emit(EVENTS.DISK_REMOVED)
      } else {
        myEmitter.emit(EVENTS.DISK_FOUND, disk)
      }

      curDisk = disk;
    }

}, 1000);

function checkForDisk() {
  mfrc522.reset();
  let response = mfrc522.findCard();
  if (!response.status) {
    return 0;
  }
  
  response = mfrc522.getUid();
  if (!response.status) {
    return 0;
  }

  // TRIVIA:
  //   [ 215, 109, 140, 242, 196 ]
  // JOURNAL:
  //   [ 135, 110, 140, 242, 151 ]
  const uid = response.data;
  if (uid[0] === 215 && uid[1] === 109 && uid[2] === 140 && uid[3] === 242 && uid[4] === 196) {
    return 1;
  } else if (uid[0] === 135 && uid[1] === 110 && uid[2] === 140 && uid[3] === 242 && uid[4] === 151) {
    return 2;
  }
}

module.exports = myEmitter;
