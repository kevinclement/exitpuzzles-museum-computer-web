<template>
    <div class="page">
      <!-- HEADER -->
      <div class="header"><img src="../assets/border.png"/></div>
      
      <!-- QUESTION -->
      <Question :question="currentQuestion"></Question>
      
      <div>
        <button v-on:click="prev" style="margin-right:10px;">prev</button>
        <button v-on:click="choose" style="margin-right:10px;">choose</button>
        <button v-on:click="next" style="">next</button>
      </div>

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
        questionIndex: 0,
    }
  },
  computed: {
      currentQuestion: function() {
          return this.questions[this.questionIndex]
      }
  },
  created() {
      this.questionIndex = 1
  },
  methods: {
      prev: function() {
          if (this.questionIndex > 0) {
            this.questionIndex--;
          }
      },
      choose: function() {

      },
      next: function() {
          if (this.questionIndex < this.questions.length - 1) {
              this.questionIndex++;
          }
      }
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
