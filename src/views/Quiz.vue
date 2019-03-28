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
const QUESTION_LIMIT = 5

import Question from '@/components/Question'
import questions from '@/assets/questions.json'

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
        missedQuestions: [],
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
      // create random set of questions
      // should contain any previously missed questions
      this.questions = randomizeQuestions(questions, this.missedQuestions, QUESTION_LIMIT)
      
      // set the first question as selected
      this.questionIndex = 0;

      // hookup keyboard handler for debug stuff when not using buttons
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

// Will randomize questions to ask, taking into account ones we've previously missed
function randomizeQuestions(questions, missed, limit) {
  let randQuestions = [];

  // first add any missed questions to our list
  for (let q of missed) {
    randQuestions.push(q)
  }

  // then randomize the original list
  questions.sort( function() { return 0.5 - Math.random() } );

  // then pick N number of items out of that list until
  // its full with total needed
  for (let i=0; i < questions.length; i++) {
    let q = questions[i]

    // only add it to our list of questions if it wasn't already in our list of missed questions
    // note: I know this is n^2, but n shouldn't be big
    if (randQuestions.findIndex(q2 => { return q2.question === q.question }) < 0) {
      randQuestions.push(q);
    }

    // only do this until we've hit our limit
    if (randQuestions.length - 1 === limit) {
      break;
    }
  }

  // finally, randomize the final set again so missed ones aren't on the front
  randQuestions.sort( function() { return 0.5 - Math.random() } );

  return randQuestions
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
