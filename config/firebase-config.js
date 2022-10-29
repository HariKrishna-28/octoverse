const admin = require("firebase-admin");

// const serviceAccount = require("path/to/serviceAccountKey.json");
const serviceAccount = require("./admin-config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
