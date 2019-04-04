<template>

  <div class="journal">
    <div style="padding-top:25px">
      <pre style="font-family: 'Press Start 2P';">
  .------------------------------------------------.
 /  .-.                                        .-.  \
|  /   \   My Journal                         /   \  |
| |\_.  |                                    |    /| |
|\|  | /|                                    |\  | |/|
| `---' |  19 Oct 1987                       | `---' |
|       |                                    |       |
|       |                                    |       |
|       |  Last night was sunday, so i was   |       |
|       |  at my mums for the weekend. i     |       |
|       |  woke up at 5:50 am, i thought i   |       |
|       |  heard light taping on my bedroom  |       |
|       |  door after i looked at the time   |       |
|       |  on my mobile phone however i      |       |
|       |  down to sleep some more before i  |       |
|       |  had to i soon thought i heard the |       |
|       |  knocking again, so i sat up and   |       |
|       |  looked at the door, but nothing   |       |
|       |  else came so i went back to       |       |
|       |  sleep.                            |       |
|       |                                    |       |
|       |                                    |       |
|       |  I woke up at 8:05 and had a       |       |
|       |  showerdad arrived while i was     |       |
|       |  packing, and we soon left for     |       |
|       |  work.                             |       |
|       |                                    |       |
|       |                                    |       |
|       |                                    |       |
|       |                                    |       |
|       |                                    |       |
|       |                                    |       |
|       |------------------------------------|       |
\       |                                    |       /
 \     /                                      \     /
  `---'                                        `---'
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
  }
</style>
