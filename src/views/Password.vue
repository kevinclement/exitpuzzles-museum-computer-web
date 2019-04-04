<template>

  <div class="password">
    <div class="mainRow">

      <img class="lock" src="../assets/lock-solved-rotated.png" v-if="correct"/>
      <img class="lock" src="../assets/lock.png"        v-else-if="!incorrect"/>
      <img class="lock" src="../assets/lock-failed.png" v-else/>
      <div v-bind:class="{ incorrect: incorrect }">
        <div class="passText" v-html="passText"></div>
        <div class="passEntry">
          <span class="passChar" style="padding-left:39px;">{{password[0]}}</span>
          <span class="passChar">{{password[1]}}</span>
          <span class="passChar">{{password[2]}}</span>
          <span>{{password[3]}}</span>
        </div>
      </div>

      <audio autoplay="true" v-if="correct">
        <source src="../assets/sounds/cassette-out-1.wav" type="audio/wav">
      </audio>
      <audio autoplay="true" v-if="incorrect">
        <source src="../assets/sounds/beep-03.wav" type="audio/wav">
      </audio>
    </div>
  </div>

</template>
<script>
export default {
  name: 'Password',
  props: {
  },
  data() {
    return {
      CORRECT_PASSWORD: 'DEAD',
      password: ['_','_','_','_'],
      typedPassword: '',
      passText: 'ENTER PASSWORD',
      index: 0,
      incorrect: false,
      correct: false,
    }
  },
  sockets: {
    BUTTON: function (data) {
      console.log(`button pressed: ${data}`)
      this.buttonPressed(data.index)
    }
  },
  created() {
    window.addEventListener('keydown', this.onkeydown)
    this.reset()
  },
  destroyed() {
    window.removeEventListener('keydown', this.onkeydown)
  },
  methods: {
    reset: function() {
      this.typedPassword = ''
      this.password = ['_','_','_','_']
      this.index = 0
      this.passText = 'ENTER PASSWORD'
      this.incorrect = false
      this.correct = false
    },
    buttonToText: function(button) {
      return String.fromCharCode(65 + button)
    },
    buttonPressed: function(button) {
      if (this.index >= this.CORRECT_PASSWORD.length) {
        console.log(`WARN: ignoring extra presses while evaluating`);
        return;
      }

      this.$set(this.password, this.index, '*')
      this.typedPassword += this.buttonToText(button)
      this.index++;

      if (this.index == this.CORRECT_PASSWORD.length) {
        this.verifyPassword()
      }
    },
    verifyPassword() {
      console.log(`'${this.typedPassword}' == '${this.CORRECT_PASSWORD}'`);
      if (this.typedPassword === this.CORRECT_PASSWORD) {
        console.log(`CORRECT!!!`);
        this.correct = true
        setTimeout(() => { this.$router.push("journal") }, 1000)
      } else {
        console.log(`WRONG!!!!!`);
        this.incorrect = true
        this.passText = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; WRONG'
        setTimeout(() => { this.reset() }, 2000)
      }
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
          case "Digit1":
          case "Digit2":
          case "Digit3":
          case "Digit4":
          case "Digit5":
            this.buttonPressed(parseInt(e.key) - 1)
            break;
        }
      }
  }
}
</script>

<style scoped>
  .password {
    height: 100vh;
    display: grid;
    justify-items: center;
    align-items: center;
    height:100vh;
    grid-template-columns: auto;
    color: #00D46A;
    font-family: 'Press Start 2P';
  }
  .mainRow {
    display:grid;
    grid-template-columns:215px 400px;
    font-size:44px;
  }
  .lock {
    height:150px;
    justify-self:end;
    padding-right:50px;
  }
  .passEntry {
    padding-top:20px;
  }
  .incorrect .passEntry {
    visibility:hidden;
  }
  .passChar {
    padding-right:25px;
  }
</style>
