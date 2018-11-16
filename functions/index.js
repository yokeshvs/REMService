// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();


exports.addMessage = functions.https.onRequest((req, res) => {
    const original = req.query.text;
    return admin.database().ref('/messages').push({ original: original }).then((snapshot) => {
        return res.redirect(303, snapshot.ref.toString());
    });
});


exports.devices = functions.https.onRequest((req, res) => {
    if (req.method === 'POST') {
        const deviceId = req.body.id;
        return admin.database().ref('/devices').push({ deviceId: deviceId }).then((snapshot) => {
            return res.status(200).send('Device added successfully');
        });
    }
    return res.status(404).send('Request Method Incorrect');
});