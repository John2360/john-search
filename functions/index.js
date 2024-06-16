/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");
const nodemailer = require("nodemailer");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  host: process.env.SMPT_HOST, // Your SMTP server host
  port: process.env.SMPT_PORT, // Your SMTP server port
  secure: true,
  auth: {
    user: process.env.SENDER,
    pass: process.env.PASSWORD,
  },
});

exports.sendEmail = onRequest({ cors: true }, async (request, response) => {
  if (!request.body.message) {
    logger.error("Request did not include message.");
    response.status(400).send("Missing message in request body.");
    return;
  }
  if (
    !request.headers.authorization ||
    !request.headers.authorization.startsWith("Bearer ")
  ) {
    logger.error("Missing or invalid authorization token.");
    response.status(401).send("Unauthorized");
    return;
  }
  const idToken = request.headers.authorization.split("Bearer ")[1];
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const uid = decodedToken?.uid;
  if (!uid) {
    logger.error("Failed to verify user.");
    response.status(401).send("Unauthorized");
    return;
  }

  const mailOptions = {
    from: process.env.SENDER,
    to: [process.env.OLIVIA, process.env.JOHN].join(","),
    text: request.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error);
      response.status(500).send("Error sending message.");
    } else {
      logger.info(info);
      response.status(200).send("Sent message successfully.");
    }
  });
});
