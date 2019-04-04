<template>

  <div class="journal">
    <div style="padding-top:15px">
      <pre style="font-family: 'Press Start 2P';">
  .------------------------------------------------.
 /  .-.                                        .-.  \
|  /   \   My Journal                         /   \  |
| |\_.  |                                    |    /| |
|\|  | /|                                    |\  | |/|
| `---' |  19 Oct 1987                       | `---' |
|       |                                    |       |
|       |                                    |       |
|       |  Last night wnday, so i t my mums  |       |
|       |  for the weeki woke up a0 am,      |       |
|       |  i thought i  a light taon my      |       |
|       |  bedroom doorer i lookedhe time    |       |
|       |  on my mobilee howeve i  back down |       |
|       |  to sleep some before i o i soon   |       |
|       |  thought i hee knocking , so i sat |       |
|       |  up and lookethe door, bthing else |       |
|       |  came so i weck to sleep           |       |
|       |                                    |       |
|       |                                    |       |
|       |  I woke up at 8:05 shower, dad     |       |
|       |  arrived while i wa and we soon    |       |
|       |  left for work.                    |       |
|       |                                    |       |
|       |                                    |       |
|       |                                    |       |
|       |                                    |       |
|       |                                    |       |
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
