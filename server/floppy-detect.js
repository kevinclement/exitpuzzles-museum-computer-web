const fs = require('fs');
const EventEmitter = require('events');
const Tail = new (require('tail')).Tail('/var/log/syslog');

// consts
const MAX_FILE_CHECK = 20;

// vars
let fileCheck = 0;
let diskedRemoved = 0;
const myEmitter = new EventEmitter();

// TODO: check for disk mounted already
// TODO: test really fast

Tail.on('line', function(data) {
  if (/changed media or resized disk sda/.test(data)) {
    if (!diskedRemoved) {
      diskedRemoved = 1;
      myEmitter.emit('DISK_REMOVED');
    }
  }

  if (/sd 0\:0\:0\:0\: \[sda\]/.test(data)) {
    let chkTimer = setInterval(() => {
      let disk = checkForDisk();
      if (disk !== -1) {
        diskedRemoved = 0;
        fileCheck = 0;
        clearTimeout(chkTimer);
        myEmitter.emit('DISK_FOUND', disk);
      } else if (++fileCheck === MAX_FILE_CHECK) {
        console.log(`ERROR: Reached max file check.  Turning off timer.`);
        clearTimeout(chkTimer);
        fileCheck = 0;
      }
    }, 250);
  }
});

function checkForDisk() {
  if (fs.existsSync('/mnt/floppy/disk1.dat')) {
    return 1;
  } else if (fs.existsSync('/mnt/floppy/disk2.dat')) {
    return 2;
  }

  return -1;
}

module.exports = myEmitter;
