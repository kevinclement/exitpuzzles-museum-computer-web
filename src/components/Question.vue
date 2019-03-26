<template>
    <div class="main mainGF">

        <!-- QUESTION -->
        <div>
            <p class="question" v-for="part in questionParts" :key="part">{{part}}</p>
        </div>

        <!-- ANSWERS -->
        <table class="mainGF answerTable">
            <tr v-for="(answer, index) in question.answers" :key="index">
                <td class="answerBtn">{{ letterFromIndex(index) }}</td>
                <td>{{answerFromIndex(answer, index)}}</td>
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
        if (this.selectedAnswer >= 0 && index != this.selectedAnswer) {
            return "\u00A0"
        }
        return String.fromCharCode(65 + index) + "."
    },
    answerFromIndex(answer, index) {
        if (this.selectedAnswer >= 0 && index != this.selectedAnswer) {

            // replace answer with non-breaking spaces, but keep spaces
            // so content will just disapear without shifting
            let padded = ""
            for(let i = 0; i < answer.length; i++) {
                if (answer[i] !== " ") {
                    padded += "\u00A0"
                } else {
                    padded += " "
                }
            }
            return padded
        }
        return answer
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
