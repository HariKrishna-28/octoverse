const router = require("express").Router();
const axios = require("axios");
const dotenv = require("dotenv");
const { google } = require("googleapis");
const Perspective = require("perspective-api-client");

const perspective = new Perspective({
  apiKey: process.env.PERSPECTIVE_API_KEY,
});

dotenv.config();
API_KEY = process.env.PERSPECTIVE_API_KEY;
DISCOVERY_URL =
  "https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1";

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

router.post("/moderate", async (req, res) => {
  const message = req.body.message;
  const toxicityThreshold = 50;
  google
    .discoverAPI(DISCOVERY_URL)
    .then((client) => {
      const analyzeRequest = {
        comment: {
          text: message,
        },
        requestedAttributes: {
          TOXICITY: {},
          SEXUALLY_EXPLICIT: {},
          IDENTITY_ATTACK: {},
        },
      };

      client.comments.analyze(
        {
          key: API_KEY,
          resource: analyzeRequest,
        },
        (err, result) => {
          if (err) res.status(200).json({});
          else {
            const processedResult = {
              IDENTITY_ATTACK: (
                result.data.attributeScores.IDENTITY_ATTACK.summaryScore.value *
                100
              ).toFixed(2),
              SEXUALLY_EXPLICIT: (
                result.data.attributeScores.SEXUALLY_EXPLICIT.summaryScore
                  .value * 100
              ).toFixed(2),
              TOXICITY: (
                result.data.attributeScores.TOXICITY.summaryScore.value * 100
              ).toFixed(2),
            };
            let val = [];
            if (parseInt(processedResult.IDENTITY_ATTACK) > toxicityThreshold)
              val.push("Identity Attack");
            if (parseInt(processedResult.SEXUALLY_EXPLICIT) > toxicityThreshold)
              val.push("Sexually Explicit");
            if (parseInt(processedResult.TOXICITY) > toxicityThreshold)
              val.push("Toxic");
            res.status(200).json(val);
          }
          // console.log(JSON.stringify(response.data, null, 2));
        }
      );
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// router.post("/perspective", async (req, res) => {
//   const message = req.body.message;
//   try {
//     // const result = await perspective.analyze(message, {
//     //   attributes: [
//     //     "TOXICITY",
//     //     // "PROFANITY",
//     //     "SEXUALLY_EXPLICIT",
//     //     "IDENTITY_ATTACK",
//     //     // "INSULT",
//     //     // "THREAT",
//     //     // "OBSCENE",
//     //   ],
//     // });
//     perspective
//       .analyze(message, {
//         attributes: [
//           "TOXICITY",
//           // "PROFANITY",
//           "SEXUALLY_EXPLICIT",
//           "IDENTITY_ATTACK",
//           // "INSULT",
//           // "THREAT",
//           // "OBSCENE",
//         ],
//       })
//       .then((response) => {
//         res.status(200).json(response);
//       })
//       .catch((error) => res.status(500).json(error));

//     // const processedResult = {
//     //   IDENTITY_ATTACK: (
//     //     result.attributeScores.IDENTITY_ATTACK.summaryScore.value * 100
//     //   ).toFixed(2),
//     //   SEXUALLY_EXPLICIT: (
//     //     result.attributeScores.SEXUALLY_EXPLICIT.summaryScore.value * 100
//     //   ).toFixed(2),
//     //   TOXICITY: (
//     //     result.attributeScores.TOXICITY.summaryScore.value * 100
//     //   ).toFixed(2),
//     // };
//     // res.status(200).json(processedResult);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// });

module.exports = router;
