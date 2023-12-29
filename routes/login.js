const express = require("express");
const router = express.Router();


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc01TIhA08OSIjC-Bka_2YuOnvgw75l6I",
  authDomain: "competition-1aa19.firebaseapp.com",
  projectId: "competition-1aa19",
  storageBucket: "competition-1aa19.appspot.com",
  messagingSenderId: "835538359066",
  appId: "1:835538359066:web:47d2fd4049fca40b8dd2a3",
  measurementId: "G-N4BR70VVBG"
};

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const serviceAccount = require('../key.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();



router.post('/login', async (req, res) => {
  try {
    const docId = req.body.value1;
    const docRef = db.collection('users').doc(docId);
    const doc = await docRef.get();
    console.log(docId);
    
    if (doc.exists) {
      const passwordMatch = doc.data().password === req.body.value2;
      
      res.json({ success: passwordMatch });
    } else {
      console.log('false');
      res.json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
