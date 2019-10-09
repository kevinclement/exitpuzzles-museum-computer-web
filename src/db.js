import firebase from 'firebase/app'
import 'firebase/database'

let dbUrl = "https://exitpuzzles-admin.firebaseio.com"

// Get a Firestore instance
export const db = firebase
  .initializeApp({ databaseURL: dbUrl })
  .database()