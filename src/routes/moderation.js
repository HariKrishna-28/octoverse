const router = require("express").Router();
const axios = require("axios");
const dotenv = require("dotenv");
// const { google } = require("googleapis");
const Perspective = require("perspective-api-client");

const perspective = new Perspective({
  apiKey: process.env.PERSPECTIVE_API_KEY,
});

dotenv.config();
// API_KEY = process.env.PERSPECTIVE_API_KEY;
// DISCOVERY_URL =
//   "https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1";

router.post("/", (req, res) => {
  const val = req.body.message;
  const options = {
    method: "GET",
    url: `https://${process.env.RAPID_API_HATE_SPEECH_HOST}/predict`,
    params: { q: val },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_HATE_SPEECH_KEY,
      "X-RapidAPI-Host": process.env.RAPID_API_HATE_SPEECH_HOST,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

// router.post("/moderate", async (req, res) => {
//   const message = req.body.message;
//   google
//     .discoverAPI(DISCOVERY_URL)
//     .then((client) => {
//       const analyzeRequest = {
//         comment: {
//           text: "Jiminy cricket! Well gosh durned it! Oh damn it all!",
//         },
//         requestedAttributes: {
//           TOXICITY: {},
//         },
//       };

//       client.comments.analyze(
//         {
//           key: API_KEY,
//           resource: analyzeRequest,
//         },
//         (err, response) => {
//           if (err) throw err;
//           console.log(JSON.stringify(response.data, null, 2));
//         }
//       );
//     })
//     .catch((err) => {
//       throw err;
//     });
// });

router.post("/perspective", async (req, res) => {
  try {
    const message = req.body.message;
    const result = await perspective.analyze(message, {
      attributes: [
        "TOXICITY",
        // "PROFANITY",
        "SEXUALLY_EXPLICIT",
        "IDENTITY_ATTACK",
        // "INSULT",
        // "THREAT",
        // "OBSCENE",
      ],
    });
    res.status(200).json(result);
    // res.status(200).json(JSON.stringify(result, null, 2));
    // console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
