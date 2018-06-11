var express = require("express");
var router = express.Router();
var axios = require("axios");

router.get("/", function(req, res, next) {
  let url = "https://jsonplaceholder.typicode.com/posts";
  axios.get(url).then(r => {
    const message = r.data[0].title;
    console.log(message);
    res.send({ comingFromApi: message });
  });
});

router.get("/insult", function(req, res, next) {
  let url = "https://insult.mattbas.org/api/adjective/json";
  axios.get(url).then(r => {
    const message = r.data;
    console.log(r);
    res.send({ comingFromApi: message });
  });
});

router.get("/date", function(req, res, next) {
  const date = new Date().toISOString();
  const message = `The time is: ${date}`;
  res.send({ comingFromApi: message });
});

module.exports = router;
