<template>

  <div class="insertDisk">
    <div class="diskMainRow">
      <img src="../assets/floppy.png" style="width:150px;"/>
      <span>INSERT DISK...</span>
    </div>
    <div class="status" v-if="statusMessage !== ''">
      <div>&lt;&lt; {{statusMessage}} &gt;&gt;</div>
    </div>
  </div>

</template>
<script>

// CODE for resetting to logo
const CODE_RESET_QUIZ = [2,2,2,2] // C,C,C,C

export default {
  name: 'InsertDisk',
  props: {
  },
  data() {
    return {
      lastKeys: [-1,-1,-1,-1],
      lastIndex: 0,
      statusMessage: ""
    }
  },
  sockets: {
    BUTTON: function (data) {
        console.log(`button pressed: ${data}`)
        this.buttonPressed(data.index)
    }
  },
  created() {
      this.$root.$data.reset("INSERT_DISK")
      window.addEventListener('keydown', this.onkeydown)
  },
  destroyed() {
      window.removeEventListener('keydown', this.onkeydown)
  },
  methods: {
    buttonPressed: function(index) {
      this.lastKeys[this.lastIndex++] = index
      if (this.lastIndex === this.lastKeys.length) {
        this.checkCode()
        this.lastIndex = 0
      }
    },
    checkCode() {

      console.log('checking for special reset code')

      if (checkEqual(this.lastKeys, CODE_RESET_QUIZ)) {
        this.$root.$data.results = {}
        this.status(`Cleared results`)
      }
    },
    status(txt) {
      console.log(txt)
      this.statusMessage = txt
      setTimeout(() => {
        this.statusMessage = ""
      }, 3000)
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
    }, 
  },
}

function checkEqual(a, b) {
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true
}

</script>

<style scoped>
  .insertDisk {
    height: 100vh;
    display: grid;
    justify-items: center;
    align-items: center;
    height:100vh;
    grid-template-columns: auto;
    color: #00D46A;
    font-family: 'Press Start 2P';
  }
  .diskMainRow {
    display:grid;
    grid-template-columns:185px auto;
    font-size:44px;
  }
  .diskMainRow span {
    padding-top: 58px;
  }
  .status {
    position: absolute;
    top: 90%;
    width: 100%;
    display:grid;
    justify-items:center;
  }
  .status div {
  }
</style>
