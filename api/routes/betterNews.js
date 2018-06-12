const express = require('express');
const router = express.Router();
const axios = require('axios');
const NewsAPI = require('newsapi');
const dotenv = require('dotenv').config();
const StringReplacer = require('../src/stringReplacer');

router.get('/', function(req, res) {
	const apiKey = process.env.NEWS_API_KEY;
	const stringReplacer = new StringReplacer();
	const newsapi = new NewsAPI(apiKey);

	newsapi.v2
		.topHeadlines({
			country: 'gb'
		})
		.then(response => {
			const { articles } = response;
			articles.forEach(article => {
				let title = article.title
					.replaceAll('resigns', 'decides to bounce')
					.replaceAll('Brexiteers', 'fucking idiots')
					.replaceAll('Brexit', 'FuckOuttaEuro')
					.replaceAll('actor', 'pretendyperson')
					.replaceAll('Trump', 'StupidMcPumpkinFace')
					.replaceAll('memes', 'dank maymays');
				console.log(title);
				console.log(article.url, '\n');
			});
			res.send({ response: true });
		})
		.catch(err => {
			console.log(err);
			res.send({ response: false });
		});
});

module.exports = router;
