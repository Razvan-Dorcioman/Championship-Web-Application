// Initialize Firebase
var config = {
    apiKey: "AIzaSyDdhvKextTgpE-VkyT6UiLWmkPlw5Dr3-o",
    authDomain: "championship-21d2a.firebaseapp.com",
    databaseURL: "https://championship-21d2a.firebaseio.com",
    projectId: "championship-21d2a",
    storageBucket: "championship-21d2a.appspot.com",
    messagingSenderId: "229802205418"
};
firebase.initializeApp(config);
var db = firebase.firestore();

db.collection('users').doc('test').set({
    username:'test',
    email: 'test@test.com',
    password: 'test',
    gameCreated: 0
});