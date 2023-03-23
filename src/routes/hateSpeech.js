const router = require("express").Router();
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

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

module.exports = router;
