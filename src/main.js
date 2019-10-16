import Vue from 'vue'
import App from './App.vue'
import router from './router'
import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false
Vue.config.devtools = false

import { ref, reset } from './db'

if (process.env.NODE_ENV === 'production') {
  Vue.use(new VueSocketIO({
    debug: false,
    connection: SocketIO()
  }));
}

new Vue({
  router,
  render: h => h(App),
  data: {
    ref: ref,
    reset: reset,
    settings: {
      question_limit:15,
      time_limit: 90
    },
    results : {
    }
  }
}).$mount('#app')
