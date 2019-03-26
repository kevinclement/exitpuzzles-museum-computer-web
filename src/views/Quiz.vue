<template>
    <div class="page">
      <!-- HEADER -->
      <div class="header"><img src="../assets/border.png"/></div>
      
      <!-- QUESTION -->
      <Question :question="questions[0]"></Question>

      <!-- FOOTER -->
      <div class="footer"><img src="../assets/border.png"/></div>
    </div>
</template>

<script>
import Question from '@/components/Question'
import questions from '@/assets/questions.json';
export default {
  name: 'Quiz',
  props: {
  },
  data() {
    return {
        questions: questions,
    }
  },
  created () {
  },
  methods: {
  },
  components: {
    'Question': Question,
  }
}
</script>
<style scoped>
  .page {
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: 170px auto 110px;
      height: 100vh;
      justify-items: center;
  }

  .header {
      justify-self:center;
      padding-top:50px;
  }
  .footer {
  }
</style>
