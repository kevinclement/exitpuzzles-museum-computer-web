<template>
    <div class="page">
      <!-- HEADER -->
      <div class="header"><img src="../assets/border.png"/></div>

      <!-- QUESTION -->
      <Question :question="currentQuestion" :selectedAnswer="selectedAnswer"></Question>

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
        selectedAnswer: -1,
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
        this.selectedAnswer = getRandInt(this.currentQuestion.answers.length, this.selectedAnswer);
        setTimeout(() => {
           this.selectedAnswer = -1
           this.questionIndex = getRandInt(this.questions.length, this.questionIndex);
        }, 1000);
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

function getRandInt(max, cur) {
  let rand = -1;

  do {
    rand = Math.floor(Math.random() * Math.floor(max))
  } while(rand === cur)

  return rand
}
</script>


<!-- 
  resolution:   1024 x 768
  light green:  #00FF80
  darker green: #00D46A
-->
<style scoped>
  .page {
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: 170px 488px 110px;
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
