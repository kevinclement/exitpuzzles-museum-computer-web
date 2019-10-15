import firebase from 'firebase/app'
import 'firebase/database'

// Get a Firestore instance
export const db = firebase
  .initializeApp({ databaseURL: require('../db.json').dev })
  .database()

export const ref = db.ref('museum').child('devices/quiz')

export const reset = function(state) {
  let uObj = {
    questionIndex: 0,
    correctQuestions: null,
    missedQuestions: null,
    force: null
  }
  
  if (state) {
    uObj.state = state
  }

  ref.update(uObj)
}