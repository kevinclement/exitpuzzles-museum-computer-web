<template>
  <div>
    <!-- QUESTIONS -->
    <div class="questions" v-if="!showResults">
      <!-- HEADER -->
      <div class="header"><img src="../assets/border.png"/></div>

      <!-- QUESTION -->
      <Question :question="currentQuestion" :selectedAnswer="selectedAnswer"></Question>

      <!-- FOOTER -->
      <div class="footer">
        <img src="../assets/border.png"/>
        <div class="footerProgressRow">
          <div>
            <span>{{ timerBar }}</span>
            <span style="padding-left:3px;">{{timerLeft }}</span>
          </div>
          <div class="progress">Question {{questionIndex + 1}}/{{QUESTION_LIMIT}}</div>
        </div>
        <audio ref="tickSnd" autoplay="true" loop="true" v-if="this.timeForSelection">
          <source src="../assets/sounds/clock-ticking-4.wav" type="audio/wav">
        </audio>
      </div>
    </div>

    <!-- RESULTS -->
    <Results v-else 
      v-bind:missed="missedQuestionsTotal"
      v-bind:correct="correctQuestionsTotal"
      v-bind:totalTime="timeTakenTotal"
    />

    <audio ref="buttonSnd" preload="true">
      <source src="../assets/sounds/button-17.wav" type="audio/wav">
    </audio>
    <audio ref="timeoutSnd" preload="true">
        <source src="../assets/sounds/beep-03.wav" type="audio/wav">
    </audio>
  </div>
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
    BUTTON: function (data) {
        console.log(`button pressed: ${data}`)
        this.buttonPressed(data.index)
    }
  },
  data() {
    return {
        SELECTION_TIMEOUT: 0,
        QUESTION_LIMIT: 3,     // TODO: move back to 15
        ANSWER_TIMEOUT: 500,   // TODO: move back to 1000
        questions: questions,
        questionIndex: 0,
        missedQuestions: [],
        correctQuestions: [],
        selectedAnswer: -1,
        buttonTimer: null,
        timeForSelection: 0,
        selectionTimer: null,
        questionStartTime: 0,

        showResults: false,
        timeTakenTotal: 0,
        correctQuestionsTotal: 0,
        missedQuestionsTotal: 0,
    }
  },
  computed: {
      currentQuestion: function() {
          return this.questions[this.questionIndex]
      },
      finished: function() {
        return this.correctQuestions.length + this.missedQuestions.length === this.QUESTION_LIMIT
      },
      timerBar: function() {
        if (!this.timeForSelection) { 
          return ""
        }

        let tb = ""
        let bars = Math.round((this.timeForSelection/this.SELECTION_TIMEOUT) * 10)

        // fill with bars, the rest with spaces
        for (let i = 0; i<bars;i++) {
          tb += "-"
        }
        for (let i = bars; i<10;i++) {
          tb += "\u00A0"
        }

        return `[${tb}]`
      },
      timerLeft: function() {
        if (this.timeForSelection) {
          return `${this.timeForSelection}s`
        } else {
          return ""
        }
      },
  },
  created() {
      // check for completion globally
      if (this.$root.$data.results.time && this.$root.$data.results.time > 0) {
        this.timeTakenTotal = this.$root.$data.results.time
        this.missedQuestionsTotal = this.$root.$data.results.missed
        this.correctQuestionsTotal = this.$root.$data.results.correct
        this.showResults = true
      } else {
        fetch('http://localhost:8080/settings')
          .then((response) => {
            return response.json();
          })
          .then((myJson) => {
            this.SELECTION_TIMEOUT = myJson.QUESTION_TIMEOUT_S
            this.reset();
          });
      }

      // hookup keyboard handler for debug stuff when not using buttons
      window.addEventListener('keydown', this.onkeydown)
  },
  destroyed() {
      window.removeEventListener('keydown', this.onkeydown)
      clearInterval(this.selectionTimer)
      clearInterval(this.buttonTimer)
  },
  methods: {
      reset: function() {
        // create random set of questions, should contain any previously missed questions
        this.questions = randomizeQuestions(questions, this.missedQuestions, this.QUESTION_LIMIT)

        // after randomizing, can now reset the missed questions
        this.missedQuestions = []
        this.missedQuestionsTotal = 0
        this.correctQuestions = []
        this.correctQuestionsTotal = 0
        this.showResults = false
        this.$root.$data.results.time = 0
        this.$root.$data.results.correct = 0
        this.$root.$data.results.missed = 0

        // reset the timer
        this.timeForSelection = this.SELECTION_TIMEOUT

        if (this.timeForSelection > 0) {
          this.selectionTimer = setInterval(() => {
            if (this.timeForSelection === 1) {
              this.buttonPressed(-1)
            } else {
              this.timeForSelection--;
            }
          }, 1000)
        }

        // store time started for time for question
        this.questionStartTime = new Date()

        // set the first question as selected
        this.questionIndex = 0
      },
      prev: function() {
          if (this.questionIndex > 0) {
            this.questionIndex--;
          }
      },
      buttonPressed: function(index) {
        console.log(`button pressed: ${index}`);

        if (this.buttonTimer) {
          console.log(`INFO: Ignoring multi press for ${index}, selection already made.`)
          return;
        }
        if (this.showResults && this.missedQuestionsTotal === 0) {
          console.log(`INFO: Ignoring button press for ${index}, quiz already solved.`)
          return;
        }
        
        // play sounds for button press, either button or timeout
        if (index !== -1) {
          this.$refs.buttonSnd.play()
        } else {
          this.$refs.timeoutSnd.play()
        }

        if (this.showResults && index !== -1) {
          this.reset()
          return;
        }

        // add time taken for stats
        this.timeTakenTotal += ((new Date()) - this.questionStartTime)

        // support undefined debug mode that randomly picks answer
        if (index === undefined) {
          this.selectedAnswer = getRandInt(this.currentQuestion.answers.length, this.selectedAnswer)
        }
        else {
          this.selectedAnswer = index
        }

        // add to score arrays
        if (this.currentQuestion.correctAnswer === this.selectedAnswer) {
          this.correctQuestions.push(this.currentQuestion)
        } else {
          this.missedQuestions.push(this.currentQuestion)
        }

        if (index !== -1) {
          this.buttonTimer = setTimeout(() => { this.next() }, this.ANSWER_TIMEOUT);
        } else {
          this.next()
        }
      },

      next: function() {
        this.buttonTimer = null;
        this.selectedAnswer = -1
        this.timeForSelection = this.SELECTION_TIMEOUT;
        this.questionStartTime = new Date()
        
        if (this.questionIndex < this.questions.length - 1) {
          this.questionIndex++
        } else {
          this.results()
          clearInterval(this.selectionTimer)
        }
      },
      results() {
        this.correctQuestionsTotal = this.correctQuestions.length
        this.$root.$data.results.correct = this.correctQuestions.length

        this.missedQuestionsTotal = this.missedQuestions.length
        this.$root.$data.results.missed = this.missedQuestions.length

        this.$root.$data.results.time = this.timeTakenTotal

        this.showResults = true
      },
      onkeydown: function(e){
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

  // if all questions were missed, just return
  if (randQuestions.length === limit) {
    return shuffle(randQuestions)
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
  .footer div {
    font-size: 20px;
  }
  .footerProgressRow {
    display:grid;
    grid-template-columns: 50% 50%;
    padding-top:15px;
  }

  .progress {
    justify-self: end;
  }
</style>
