<template>
  <div class="quiz">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Quiz',
  props: {
  },
  data() {
    return {
      msg: "Hello quiz"
    }
  },
}
</script>

<style scoped>
</style>
