<template>
    <div class="main mainGF">

        <!-- QUESTION -->
        <div>
            <p class="question" v-for="part in questionParts" :key="part">{{part}}</p>
        </div>

        <!-- ANSWERS -->
        <table class="mainGF answerTable">
            <tr v-for="(answer, index) in question.answers" :key="index" v-bind:class="{ answerHidden: isNotSelected(index) }">
                <td class="answerBtn">{{ letterFromIndex(index) }}</td>
                <td>{{answer}}</td>
            </tr>
        </table>

    </div>
</template>

<script>
export default {
  name: 'Question',
  props: {
      question: Object,
      selectedAnswer: Number,
  },
  data() {
    return {}
  },
  computed: {
    questionParts: function() {
        return this.question.question.split('\n');
    },
  },
  methods: {
    letterFromIndex(index) {
        return String.fromCharCode(65 + index) + "."
    },
    isNotSelected(index) {
        return this.selectedAnswer >= 0 && index != this.selectedAnswer
    },
  }
}
</script>
<style scoped>
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

  .question {
      margin: 0px;
      padding: 0px;
      padding-top: 0px;
      padding-bottom: 30px;
  }

  .answer {
      padding-top:2px;
  }
  .answerHidden {
    color:#000;
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
