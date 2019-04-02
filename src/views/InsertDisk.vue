<template>

  <div class="insertDisk">
    <div class="diskMainRow">
      <img src="../assets/floppy.png" style="width:150px;"/>
      <span>INSERT DISK...</span>
    </div>
  </div>

</template>
<script>
export default {
  name: 'InsertDisk',
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
  .insertDisk {
    height: 100vh;
    display: grid;
    justify-items: center;
    align-items: center;
    height:100vh;
    grid-template-columns: auto;
    color: #00D46A;
    font-family: 'Press Start 2P';
  }
  .diskMainRow {
    display:grid;
    grid-template-columns:185px auto;
    font-size:44px;
  }
  .diskMainRow span {
    padding-top: 58px;
  }
</style>
