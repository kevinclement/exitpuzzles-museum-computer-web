const fs = require('fs');
const EventEmitter = require('events');
const Tail = new (require('tail')).Tail('/var/log/syslog');

// NOTES: 
//   to prep disks, on the pi, insert disk
//     sudo mkfs.ext2 -c -L disk-journal -t ext2 /dev/sdb
//
//   I used disk-trivia, and disk-journal as the labels
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
let curDisk = -2;
const myEmitter = new EventEmitter();

// test for file already mounted, do it in a timeout so 
// main program will have event registered
setInterval(() => {
    let disk = checkForDisk()
    if (disk !== curDisk) {
      if (disk === -1) {
        myEmitter.emit(EVENTS.DISK_REMOVED, disk)
      } else {
        myEmitter.emit(EVENTS.DISK_FOUND, disk)
      }

      curDisk = disk;
    }

}, 1000);

function checkForDisk() {
  if (fs.existsSync('/dev/disk/by-label/disk-trivia')) {
    return 1;
  } else if (fs.existsSync('/dev/disk/by-label/disk-journal')) {
    return 2;
  }

  return -1;
}

module.exports = myEmitter;
