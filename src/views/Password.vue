<template>

  <div class="password">
    <div class="diskMainRow">
      <img src="../assets/floppy.png" style="width:150px;"/>
      <div>
        <div>ENTER PASSWORD</div>
        <div style="padding-top:20px;">
          <span style="padding-left:39px;padding-right:25px;">{{pass1}}</span>
          <span style="padding-right:25px;">{{pass2}}</span>
          <span style="padding-right:25px;">{{pass3}}</span>
          <span style="">{{pass4}}</span>
        </div>
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
      pass1: "_",
      pass2: "_",
      pass3: "_",
      pass4: "_",
    }
  },
  sockets: {
    BUTTON: function (data) {
        console.log(`button pressed: ${data}`)
        console.log(`translate: ${this.buttonToText(data)}`)

    }
  },
  created() {
  },
  destroyed() {
  },
  methods: {
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
  .diskMainRow {
    display:grid;
    grid-template-columns:185px 400px;
    font-size:44px;
  }
  .diskMainRow span {
    padding-top: 0px;
  }
</style>
