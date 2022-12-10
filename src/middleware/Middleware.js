const docAdmin = require("../config/firebase-config");
const admin = require("firebase-admin");

module.exports.VerifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "").trim();
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue;
      return next();
    }
    return res.status(401).json({ message: "Unauthorised" });
  } catch (e) {
    // console.log(e.message);
    return res.status(401).json({ message: "Access denied" });
  }
};

// class Middleware {
//   export const decodeToken(req, res, next) {
//     const token = req.headers.authorization.split(" ")[1];
//     try {
//       const decodeValue = await admin.auth().verifyIdToken(token);
//       if (decodeValue) {
//         req.user = decodeValue;
//         return next();
//       }
//       return res.json({ message: "Un authorize" });
//     } catch (e) {
//       return res.json({ message: "Internal Error" });
//     }
//   }
// }

// module.exports = new Middleware();
