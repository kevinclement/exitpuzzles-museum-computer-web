<template>

  <div class="journal">
    <div style="padding-top:0px">
      <pre style="font-family: 'Press Start 2P';">
  .--------------------------------------------------.
 /  .-.                                          .-.  \
|  /   \                                        /   \  |
| |\_.  |  My Journal                          |    /| |
|\|  | /|                                      |\  | |/|
| `---' |                                      | `---' |
|       |  {{date}}                         |       |
|       |                                      |       |
|       |                                      |       |
|       |  I seriously think there may be      |       |
|       |  something to this egyptian curse.   |       |
|       |  My luck has happened to change ever |       |
|       |  since that shipment from Cairo      |       |
|       |  arrived.                            |       |
|       |                                      |       |
|       |                                      |       |
|       |  I now believe the only way to turn  |       |
|       |  everything around and end this      |       |
|       |  curse, is to return all five idols   |       |
|       |  to their shrine, and remember to    |       |
|       |  place them in the correct order.    |       |
|       |                                      |       |
|       |                                      |       |
|       |  The stool helped me hide the first   |       |
|       |  idol inside a secret panel in the   |       |
|       |  top of the red cabinet.             |       |
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
    this.$root.$data.reset("JOURNAL")

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
