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
      console.log(`disk removed`)
    },
    DISK_FOUND: function(disk) {
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
