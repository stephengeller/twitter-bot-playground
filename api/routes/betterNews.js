var express = require('express');
var router = express.Router();
var axios = require('axios');
var dotenv = require('dotenv').config();

// axios.defaults.headers.common['Authorization'] = process.env.NEWS_API_KEY;

router.get('/', function(req, res) {
	let headers = `?country=gb&apiKey=${process.env.NEWS_API_KEY}`;
	let url = 'https://newsapi.org/v2/top-headlines' + headers;
	axios
		.get(url, headers)
		.then(r => {
			const { articles } = r.data;
			articles.forEach(article => console.log(article.title));
			res.send({ message: 'news' });
		})
		.catch(err => console.log(err.response.data));
});

const replaceWordInString = (string, oldWord, newWord) => {
	return string.replace(oldWord, newWord);
};

module.exports = router;
