const router = require("express").Router();
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

router.get("/", async (req, res) => {
  const options = {
    method: "GET",
    url: `https://${process.env.RAPID_API_HOST}/v1/search`,
    params: {
      q: "Tech news",
      lang: "en",
      page: "1",
      page_size: "10",
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
    },
  };
  axios
    .request(options)
    .then(function (response) {
      res.status(200).json(response.data.articles);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

module.exports = router;
