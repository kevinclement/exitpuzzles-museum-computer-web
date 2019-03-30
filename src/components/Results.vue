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
            <tr><td>Missed:</td><td>&nbsp;{{missed}}</td></tr>
            <tr><td>Correct:</td><td>{{correct}} ({{percentage}}%)</td></tr>
            <tr><td>&nbsp;</td><td>&nbsp;</td></tr>

            <tr><td>Avg time:</td><td>{{formatTime(avgTime)}}</td></tr>
            <tr><td>Total time:</td><td>{{formatTime(totalTime)}}</td></tr>
            <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
            
            <tr><td>Final Score:</td><td>{{score}}</td></tr>
          </table>
        </div>
        <div style="justify-self:center;">TRY AGAIN for a perfect score</div>
        <div style="justify-self:center;">Press ANY button to RESTART!</div>
  </div>
</template>

<script>
export default {
  name: 'Results',
  props: {
      missed: Number,
      correct: Number,
      avgTime: Number,
      totalTime: Number
  },
  data() {
    return {}
  },
  computed: {
    score: function() {
        // NOTE:  ideally I'd have some crazy formulae that couldn't be guessed but was consistent
        // Since I don't want to try and figure that out, I'm just manually setting results
        // Simplest thing that works :smile:

        const scores = [
            "09843",
            "16271",
            "21519",
            "28072",
            "32885",
            "42469",
            "49170",
            "50032",
            "57645",
            "63052",
            "66867",
            "75428",
            "77081",
            "81992",
            "87423",
        ]

        return scores[this.correct-1]
    },
    percentage: function() {
        return Math.floor((this.correct / (this.missed + this.correct)) * 100)
    },
    formatAverageTime: function() {
        return formatTime(this.avgTime)
    }
  },
  methods: {
    formatTime(tInSeconds) {
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
    padding-left: 20px;
    padding-right: 20px;
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

</style>
