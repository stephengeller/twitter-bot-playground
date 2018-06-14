const Twit = require('twit')
const axios = require('axios')
const dotenv = require('dotenv').config()
const endpoint = 'betterNews/synonyms'
const url = 'http://localhost:3000/betterNews/synonyms'
const {
	TWITTER_CONSUMER_KEY,
	TWITTER_CONSUMER_SECRET,
	TWITTER_ACCESS_TOKEN,
	TWITTER_ACCESS_TOKEN_SECRET
} = process.env
const d = new Date()
const time = d.toLocaleTimeString()
const date = d.toLocaleDateString()
const dateAndTime = `${date} ${time}`

const bot = new Twit({
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	access_token: TWITTER_ACCESS_TOKEN,
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
	timeout_ms: 60 * 1000
})

const postToTwitter = message => {
	bot.post('statuses/update', { status: message }, (err, data, response) => {
		if (err) {
			console.log(err)
		} else {
			console.log(
				dateAndTime + ': ****' + `"${data.text}"` + ' was tweeted ****'
			)
		}
	})
}

const createNewsTweet = article => {
	const { source, title, url } = article
	const newsTweet = `${source.name.toUpperCase()}: ${title} (${url})`
	return newsTweet
}

const getDataFromAPI = url => {
	axios
		.get(url)
		.then(r => {
			const post = r.data.response
			if (endpoint == 'betterNews/synonyms') {
				postToTwitter(createNewsTweet(post))
			} else {
				postToTwitter(post)
			}
		})
		.catch(err => console.log(err))
}

getDataFromAPI(url)
