// firebase-config.js

const firebaseConfig = {
    apiKey: "AIzaSyCSccrNwgBiVGfK5BWXelAdzHC5DZNm7lw",
    authDomain: "vuanem-d66e5.firebaseapp.com",
    projectId: "vuanem-d66e5",
    storageBucket: "vuanem-d66e5.firebasestorage.app",
    messagingSenderId: "430491577223",
    appId: "1:430491577223:web:92be899aa6eae7c0950122"
};

// ===============================
// KHỞI TẠO FIREBASE
// ===============================
firebase.initializeApp(firebaseConfig);

// ===============================
// EXPORT GLOBAL
// ===============================
window.auth =
    firebase.auth();

window.db =
    firebase.firestore();

// ===============================
// DEBUG
// ===============================
console.log(
    "Firebase Ready"
);

console.log(window.auth);

console.log(window.db);
