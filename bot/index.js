const Twit = require('twit');
const axios = require('axios');

const bot = new Twit({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token: process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
	timeout_ms: 60 * 1000
});

const url = 'http://localhost:3000/insult';

const postToTwitter = message => {
	bot.post('statuses/update', { status: message }, (err, data, response) => {
		if (err) {
			console.log(err);
		} else {
			console.log(data.text + ' was tweeted');
		}
	});
};

const getDataFromAPI = url => {
	axios
		.get(url)
		.then(r => {
			const post = r.data.response;
			postToTwitter(post);
		})
		.catch(err => console.log(err));
};

getDataFromAPI(url);
