const router = require("express").Router();
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

router.get("/", async (req, res) => {
  const options = {
    method: "GET",
    url: `https://${process.env.RAPID_API_NEWS_HOST}/v1/search`,
    params: {
      q: "Tech news",
      lang: "en",
      page: "1",
      page_size: "10",
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_NEWS_KEY,
      "X-RapidAPI-Host": process.env.RAPID_API_NEWS_HOST,
    },
  };
  axios
    .request(options)
    .then(function (response) {
      const data = response.data.articles.map((article) => {
        const { title, published_date, summary, _id, link } = article;
        return { title, published_date, summary, _id, link };
      });
      res.status(200).json(
        data.sort((p1, p2) => {
          return new Date(p2.published_date) - new Date(p1.published_date);
        })
      );
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

module.exports = router;
