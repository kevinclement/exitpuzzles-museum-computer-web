<template>

  <div class="journal">
    <div style="padding-top:25px">
      <pre style="font-family: 'Press Start 2P';">
  .--------------------------------------------------.
 /  .-.                                          .-.  \
|  /   \                                        /   \  |
| |\_.  |  My Journal                          |    /| |
|\|  | /|                                      |\  | |/|
| `---' |                                      | `---' |
|       |                                      |       |
|       |  {{date}}                         |       |
|       |                                      |       |
|       |                                      |       |
|       |                                      |       |
|       |  i Seriously tHink theRe may be      |       |
|       |  somethIng to this egyptiaN cursE.   |       |
|       |  my luck has hapPened to chAnge ever |       |
|       |  Since that Shipment from cairo      |       |
|       |  arrived.                            |       |
|       |                                      |       |
|       |                                      |       |
|       |                                      |       |
|       |  i noW believe the Only way to turn  |       |
|       |  everything aRound and enD thIs      |       |
|       |  curse, iS to return All five idoLs   |       |
|       |  to Their shrine, and remember to    |       |
|       |  plAce them in the correct ordeR.    |       |
|       |                                      |       |
|       |                                      |       |
|       |                                      |       |
|       |--------------------------------------|       |
\       |                                      |       /
 \     /                                        \     /
  `---'                                          `---'
      </pre>

    </div>
    <audio autoplay="true">
          <source src="../assets/sounds/page-flip-5.wav" type="audio/wav">
    </audio>
  </div>

</template>
<script>
const HOW_MANY_DAYS_BACK = 4
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
export default {
  name: 'Journal',
  props: {
  },
  data() {
    return {
      date: "05 Oct 2019" // should be dynamic
    }
  },
  created() {
    this.$root.$data.ref.update({ state: "JOURNAL" })

    let daysAgo = new Date(new Date().getTime() - (86400000 * HOW_MANY_DAYS_BACK))

    let m = months[daysAgo.getMonth()]
    let d = daysAgo.getDate()
    d = d < 10 ? "0" + d : d;
    let y = daysAgo.getFullYear()

    this.date = `${d} ${m} ${y}`
  },
  destroyed() {
  },
  methods: {
  }
}
</script>

<style scoped>
  .journal {
    height: 100vh;
    display: grid;
    justify-items: center;
    align-items:center;
    grid-template-columns: auto;
    grid-template-rows: auto;
    color: #00D46A;
    font-family: 'Press Start 2P';
    font-size: 18px;
    line-height: 22px;
  }
</style>
