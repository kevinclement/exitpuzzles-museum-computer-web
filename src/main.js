import Vue from 'vue'
import App from './App.vue'
import router from './router'
import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import { rtdbPlugin } from 'vuefire'

Vue.config.productionTip = false
Vue.config.devtools = false

Vue.use(rtdbPlugin)

import { db } from './db'

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
    fbdb: db,
    results : {
    }
  }
}).$mount('#app')
