const admin = require("firebase-admin");

const serviceAccount = require("./firebase_admin_key.json");
// const serviceAccount = require("./admin-config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
