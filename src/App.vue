<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  sockets: {
    DISK_REMOVED: function () {
      this.insertDisk()
    },
    DISK_FOUND: function(disk) {
      this.diskInserted(disk)
    }
  },
  created() {

      // watch for forced override in database
      this.$root.$data.ref.on('value', (snapshot) => {
        let qz = snapshot.val()
        if (qz == null) return

        this.$root.$data.settings.question_limit = parseInt(qz.total)
        this.$root.$data.settings.time_limit = parseInt(qz.timeout)

        if (qz.force === 0) {
          // INSERT DISK
          this.insertDisk()
        } else if (qz.force === 1) {
          // LAUNCH
          this.diskInserted(1)
        } else if (qz.force === 2) {
          // PASSWORD
          this.diskInserted(2)
        } else if (qz.force === 3) {
          // JOURNAL
          this.$router.push("journal")
        } else if (qz.force === 4) {
          // RESET
          this.$root.$data.results = {}
          this.$router.push("/")
        } else if (qz.force === 5) {
          // RELOAD CLIENT
          console.log(`Reloading client...`);
          setTimeout(()=>{
            window.location.replace(window.location.origin)
          }, 500)
        }
      })

      window.addEventListener('keydown', this.onkeydown)
  },
  destroyed() {
      window.removeEventListener('keydown', this.onkeydown)
  },
  methods: {
    onkeydown: function(e){
      switch(e.code) {
        case "Numpad0":
            this.insertDisk()
            break;
        case "Numpad1":
            this.diskInserted(1)
            break;
        case "Numpad2":
            this.diskInserted(2)
            break;
      }
    },
    insertDisk: function() {
      console.log(`INSERT DISK SCREEN`)
      this.$router.push("insert")
    },
    diskInserted: function(disk) {
      console.log(`DISK ${disk} INSERTED`)
      if (disk === 1) {
        this.$router.push("/")
      } else if (disk === 2) {
        this.$router.push("password")
      }
    }
  },
}
</script>

<style>
@font-face {
  font-family: 'Press Start 2P';
  font-style: normal;
  font-weight: 400;
  src: local('Press Start 2P Regular'), local('PressStart2P-Regular'), url('assets/pressStart.ttf') format('truetype');
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  background: #000;
  margin:0px;
  padding: 0px;
}
</style>
