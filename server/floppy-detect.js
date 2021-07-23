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
let missingFor = 0;
const myEmitter = new EventEmitter();

const softSPI = new SoftSPI({
  clock:  23,  // pin number of SCLK
  mosi:   19,  // pin number of MOSI
  miso:   21,  // pin number of MISO
  client: 24   // pin number of CS
});

const mfrc522 = new Mfrc522(softSPI).setResetPin(22)

// test for file already mounted, do it in a timeout so 
// main program will have event registered
setInterval(() => {
    let disk = checkForDisk()

    if (disk !== curDisk) {
      // special case missing disk and debounce it
      if (disk == 0) {
        missingFor++
        if (missingFor >= 5) {
          console.log('missing long enough, triggering event');
          myEmitter.emit(EVENTS.DISK_REMOVED)
          curDisk = disk;
        }
      } else {
        myEmitter.emit(EVENTS.DISK_FOUND, disk)
        missingFor = 0
        curDisk = disk;
      }
    } else {
      missingFor = 0;
    }

}, 1000);

function checkForDisk() {
  mfrc522.reset();
  let response = mfrc522.findCard();
  if (!response.status) {
    //console.log('find card failed');
    return 0;
  }
  
  response = mfrc522.getUid();
  if (!response.status) {
    //console.log('getUid failed');
    return 0;
  }

  // TRIVIA:
  //   [ 215, 109, 140, 242, 196 ]
  //   [ 119, 121, 142, 242, 114 ]
  //   [ 71,  112, 140, 242, 73  ]  (added 7/23/21)
  // JOURNAL:
  //   [ 135, 110, 140, 242, 151 ]
  //   [ 215, 121, 142, 242, 210 ]
  //   [ 167, 122, 142, 242, 161 ]  (added 7/23/21)
  const uid = response.data;

  // TO DEBUG new RFID:
  // console.log("UID: ");
  // console.log(JSON.stringify(uid));

  if ( (uid[0] === 215 && uid[1] === 109 && uid[2] === 140 && uid[3] === 242 && uid[4] === 196) || 
       (uid[0] === 119 && uid[1] === 121 && uid[2] === 142 && uid[3] === 242 && uid[4] === 114) || 
       (uid[0] === 71  && uid[1] === 112 && uid[2] === 140 && uid[3] === 242 && uid[4] === 73 ) ) {
    return 1;
  } else if ( (uid[0] === 135 && uid[1] === 110 && uid[2] === 140 && uid[3] === 242 && uid[4] === 151) || 
              (uid[0] === 215 && uid[1] === 121 && uid[2] === 142 && uid[3] === 242 && uid[4] === 210) || 
              (uid[0] === 167 && uid[1] === 122 && uid[2] === 142 && uid[3] === 242 && uid[4] === 161) ) {
    return 2;
  }
}

module.exports = myEmitter;
