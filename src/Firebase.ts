import firebase from 'firebase'

const config = {
    apiKey: 'AIzaSyCJm0HFcIp8Xg-_Z9WajYEin4Malcy0ukE',
    projectId: 'prepped-eats',
    databaseURL: 'https://prepped-eats.firebaseio.com/',
    storageBucket: 'gs://prepped-eats.appspot.com/',
}

firebase.initializeApp(config)
firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch((e) => console.error(e))

export const database = firebase.database()
export const firestore = firebase.firestore()
export const storageRef = firebase.storage().ref()
export const authentication = firebase.auth()
export default firebase
