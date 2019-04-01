<template>
  <div class="launch" style="">
    <div class="welcome">Welcome to The...</div>
    <img class="zoltar" src="../assets/zoltar-nes-clean-block.png"/>
    <pre class="logoText">

███▄ ▄███▓ █    ██   ██████ ▓█████  █    ██  ███▄ ▄███▓               
▓██▒▀█▀ ██▒ ██  ▓██▒▒██    ▒ ▓█   ▀  ██  ▓██▒▓██▒▀█▀ ██▒               
▓██    ▓██░▓██  ▒██░░ ▓██▄   ▒███   ▓██  ▒██░▓██    ▓██░               
▒██    ▒██ ▓▓█  ░██░  ▒   ██▒▒▓█  ▄ ▓▓█  ░██░▒██    ▒██                
▒██▒   ░██▒▒▒█████▓ ▒██████▒▒░▒████▒▒▒█████▓ ▒██▒   ░██▒               
░ ▒░   ░  ░░▒▓▒ ▒ ▒ ▒ ▒▓▒ ▒ ░░░ ▒░ ░░▒▓▒ ▒ ▒ ░ ▒░   ░  ░               
░  ░      ░░░▒░ ░ ░ ░ ░▒  ░ ░ ░ ░  ░░░▒░ ░ ░ ░  ░      ░               
░      ░    ░░░ ░ ░ ░  ░  ░     ░    ░░░ ░ ░ ░      ░                  
       ░      ░           ░     ░  ░   ░            ░                  
                                                                       
                   ▒█████    █████▒                                    
                  ▒██▒  ██▒▓██   ▒                                     
                  ▒██░  ██▒▒████ ░                                     
                  ▒██   ██░░▓█▒  ░                                     
                  ░ ████▓▒░░▒█░                                        
                  ░ ▒░▒░▒░  ▒ ░                                        
                    ░ ▒ ▒░  ░                                          
                  ░ ░ ░ ▒   ░ ░                                        
                      ░ ░                                              
                                                                       
 ▄████▄   █    ██  ██▀███   ██▓ ▒█████    ██████  ██▓▄▄▄█████▓▓██   ██▓
▒██▀ ▀█   ██  ▓██▒▓██ ▒ ██▒▓██▒▒██▒  ██▒▒██    ▒ ▓██▒▓  ██▒ ▓▒ ▒██  ██▒
▒▓█    ▄ ▓██  ▒██░▓██ ░▄█ ▒▒██▒▒██░  ██▒░ ▓██▄   ▒██▒▒ ▓██░ ▒░  ▒██ ██░
▒▓▓▄ ▄██▒▓▓█  ░██░▒██▀▀█▄  ░██░▒██   ██░  ▒   ██▒░██░░ ▓██▓ ░   ░ ▐██▓░
▒ ▓███▀ ░▒▒█████▓ ░██▓ ▒██▒░██░░ ████▓▒░▒██████▒▒░██░  ▒██▒ ░   ░ ██▒▓░
░ ░▒ ▒  ░░▒▓▒ ▒ ▒ ░ ▒▓ ░▒▓░░▓  ░ ▒░▒░▒░ ▒ ▒▓▒ ▒ ░░▓    ▒ ░░      ██▒▒▒ 
  ░  ▒   ░░▒░ ░ ░   ░▒ ░ ▒░ ▒ ░  ░ ▒ ▒░ ░ ░▒  ░ ░ ▒ ░    ░     ▓██ ░▒░ 
░         ░░░ ░ ░   ░░   ░  ▒ ░░ ░ ░ ▒  ░  ░  ░   ▒ ░  ░       ▒ ▒ ░░  
░ ░         ░        ░      ░      ░ ░        ░   ░            ░ ░     
░                                                              ░ ░     
  </pre>
    <div class="copyright">©<span style="padding-left:3px;">1985</span> Marco Software INC.</div>
    <div class="insertDisk" v-bind:class="{ blink: blink }">Press ANY button to START...</div>
  </div>
  
</template>
<script>
export default {
  name: 'Launch',
  props: {
  },
  data() {
    return {
      blink: false,
      blinkTimer: null,
    }
  },
  sockets: {
    BUTTON: function () {
        this.buttonPressed()
    }
  },
  created() {
    this.blinkTimer = setInterval(() => {
      this.blink = !this.blink;
    }, 1000);
    window.addEventListener('keydown', this.buttonPressed)
  },
  destroyed() {
    clearTimeout(this.blinkTimer);
    window.removeEventListener('keydown', this.buttonPressed)
  },
  methods: {
    buttonPressed: function() {
      this.$router.push("quiz")
    }
  }
}
</script>

<style scoped>
  .launch {
    height: 100vh;
    display: grid;
    justify-items: center;
    grid-template-columns: auto auto;
    grid-template-rows: 143px 402px 145px auto;
    color: #00D46A;
    font-family: 'Press Start 2P';
  }
  .welcome {
    grid-column: 1 / 3;
    align-self: end;
    padding-bottom:9px;
    padding-left:172px;
    font-size:17px;
  }
  .zoltar {
    width:400px;
    justify-self: right;
    padding-right:8px;
    align-self: end;
  }
  .logoText {
    font: 12px/12px monospace;
    display:inline-block;
    justify-self:left;
    align-self: end;
    padding-right: 50px;

  }
  .copyright {
    grid-column: 1 / 3;
    font-size:13px;
    padding-top:20px;
  }
  .insertDisk {
    grid-column: 1 / 3;
    font-size:18px;
  }
  .blink {
    color: #000;
  }

</style>
