<template>

  <div class="journal">
    <div style="padding-top:15px">
      <pre style="font-family: 'Press Start 2P';font-size:14px;">
  .---------------------------------------------------------.
 /  .-.                                                 .-.  \
|  /   \                                               /   \  |
| |\_.  |  My Journal                                 |    /| |
|\|  | /|                                             |\  | |/|
| `---' |                                             | `---' |
|       |                                             |       |
|       |---------------------------------------------|       |
\       |                                             |       /
 \     /                                               \     /
  `---'                                                 `---'
      </pre>
      <div style="">
        <div style="padding-bottom:10px;">
          19 Oct 1987
        </div>
        <p></p>
        <div style="width: 850px">
        last night was sunday, so i was at my mums for the weekend. i woke up at 5:50 am, because i thought
        i herd a light taping on my bedroom door. after i looked at the time on my mobile phone howeve i layed
        bask down to sleep some more before i had to get up for work. i soon thought i herd the knocking again,
        so i sat up and looked at the door, but nothing else came so i went back to sleep. i woke up at 8:05 and
        had a shower, dad arrived while i was packing, and we soon left for work.
        </div>
      </div>
      <pre style="padding-top: 100px;font-family: 'Press Start 2P';font-size:14px;">
                                                       .---.
                                                      /  .  \
                                                     |\_/|   |
                                                     |   |  /|
  .--------------------------------------------------------' |
 /  .-.                                                      |
|  /   \                                                     |
| |\_.  |                                                    |
|\|  | /|                                                    |
| `---' |                                                    |
|       |                                                    |
|       |                                                   /
|       |--------------------------------------------------'
\       |
 \     /
  `---'
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
    grid-template-columns: auto;
    grid-template-rows: auto;
    color: #00D46A;
    font-family: 'Press Start 2P';
  }
</style>
