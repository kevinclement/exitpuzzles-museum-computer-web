<template>
  <div>
    <!-- QUESTIONS -->
    <div class="questions">
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
import questions from '@/assets/questions.json'

const TIMEOUTS_BEFORE_RESET = 4

export default {
  name: 'Quiz',
  props: {},
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
        SELECTION_TIMEOUT: 90, // defined in db
        QUESTION_LIMIT: 15,
        ANSWER_TIMEOUT: 1000,
        questions: questions,
        questionIndex: 0,
        timedOutInARow: 0,
        selectedAnswer: -1,
        buttonTimer: null,
        timeForSelection: 0,
        selectionTimer: null,
        questionStartTime: 0,
        qz: undefined
    }
  },
  computed: {
      currentQuestion: function() {
          
        var theQ = this.questions[this.questionIndex];
        var answerIndex = theQ.correctAnswer - 1;
        var answerLetter = String.fromCharCode(65 + answerIndex);
        var answerText = theQ.answers[answerIndex];

        console.log(`answer: ${answerLetter} - ${answerText}`)

        return this.questions[this.questionIndex]
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
      this.qz = this.$root.$data.ref

      this.SELECTION_TIMEOUT = this.$root.$data.settings.time_limit;
      this.QUESTION_LIMIT = this.$root.$data.settings.question_limit;

      this.resetQuestions()
      this.resetResults()
      this.resetTimeForSelection()

      // mark first time globally so they only get the initial questions once
      this.$root.$data.alreadyTaken = true;

      this.updateDB();

      window.addEventListener('keydown', this.onkeydown)
  },
  destroyed() {
      window.removeEventListener('keydown', this.onkeydown)
      clearInterval(this.selectionTimer)
      clearInterval(this.buttonTimer)
  },
  methods: {
      resetResults: function() {
        this.$root.$data.results = { missed: [], correct: [], time: 0 }
      },
      resetQuestions: function() {
        // create random set of questions, should contain any previously missed questions
        this.questions = randomizeQuestions(questions, this.$root.$data.results.missed || [], this.$root.$data.alreadyTaken, this.QUESTION_LIMIT)

        // store time started for time for question
        this.questionStartTime = new Date()

        // set the first question as selected
        this.questionIndex = 0
      },
      resetTimeForSelection: function() {
        this.timeForSelection = this.SELECTION_TIMEOUT
        if (this.timeForSelection > 0) {
          
          if (this.selectionTimer) {
            clearInterval(this.selectionTimer)
          }

          this.selectionTimer = setInterval(() => {
            if (this.timeForSelection === 1) {
                this.buttonPressed(-1)
            } else {
                this.timeForSelection--;
            }
          }, 1000)
        }
      },
      buttonPressed: function(index) {
        console.log(`button pressed: ${index}`);

        if (this.buttonTimer) {
          console.log(`INFO: Ignoring multi press for ${index}, selection already made.`)
          return;
        }

        // play sounds for button press, either button or timeout
        if (index !== -1) {
          this.$refs.buttonSnd.play()
        } else {
          this.$refs.timeoutSnd.play()
        }

        // keep track of total timeouts
        if (index === -1) {
          this.timedOutInARow++
          console.log(`timeout: ${this.timedOutInARow}`)

          if (this.timedOutInARow === TIMEOUTS_BEFORE_RESET) {
             console.log(`max timeouts reached resetting.`)
             this.resetResults()
             this.$router.push("/")
             return;
          }
        } else {
          this.timedOutInARow = 0;
        }

        // add time taken for stats
        this.$root.$data.results.time += ((new Date()) - this.questionStartTime)

        // store selectedAnswer
        this.selectedAnswer = index

        // add to score arrays
        if (this.currentQuestion.correctAnswer - 1 === this.selectedAnswer) {
          console.log(`correct`)
          this.$root.$data.results.correct.push(this.currentQuestion)
        } else {
          console.log(`missed`)
          this.$root.$data.results.missed.push(this.currentQuestion)
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

        this.updateDB();
      },
      results() {
        this.$root.$data.results.completed = true
        this.$router.push("/score")
      },
      onkeydown: function(e){
        switch(e.code) {
          case "KeyA":
          case "KeyB":
          case "KeyC":
          case "KeyD":
          case "KeyE":
            this.buttonPressed(e.keyCode - 65)
            break
        }
      },

      updateDB: function() {
        this.qz.update({ 
          state: "QUIZ",
          questionIndex: this.questionIndex,
          correctQuestions: this.$root.$data.results.correct ? this.$root.$data.results.correct : [],
          missedQuestions: this.$root.$data.results.missed ? this.$root.$data.results.missed : [],
          currentTotal: this.QUESTION_LIMIT
        })
      }
  },
  components: {
    'Question': Question
  }
}

// Will randomize questions to ask, taking into account ones we've previously missed
function randomizeQuestions(questions, missed, alreadyTaken, limit) {
  let randQuestions = [];

  // always add two questions kyle wants in the quiz, but only on the first time
  if (!alreadyTaken) {
    randQuestions.push({ "question": "How many fairies are on display in the Museum of Curiosity?:", "answers": ["10","13","15","14","Zero"],"correctAnswer": 3} )
    randQuestions.push({ "question": "Which item is NOT currently on display above the shrunken heads?:", "answers": [ "Alien Fetus", "Human Heart", "Necrotic Ear", "Abnormal Brain", "Parasitic Worm" ], "correctAnswer": 3})
  }

  // first add any missed questions to our list
  for (let q of missed) {
    randQuestions.push(q)
  }

  // if all questions were missed, just return
  if (randQuestions.length == limit) {
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
    if (randQuestions.length == limit) {
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
      grid-template-rows: 170px auto 125px;
      justify-items: center;
  }

  .header {
      justify-self:center;
      padding-top:45px;
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
