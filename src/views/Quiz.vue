<template>
    <div class="page">
      <!-- HEADER -->
      <div class="header"><img src="../assets/border.png"/></div>

      <!-- QUESTION -->
      <Question :question="currentQuestion" :selectedAnswer="selectedAnswer"></Question>

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
  sockets: {
    connect: function () {
        console.log('socket connected')
    },
    button: function (data) {
        console.log(`button pressed: ${data}`)
        this.choose()
    }
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
      window.addEventListener('keydown', this.onkeydown)
  },
  destroyed() {
      window.removeEventListener('keydown', this.onkeydown)
  },
  methods: {
      prev: function() {
          if (this.questionIndex > 0) {
            this.questionIndex--;
          }
      },
      choose: function(index) {
        if (index === undefined) {
          this.selectedAnswer = getRandInt(this.currentQuestion.answers.length, this.selectedAnswer)
        }
        else {
          this.selectedAnswer = index
        }

        setTimeout(() => {
           this.selectedAnswer = -1
           this.questionIndex = getRandInt(this.questions.length, this.questionIndex);
        }, 1000);
      },
      next: function() {
          if (this.questionIndex < this.questions.length - 1) {
              this.questionIndex++;
          }
      },
      onkeydown(e){
        switch(e.code) {
          case "ArrowRight":
            this.next()
            break;
          case "ArrowLeft":
            this.prev()
            break;
          case "ArrowUp":
            this.choose()
            break;
          case "KeyA":
          case "KeyB":
          case "KeyC":
          case "KeyD":
          case "KeyE":
            this.choose(e.keyCode - 65)
            break
          case "Digit1":
          case "Digit2":
          case "Digit3":
          case "Digit4":
          case "Digit5":
            this.choose(parseInt(e.key) - 1)
            break;
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
