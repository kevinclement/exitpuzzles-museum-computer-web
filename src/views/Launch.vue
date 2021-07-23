<template>
  <div class="launch" style="">
    <div class="welcome">Welcome to The...</div>
    <img class="logo" src="../assets/logo-pixels.png"/>
    <div class="copyright">©<span style="padding-left:3px;">1985</span> Marco Software INC.</div>
    <div class="insertDisk" v-bind:class="{ blink: blink }">{{blinkText}}</div>
    
    <audio ref="menuSnd" preload="true">
      <source src="../assets/sounds/menu.mp3" type="audio/mpeg">
    </audio>
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
      blinkText: "Press ANY button to START..."
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
    this.$root.$data.reset("LAUNCH");
  },
  destroyed() {
    clearTimeout(this.blinkTimer);
    window.removeEventListener('keydown', this.buttonPressed)
  },
  methods: {
    buttonPressed: function() {
      this.$refs.menuSnd.play()
      clearInterval(this.blinkTimer);
      this.blink = false;
      this.blinkText = "Good Luck!"
      setTimeout( () => 
      {
        let cur_correct = this.$root.$data.results.correct ? this.$root.$data.results.correct.length : 0;
        let cur_missed = this.$root.$data.results.missed ? this.$root.$data.results.missed.length : 0;
        let total_questions = cur_correct + cur_missed;
        let finished = total_questions > 0 &&  total_questions == this.$root.$data.settings.question_limit;
        //console.log(`cor: ${cur_correct} missed: ${cur_missed} total: ${total_questions} fin: ${finished}`);
        
        if (finished) {
          this.$router.push("/score")
        }
        else {
          this.$router.push("quiz")
        }
      }, 1500)
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
    grid-template-rows: 75px auto 70px 50px;
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
  .logo {
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
