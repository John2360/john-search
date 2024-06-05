const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// HTTP Cloud Function
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello, World!");
});
