<template>
  <div class="launch" style="">
    <div class="welcome">Welcome to The...</div>
    <img class="zoltar" src="../assets/logo-pixels.png"/>
    <div class="copyright">©<span style="padding-left:3px;">1985</span> Marco Software INC.</div>
    <div class="insertDisk" v-bind:class="{ blink: blink }">Press ANY button to START...</div>
  </div>
  
</template>
<script>
export default {
  name: 'Launch',
  props: {
  },
  data() {
    return {
      blink: false,
      blinkTimer: null,
    }
  },
  sockets: {
    BUTTON: function () {
        this.buttonPressed()
    }
  },
  created() {
    this.blinkTimer = setInterval(() => {
      this.blink = !this.blink;
    }, 1000);
    window.addEventListener('keydown', this.buttonPressed)
  },
  destroyed() {
    clearTimeout(this.blinkTimer);
    window.removeEventListener('keydown', this.buttonPressed)
  },
  methods: {
    buttonPressed: function() {
      this.$router.push("quiz")
    }
  }
}
</script>

<style scoped>
  .launch {
    height: 100vh;
    display: grid;
    justify-items: center;
    grid-template-columns: auto;
    grid-template-rows: 75px auto 75px auto;
    color: #00D46A;
    font-family: 'Press Start 2P';
  }
  .welcome {
    align-self: end;
    justify-self: left;
    padding-bottom:25px;
    padding-left:210px;
    font-size:17px;
  }
  .zoltar {
    width:600px;
  }
  .logoText {
    font: 12px/12px monospace;
    display:inline-block;
    justify-self:left;
    align-self: end;
    padding-right: 50px;

  }
  .copyright {
    font-size:13px;
  }
  .insertDisk {
    font-size:18px;
  }
  .blink {
    color: #000;
  }

</style>
