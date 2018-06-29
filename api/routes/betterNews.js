const express = require("express");
const router = express.Router();
const NewsAPI = require("newsapi");
const dotenv = require("dotenv").config();
const StringReplacer = require("../src/stringReplacer");
const jsonData = require("../../data/words.json");
const { randomise } = require("../src/helperFunctions");
const TweetValidator = require("../src/tweetValidator");
const DatabaseManager = require("../src/databaseManager");

const apiKey = process.env.NEWS_API_KEY;
const stringReplacer = new StringReplacer();
const newsapi = new NewsAPI(apiKey);
const tweetValidator = new TweetValidator();
const dbManager = new DatabaseManager();

router.get("/", (req, res) => {
  let responseData = [];

  newsapi.v2
    .topHeadlines({
      country: "gb"
    })
    .then(response => {
      const { articles } = response;
      articles.forEach(article => {
        let { title } = article;
        for (let i in jsonData) {
          let obj = jsonData[i];
          title = title.replaceAll(obj.wordToReplace, obj.wordToAdd);
        }
        responseData.push(title);
      });
      res.send({ response: responseData });
    })
    .catch(err => {
      res.send({ response: false, err: err });
    });
});

router.get("/:wordType", async (req, res) => {
  const { wordType } = req.params;
  await newsapi.v2
    .topHeadlines({
      country: "gb"
    })
    .then(async response => {
      const { articles } = response;
      let index;
      while (true) {
        let randomArticle = randomise(articles);
        while (tweetValidator.validateTweetBefore(randomArticle.title)) {
          index = articles.indexOf(randomArticle);
          if (index > -1) {
            articles.splice(index, 1);
          }
          randomArticle = randomise(articles);
        }

        let articleTitle = randomArticle.title;
        articleTitle = await stringReplacer.wordsWithSynonyms(
          articleTitle,
          wordType
        );

        if (
          tweetValidator.validateTweetAfter(randomArticle.title, articleTitle)
        ) {
          randomArticle.title = articleTitle;
          dbManager.insert({ tweet: randomArticle }, "sent");
          res.send({ response: randomArticle });
          break;
        } else {
          console.log("no success, trying again");
        }
      }
    })
    .catch(err => {
      console.log(err);
      res.send({ response: false, err: err });
    });
});

module.exports = router;
