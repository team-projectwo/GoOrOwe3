import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDJUqasCmk9ksH_Uwqq6i25jEpkFxbJ8p4",
    authDomain: "go-or-owe-38440.firebaseapp.com",
    databaseURL: "https://go-or-owe-38440.firebaseio.com",
    projectId: "go-or-owe-38440",
    storageBucket: "go-or-owe-38440.appspot.com",
    messagingSenderId: "111812110386"
};



// Initialize Firebase
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;