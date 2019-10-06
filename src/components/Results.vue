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
        </div>
        <div class="footerMsg">{{tryAgain}}</div>
        <div class="footerMsg">{{pressAnyButton}}</div>

        <audio ref="successSnd" preload="true">
          <source src="../assets/sounds/success.mp3" type="audio/mpeg">
        </audio>
        <audio ref="failureSnd" preload="true">
          <source src="../assets/sounds/failure.mp3" type="audio/mpeg">
        </audio>

  </div>
</template>

<script>
export default {
  name: 'Results',
  props: {
      missed: Number,
      correct: Number,
      totalTime: Number
  },
  data() {
    return {
        blink: false,
        blinkTimer: null,
    }
  },
  computed: {
    score: function() {
        // NOTE:  ideally I'd have some crazy formulae that couldn't be guessed but was consistent
        // Since I don't want to try and figure that out, I'm just manually setting results
        // Simplest thing that works :smile:
        if (this.correct == 0) return "0"

        const scores = [
            "02274",
            "09843",
            "12348",
            "16271",
            "17318",
            "20113",
            "21519",
            "28072",
            "32885",
            "37224",
            "42469",
            "49170",
            "50032",
            "57645",
            "63052",
            "66867",
            "75428",
            "77081",
            "81992",
            "87423"
        ]

        return scores[this.correct-1]
    },
    avgTime: function() {
      return this.totalTime / (this.missed + this.correct)
    },
    percentage: function() {
        if (this.correct === 0 && this.missed === 0) return "0"

        return Math.floor((this.correct / (this.missed + this.correct)) * 100)
    },
    tryAgain: function() {
        if (this.missed == 0) {
            return "CONGRATULATIONS"
        } else {
            return "TRY AGAIN for a perfect score"
        }
    },
    pressAnyButton: function() {
        if (this.missed == 0) {
            return "You scored 100%!!"
        } else {
            return "Press ANY button to RESTART!"
        }
    }
  },
  created() {
      if (this.percentage == 100) {
        // turn on blinking of score if we're at 100%
        console.log(`setting timer`);
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
  },
  destroyed() {
    clearTimeout(this.blinkTimer);
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
    }
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
    grid-template-rows: 37px 160px 75px 315px 50px 50px;
    color: #00D46A;
    font-family: 'Press Start 2P';
  }
  .resultsTable td {
    padding-right:40px;
  } 
  .results {
    font: 18px monospace;
    font-family:"Courier New", monospace;
  }
  .footerMsg {
    justify-self: center;
  }
  .blink {
    color: #000;
  }

</style>
