<template>
    <div class="page">
      <!-- HEADER -->
      <div class="header"><img src="../assets/border.png"/></div>

      <div class="main mainGF">

          <!-- QUESTION -->
          <div>
              <p class="question" v-for="part in questionParts()" :key="part">{{part}}</p>
          </div>

          <!-- ANSWERS -->
          <table class="mainGF answerTable">
              <tr v-for="(answer, index) in answers" :key="index">
                  <td class="answerBtn">{{ letterFromIndex(index) }}</td>
                  <td>{{answer}}</td>
              </tr>
          </table>

      </div>

      <!-- FOOTER -->
      <div class="footer"><img src="../assets/border.png"/></div>
    </div>
</template>

<script>
import questions from '@/assets/questions.json';
export default {
  name: 'Quiz',
  props: {
  },
  data() {
    return {
        question: { question: "" },
        answers: [],
        questionParts: function() {
            return this.question.question.split('\n');
        },
    }
  },
  created () {
    // TODO: proper random, for now load the first one
    this.question = questions[0];
    this.answers = this.question.answers;
  },
  methods: {
    letterFromIndex(index) {
        return String.fromCharCode(65 + index) + "."
    },

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
  .main {
      background: #000;
      width: 100vh;
  }
  .mainGF {
      font-family: 'Press Start 2P', cursive;
      line-height: 1.3;
      font-size: 24px;
      color: #00D46A;
  }
  .footer {
  }

  .question {
      margin: 0px;
      padding: 0px;
      padding-top: 0px;
      padding-bottom: 30px;
  }

  .answer {
      padding-top:2px;
  }
  .mainGF td {
      vertical-align: top;
      padding-top:3px;
  }
  .answerBtn {
      padding-right: 13px;
  }
  .answerTable {
      padding-left:24px;
  }
</style>
