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
|       |  05 Oct 2019                         |       |
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
export default {
  name: 'Journal',
  props: {
  },
  data() {
    return {
    }
  },
  created() {
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
