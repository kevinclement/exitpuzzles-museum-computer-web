<template>
  <div class="launch">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Launch',
  props: {
  },
  data() {
    return {
      msg: "Hello launch"
    }
  },
}
</script>

<style scoped>
</style>
