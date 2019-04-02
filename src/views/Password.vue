<template>

  <div class="password">
    <div class="mainRow">

      <img class="lock" src="../assets/lock-solved.png" v-if="correct"/>
      <img class="lock" src="../assets/lock.png"        v-else-if="!incorrect"/>
      <img class="lock" src="../assets/lock-failed.png" v-else/>
      <div v-if="!incorrect">
        <div>ENTER PASSWORD</div>
        <div class="passEntry">
          <span class="passChar" style="padding-left:39px;">{{password[0]}}</span>
          <span class="passChar">{{password[1]}}</span>
          <span class="passChar">{{password[2]}}</span>
          <span>{{password[3]}}</span>
        </div>
      </div>
      <div class="passWrong" v-else>
        WRONG
      </div>

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
      CORRECT_PASSWORD: 'ABBA',
      password: ['_','_','_','_'],
      typedPassword: '',
      index: 0,
      incorrect: false,
      correct: false,
    }
  },
  sockets: {
    BUTTON: function (data) {
      console.log(`button pressed: ${data}`)
      this.buttonPressed(data)
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
      this.incorrect = false
      this.correct = false
    },
    buttonToText: function(button) {
      switch(button) {
        case 0:
          return 'A'
          break
        case 1:
          return 'B'
          break
        case 2:
          return 'C'
          break
        case 3:
          return 'D'
          break
        case 4:
          return 'E'
          break
        default:
          return 'X'
      }
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
    grid-template-columns:185px 400px;
    font-size:44px;
  }
  .lock {
    width:150px;
  }
  .passEntry {
    padding-top:20px;
  }
  .passChar {
    padding-right:25px;
  }
  .passWrong {
    padding-top:85px;
    padding-left:10px;
  }
</style>
