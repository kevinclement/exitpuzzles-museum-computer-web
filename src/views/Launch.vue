<template>
  <div class="launch" style="padding-left:40px">
    <img src="../assets/zoltar-nes-clean-block.png" style="width:400px;padding-bottom: 10px;"/>
    <pre style="font: 12px/12px monospace;color:#00D46A;display:inline-block;padding-top:160px;padding-left:15px;padding-bottom:10px;">
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
    <div style="font-size:13px;padding-left:290px;padding-top:10px">©<span style="padding-left:3px;">1985</span> Marko Software INC.</div>
    <div v-bind:class="{ blink: blink }" style="font-size:18px;padding-left:150px;padding-top:100px">Insert QUIZ DISK 2/2 to continue...</div>
  </div>
  
</template>
<script>
export default {
  name: 'Launch',
  props: {
  },
  data() {
    return {
      blink: true
    }
  },
  created() {
    setInterval(() => {
      this.blink = !this.blink;
    }, 1000);
  }
}
</script>

<style scoped>
  .blink {
    color: #000;
  }
  .blink_me {
    animation: blinker 1s infinite;
  }
  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
  .launch {
    color: #00D46A;
    font-family: 'Press Start 2P';
  }
</style>
