import firebase from 'firebase/app'
import 'firebase/database'

let dbUrl = "https://exitpuzzles-admin.firebaseio.com"

// Get a Firestore instance
const db = firebase
  .initializeApp({ databaseURL: dbUrl })
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