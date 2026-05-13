 const firebaseConfig = { 
    apiKey: "AIzaSyCFPWPMIHdZUJwpNJ75o1FK9AamecKSRCI", 
    authDomain: "vuanem-d66e5.firebaseapp.com",
    projectId: "vuanem-d66e5"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
