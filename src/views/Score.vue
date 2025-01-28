<template>
    <div class="resultsPage">      
      <div>**************************</div>
        <div>
        <pre class="results">
        ██████╗ ███████╗███████╗██╗   ██╗██╗  ████████╗███████╗   
        ██╔══██╗██╔════╝██╔════╝██║   ██║██║  ╚══██╔══╝██╔════╝ ██╗
        ██████╔╝█████╗  ███████╗██║   ██║██║     ██║   ███████╗ ╚═╝
        ██╔══██╗██╔══╝  ╚════██║██║   ██║██║     ██║   ╚════██║ ██╗
        ██║  ██║███████╗███████║╚██████╔╝███████╗██║   ███████║ ╚═╝
        ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚══════╝╚═╝   ╚══════╝   
        </pre>
        </div>
        <div>**************************</div>
      
        <div>
          <table class="resultsTable">
            <tr><td>Missed:</td><td>{{missed}}</td></tr>
            <tr><td>Correct:</td><td>{{correct}} ({{percentage}}%)</td></tr>
            <tr><td>&nbsp;</td><td>&nbsp;</td></tr>

            <tr><td>Avg time:</td><td>{{formatTime(avgTime)}}</td></tr>
            <tr><td>Total time:</td><td>{{formatTime(totalTime)}}</td></tr>
            <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
            
            <tr><td>Final Score:</td>
                <td><div v-bind:class="{ blink: blink }">{{score}}</div></td>
            </tr>
          </table>
          <div class="footerMsg">{{tryAgain}}</div>
          <div class="footerMsg">{{pressAnyButton}}</div>
        </div>

        

        <audio ref="successSnd" preload="true">
          <source src="../assets/sounds/success.mp3" type="audio/mpeg">
        </audio>
        <audio ref="successSndTwo" preload="true">
          <source src="../assets/sounds/success.mp3" type="audio/mpeg">
        </audio>        
        <audio ref="failureSnd" preload="true">
          <source src="../assets/sounds/failure.mp3" type="audio/mpeg">
        </audio>
        <audio ref="buttonSnd" preload="true">
          <source src="../assets/sounds/button-17.wav" type="audio/wav">
        </audio>
  </div>
</template>

<script>

let FINAL_CORRECT_SCORE = 87423
let SCORE_OFFSET = 311 // just so its not pure division

export default {
  name: 'Results',
  props: {},
  sockets: {
    connect: function () {
        console.log('socket connected for score and seven years ago')
    },
    BUTTON: function (data) {
        console.log(`score button pressed: ${data}`)
        this.buttonPressed(data.index)
    }
  },
  data() {
    return {
        blink: false,
        blinkTimer: null,
    }
  },
  computed: {
    missed: function() {
        return this.$root.$data.results.missed ? this.$root.$data.results.missed.length : 0
    },
    correct: function() {
        return this.$root.$data.results.correct ? this.$root.$data.results.correct.length : 0
    },
    totalTime: function() {
        return this.$root.$data.results.time || 0
    },
    score: function() {
        let total = this.missed + this.correct
        let points_per_correct = Math.floor((FINAL_CORRECT_SCORE - (SCORE_OFFSET * total)) / total)

        if (this.correct == 0) {
            return 0
        }

        if (this.correct === total) {
          return FINAL_CORRECT_SCORE
        } else {
          return this.correct * points_per_correct
        } 
    },
    avgTime: function() {
      return this.totalTime == 0 ? 0 : this.totalTime / (this.missed + this.correct)
    },
    percentage: function() {
        if (this.correct === 0 && this.missed === 0) return "0"

        return Math.floor((this.correct / (this.missed + this.correct)) * 100)                
    },
    tryAgain: function() {
        if (this.percentage == 100) {
            return "CONGRATULATIONS"
        } else {
            return "TRY AGAIN for a perfect score"
        }
    },
    pressAnyButton: function() {
        if (this.percentage == 100) {
            return "You scored 100%!!"
        } else {
            return "Press ANY button to RESTART!"
        }
    }
  },
  created() {
      if (this.percentage == 100) {
        // update db to solved
        this.$root.$data.runs.solved()

        // turn on blinking of score if we're at 100%
        this.blinkTimer = setInterval(() => {
          this.blink = !this.blink;
        }, 1000);
      } 

      setTimeout(() => {
          if (this.percentage == 100) {
            this.$refs.successSnd.play()
          } else {
            this.$refs.failureSnd.play()
          }
      }, 500);

      window.addEventListener('keydown', this.onkeydown)
  },
  destroyed() {
    clearTimeout(this.blinkTimer);
    window.removeEventListener('keydown', this.onkeydown)
  },
  methods: {
    formatTime(tInMilliseconds) {
        const tInSeconds = Math.floor(tInMilliseconds / 1000)
        const minutes = Math.floor(tInSeconds / 60)
        const seconds = tInSeconds - (minutes * 60)

        let minStr = ""
        if (minutes > 0) {
            minStr = `${minutes}m `
        }

        return `${minStr}${seconds}s`
    },
    buttonPressed: function(index) {
        if (this.percentage == 100) {
            this.nudgeScoreScreen(index);
        } else {
          this.$refs.buttonSnd.play()       
        }

        if (this.percentage != 100) {
          setTimeout(() => {
              this.$root.$data.results = {}
              this.$router.push("/")
          }, 400)
        }
    },
    onkeydown: function(e){
        switch(e.code) {
          case "KeyA":
          case "KeyB":
          case "KeyC":
          case "KeyD":
          case "KeyE":
            this.buttonPressed(e.keyCode - 65)
            break
        }
    }, 
    nudgeScoreScreen: function(index){
      console.log(`INFO: Ignoring button press for ${index}, quiz already solved.`)
      this.$refs.successSndTwo.play()
      setTimeout(() => {
      this.$router.push("/success")
      }, 1500)
    },
  },
  components: {    
  }
}
</script>
<style scoped>
  .resultsPage {
    display: grid;
    font-size: 28px;
    padding-top:40px;
    padding-left: 40px;
    padding-right: 40px;    
    padding-right: 40px;
    grid-template-rows: 28px 160px 75px 315px 50px 50px;
    color: #00D46A;
    font-family: 'Press Start 2P';
  }
  .resultsTable  {
    padding-bottom: 40px;
  }
  .resultsTable td {
    padding-right:40px;
  } 
  .results {
    font: 18px monospace;
    font-family:"Courier New", monospace;
  }
  .footerMsg {
    text-align:center;
    height:50px;
  }
  .blink {
    color: #000;
  }

</style>
