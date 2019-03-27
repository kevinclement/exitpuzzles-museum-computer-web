import Vue from 'vue'
import App from './App.vue'
import router from './router'
import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  Vue.use(new VueSocketIO({
    debug: false,
    connection: SocketIO()
  }));
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
