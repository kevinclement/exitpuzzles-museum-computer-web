<template> 
  <div class="resultsPage">
        <div style="text-align:center">** HIGH SCORE: ***********</div>
        <pre class="results" v-bind:class="{ blink: blink }" style="padding-top:40px;text-align:center">
               █████╗ ███████╗██╗  ██╗██████╗ ██████╗
              ██╔══██╗╚════██║██║  ██║╚════██╗╚════██╗
              ╚█████╔╝    ██╔╝███████║ █████╔╝ █████╔╝
              ██╔══██╗   ██╔╝ ╚════██║██╔═══╝  ╚═══██╗
              ╚█████╔╝   ██║       ██║███████╗██████╔╝
               ╚════╝    ╚═╝       ╚═╝╚══════╝╚═════╝                                        
       </pre>
       <div style="padding-top:85px;text-align:center">**************************</div>      
      <audio ref="successSnd" preload="true">
          <source src="../assets/sounds/success.mp3" type="audio/mpeg">
      </audio>
      <audio ref="buttonSnd" preload="true">
        <source src="../assets/sounds/button-17.wav" type="audio/wav">
      </audio>        
  </div>   
</template>
<script>

export default {
  name: 'ScoreCelebrate',
  props: {},
  sockets: {
    connect: function () {
        console.log('socket connected for score and seven years ago')
    },
    BUTTON: function (data) {
        console.log(`success button pressed: ${data}`)
        this.buttonPressed(data.index)
    }
  },
  data() { 
    return {
        blink: false,
        blinkTimer: null,
    } 
  },
  computed: {},
  created() { 
    this.blinkTimer = setInterval(() => {
          this.blink = !this.blink;
        }, 1000);
    
    window.addEventListener('keydown', this.onkeydown)
  },
  destroyed() {
    clearTimeout(this.blinkTimer);
    window.removeEventListener('keydown', this.onkeydown)
  },
  mounted() {    
    this.createConfetti(20);

    // TODO: play success on mount if I have permission
    //  this means it could play it twice from previous page
  },
  methods: {
    buttonPressed: function() {    
        this.$refs.buttonSnd.play()
        this.createConfetti(20);
        this.$refs.successSnd.play()
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
    
    randomId: function(length) {
      var result = [];
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
      }
      return result.join('');
    },

    createConfetti: function(confettiItems) {
      let maxX = document.body.clientWidth - 100;
      let maxY = document.body.clientHeight - 100;
      
      let x = Math.floor(Math.random() * maxX);
      let y = Math.floor(Math.random() * maxY);    

      let createElement = document.createElement('div');
      createElement.classList.add('confetti');
      let makeId = this.randomId(10);
      createElement.setAttribute('data-id', makeId);
      let confettiHTML = '';
      // let colors = [ '#2162ff', '#9e21ff', '#21a9ff', '#a9ff21', '#ff2184' ]
      let colors = [ '#00D46A' ]
      
      for(var i = 0; i < confettiItems; ++i) {
          let color = Math.floor(Math.random() * (colors.length));
          confettiHTML += `<div class="confetti-item" style="background-color: ${colors[color]};" data-angle="${Math.random()}" data-speed="${Math.random()}"></div>`;
          confettiHTML += `<div class="confetti-item reverse" style="background-color: ${colors[color]};" data-angle="${Math.random()}" data-speed="${Math.random()}"></div>`;
      }
      
      createElement.style.position = `fixed`;
      createElement.style.top = `${y}px`;
      createElement.style.left = `${x}px`;
      createElement.innerHTML = confettiHTML;
      document.body.appendChild(createElement);
      
      let gravity =  50; // Fjolt is a high gravity planet
      let maxSpeed = 105000; // Pixels * 1000
      let minSpeed = 65000; // Pixels * 1000
      let t = 0; // Time starts at 0
      let maxAngle = 1500; // Radians * 1000
      let minAngle = 400; // Radians * 1000
      let opacity = 1;
      let rotateAngle = 0;

      let interval = setInterval(function() {
          document.querySelectorAll(`[data-id="${makeId}"] .confetti-item`).forEach(function(item) {
              let modifierX = 1;
              let modifierY = 1;
              if(item.classList.contains('reverse')) {
                  modifierX = -1;
              }
              item.style.opacity = opacity;
              let randomNumber = parseFloat(item.getAttribute('data-angle'));
              let otherRandom = parseFloat(item.getAttribute('data-speed'));
              let newRotateAngle = randomNumber * rotateAngle;
              let angle = (randomNumber * (maxAngle - minAngle) + minAngle) / 1000;
              let speed = (randomNumber * (maxSpeed - minSpeed) + minSpeed) / 1000;
              // let realT = t * (parseFloat(item.getAttribute('data-angle')));
              let x = speed * t * Math.cos(angle) + (50 * otherRandom * t);
              let y = speed * t * Math.sin(angle) - (0.5 * gravity * Math.pow(t, 2))  + (50 * otherRandom * t);
              item.style.transform = `translateX(${x * modifierX}px) translateY(${y * -1 * modifierY}px) rotateY(${newRotateAngle}deg) scale(${1})`;
          })  
          t += 0.1;
          rotateAngle += 3;
          opacity -= 0.02;
          if(t >= 6) {
              t = 0.1;
              if(document.querySelector(`[data-id="${makeId}"]`) !== null) {
                  document.querySelector(`[data-id="${makeId}"]`).remove();
              }
              clearInterval(interval);
          }
      }, 33.33);
    }
  },
}
</script>

<style>
.resultsPage {
    display: grid;
    font-size: 28px;
    padding-top:40px;
    padding-left: 40px;
    padding-right: 40px;    
    grid-template-rows: auto;
    color: #00D46A;
    font-family: 'Press Start 2P';
    overflow:hidden;
  }   
  .results {
    font: 18px monospace;
    font-family:"Courier New", monospace;
  }  
  .blink {
    color: #000;
  }
  .confetti {
    position: absolute;
    z-index: 9999;
  }
  .confetti-item {
    width: 10px;
    position: absolute;
    top: 0;
    left: 0;
    height: 10px;
  }
</style>
