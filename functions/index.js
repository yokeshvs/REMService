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
        admin.database().ref('/devices').child(deviceId).set({ timeStamp: admin.database.ServerValue.TIMESTAMP });
        //admin.database().ref('/deviceInfo').child(deviceId).set({ edge1: 0, edge2: 0, edge3: 0 });
        return res.status(200).send('Device added successfully');
    }
    return res.status(404).send('Request Method Incorrect');
});

exports.deviceLocation = functions.https.onRequest((req, res) => {
    if (req.method === 'PUT') {
        const deviceId = req.body.deviceId;
        const edgeId = req.body.edgeId;
        const distance = req.body.distance;
        admin.database().ref('/devices').child(deviceId).child(edgeId).set({ distance: distance });
        return res.status(200).send('Device location updated successfully');
    }
    return res.status(404).send('Request Method Incorrect');
});