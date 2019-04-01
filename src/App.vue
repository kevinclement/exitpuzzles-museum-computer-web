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
      window.addEventListener('keydown', this.onkeydown)
  },
  destroyed() {
      window.removeEventListener('keydown', this.onkeydown)
  },
  methods: {
    onkeydown: function(e){
      switch(e.code) {
        case "Backspace":
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
    },
    diskInserted: function(disk) {
      console.log(`disk ${disk} inserted`)
    }
  },
}
</script>

<style>
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
