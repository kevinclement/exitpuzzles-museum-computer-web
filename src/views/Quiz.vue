<template>
    <div class="page" v-if="correctQuestions.length + missedQuestions.length < QUESTION_LIMIT">

      <!-- HEADER -->
      <div class="header"><img src="../assets/border.png"/></div>

      <!-- QUESTION -->
      <Question :question="currentQuestion" :selectedAnswer="selectedAnswer"></Question>

      <!-- FOOTER -->
      <div class="footer">
        <img src="../assets/border.png"/>
        <div class="progress">Question {{questionIndex + 1}}/{{QUESTION_LIMIT}}</div>
      </div>

    </div>
    <div v-else>
      <div>correct: {{correctQuestions.length}}</div>
      <div>missed: {{missedQuestions.length}}</div>
      <button >retry</button>
    </div>
</template>

<script>
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
        this.buttonPressed()
    }
  },
  data() {
    return {
        QUESTION_LIMIT: 5,
        questions: questions,
        questionIndex: 0,
        missedQuestions: [],
        correctQuestions: [],
        selectedAnswer: -1,
        buttonTimer: null,
    }
  },
  computed: {
      currentQuestion: function() {
          return this.questions[this.questionIndex]
      },
      correct: function() {
        return this.currentQuestion.correctAnswer == this.selectedAnswer
      }
  },
  created() {
      // create random set of questions
      // should contain any previously missed questions
      this.questions = randomizeQuestions(questions, this.missedQuestions, this.QUESTION_LIMIT)
      
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
      buttonPressed: function(index) {
        if (this.buttonTimer) {
          console.log(`INFO: Ignoring multi press for ${index}, selection already made.`)
          return;
        }

        // support undefined debug mode that randomly picks answer
        if (index === undefined) {
          this.selectedAnswer = getRandInt(this.currentQuestion.answers.length, this.selectedAnswer)
        }
        else {
          this.selectedAnswer = index
        }

        // add to score arrays
        if (this.correct) {
          this.correctQuestions.push(this.currentQuestion)
        } else {
          this.missedQuestions.push(this.currentQuestion)
        }

        this.buttonTimer = setTimeout(() => {
           this.buttonTimer = null;
           this.selectedAnswer = -1
           this.questionIndex++
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
            this.buttonPressed()
            break;
          case "KeyA":
          case "KeyB":
          case "KeyC":
          case "KeyD":
          case "KeyE":
            this.buttonPressed(e.keyCode - 65)
            break
          case "Digit1":
          case "Digit2":
          case "Digit3":
          case "Digit4":
          case "Digit5":
            this.buttonPressed(parseInt(e.key) - 1)
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
    if (randQuestions.length === limit) {
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
      background: #000;
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: 170px auto 120px;
      height: 100vh;
      justify-items: center;
      color: #00D46A;
      font-family: 'Press Start 2P';
  }

  .header {
      justify-self:center;
      padding-top:50px;
  }

  .footer {
  }

  .progress {
    padding-top:10px;
    font-size: 20px;
    margin-left: auto;
    margin-right: 20px;
    width: 300px;
    text-align: end;
  }
  
</style>
