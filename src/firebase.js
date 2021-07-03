import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAdLaM5i1sdWVeSj9SnTcbxC43thLaYlx8",
    authDomain: "to-do-ks.firebaseapp.com",
    projectId: "to-do-ks",
    storageBucket: "to-do-ks.appspot.com",
    messagingSenderId: "499062297626",
    appId: "1:499062297626:web:7e463b3835a98d637b2da3",
    measurementId: "G-H2B5ZXS7DP",
});

const db = firebaseApp.firestore();

export default db;