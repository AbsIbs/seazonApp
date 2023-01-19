const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

// Firestore
const db = admin.firestore();

// Create user
exports.helloWorld = functions.https.onCall(() => {
  return "Hello world";
});


// Create user
exports.registerUser = functions.https.onCall((data) => {
  return admin.auth().createUser({
    email: data.email,
    emailVerified: false,
    password: data.password,
    displayName: data.displayName,
    disabled: false,
  })
      .catch((error) => {
        throw new functions.https.HttpsError("failed to create a user");
      })
      .then((res) => {
        db.doc("users/" + res.uid).set(data)
      })
});


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
