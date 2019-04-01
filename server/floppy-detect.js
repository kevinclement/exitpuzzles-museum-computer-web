const fs = require('fs');
const EventEmitter = require('events');
const Tail = new (require('tail')).Tail('/var/log/syslog');

// NOTES: 
//   to prep disks, on the pi, insert disk
//     sudo fdisk /dev/sda
//       'n' - for new partition
//       'p' - for primary
//       <enter> for first sector default
//       <enter> for last sector default
//       'w' - to write, fails to re-read but seems to have worked
//     sudo touch /mnt/floppy/disk1.dat
//     sudo umount /dev/sda
//
//   DEBUG:
//     'lsblk' - for mount points
//     'sudo mount /dev/sda /mnt/floppy/' - sets up mount point
//
//   FSTAB
//     /dev/sda        /mnt/floppy     auto    nofail,x-systemd.device-timeout=1       0       0


// consts
const MAX_FILE_CHECK = 20;
const EVENTS = {
    DISK_REMOVED: 'DISK_REMOVED',
    DISK_FOUND: 'DISK_FOUND'
}

// vars
let fileCheck = 0;
let diskedRemoved = 0;
const myEmitter = new EventEmitter();

// test for file already mounted, do it in a timeout so 
// main program will have event registered
setTimeout(() => {
    let disk = checkForDisk()
    if (disk !== -1) {
        myEmitter.emit(EVENTS.DISK_FOUND, disk)
    }
}, 50);

Tail.on('line', function(data) {
  if (/changed media or resized disk sda/.test(data)) {
    if (!diskedRemoved) {
      diskedRemoved = 1;
      myEmitter.emit(EVENTS.DISK_REMOVED);
    }
  }

  if (/sd 0\:0\:0\:0\: \[sda\]/.test(data)) {
    let chkTimer = setInterval(() => {
      let disk = checkForDisk();
      if (disk !== -1) {
        diskedRemoved = 0;
        fileCheck = 0;
        clearTimeout(chkTimer);
        myEmitter.emit(EVENTS.DISK_FOUND, disk);
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
