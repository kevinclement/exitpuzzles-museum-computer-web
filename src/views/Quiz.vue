<template>

    <!-- QUESTIONS -->
    <div class="questions" v-if="!finished">
      <!-- HEADER -->
      <div class="header"><img src="../assets/border.png"/></div>

      <!-- QUESTION -->
      <Question :question="currentQuestion" :selectedAnswer="selectedAnswer"></Question>

      <!-- FOOTER -->
      <div class="footer">
        <img src="../assets/border.png"/>
        <div>
          <div style="display:inline-block;padding-top:10px;font-size:20px;right:auto;left:0px;">60s</div>
          <div class="progress" style="display:inline-block;">Question {{questionIndex + 1}}/{{QUESTION_LIMIT}}</div>
        </div>
      </div>
    </div>

    <!-- RESULTS -->
    <Results v-else 
      v-bind:missed="correctQuestions.length"
      v-bind:correct="missedQuestions.length"
      v-bind:avgTime="65"
      v-bind:totalTime="737"
    />

</template>

<script>
import Question from '@/components/Question'
import Results from '@/components/Results'
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
        this.buttonPressed(data.index)
    }
  },
  data() {
    return {
        QUESTION_LIMIT: 8, // TODO: move back to 15
        ANSWER_TIMEOUT: 500, // TODO: move back to 1000
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
      },
      finished: function() {
        return this.correctQuestions.length + this.missedQuestions.length === this.QUESTION_LIMIT
      },
  },
  created() {
      this.reset();

      // hookup keyboard handler for debug stuff when not using buttons
      window.addEventListener('keydown', this.onkeydown)
  },
  destroyed() {
      window.removeEventListener('keydown', this.onkeydown)
  },
  methods: {
      reset: function() {
        // create random set of questions, should contain any previously missed questions
        this.questions = randomizeQuestions(questions, this.missedQuestions, this.QUESTION_LIMIT)

        // after randomizing, can now reset the missed questions
        this.missedQuestions = []
        this.correctQuestions = []

        // set the first question as selected
        this.questionIndex = 0
      },
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
        if (this.finished) {
          this.reset()
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
        }, this.ANSWER_TIMEOUT);
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
    'Results': Results,
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
  questions = shuffle(questions)

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
  return shuffle(randQuestions)
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
</script>


<!-- 
  resolution:   1024 x 768
  light green:  #00FF80
  darker green: #00D46A
-->
<style scoped>
  .questions {
      background: #000;
      display: grid;
      height: 100vh;
      color: #00D46A;
      font-family: 'Press Start 2P';
      grid-template-columns: auto;
      grid-template-rows: 170px auto 120px;
      justify-items: center;
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
