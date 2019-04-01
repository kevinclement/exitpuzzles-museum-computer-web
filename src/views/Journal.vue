<template>

  <div class="journal">
    <div>MY JOURNAL</div>
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
