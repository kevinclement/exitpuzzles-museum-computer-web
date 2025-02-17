import firebase from 'firebase/app'
import 'firebase/database'

// Get a Firestore instance
let dev_mode = process.env.NODE_ENV === 'development' && process.env.DEV_MODE !== 'production'
let dbconfig = require('../db.json')
let dbUrl = dev_mode ? dbconfig.dev : dbconfig.prod
export const db = firebase
  .initializeApp({ databaseURL: dbUrl })
  .database()

export const ref = db.ref('museum').child('devices/quiz')

export const reset = function(state) {
  console.log(`Resetting state to ${state}`);
  let uObj = {
    questionIndex: 0,
    correctQuestions: null,
    missedQuestions: null,
    force: null,
    info: {
      lastActivity: (new Date()).toLocaleString()
    }
  }
  
  if (state) {
    uObj.state = state
  }

  ref.update(uObj)
}