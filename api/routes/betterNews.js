const express = require('express')
const router = express.Router()
const NewsAPI = require('newsapi')
const dotenv = require('dotenv').config()
const StringReplacer = require('../src/stringReplacer')
const jsonData = require('../../data/words.json')
const { randomise } = require('../src/helperFunctions')

const apiKey = process.env.NEWS_API_KEY
const stringReplacer = new StringReplacer()
const newsapi = new NewsAPI(apiKey)

router.get('/', (req, res) => {
	let responseData = []

	newsapi.v2
		.topHeadlines({
			country: 'gb'
		})
		.then(response => {
			const { articles } = response
			articles.forEach(article => {
				let { title } = article
				for (let i in jsonData) {
					let obj = jsonData[i]
					title = title.replaceAll(obj.wordToReplace, obj.wordToAdd)
				}
				responseData.push(title)
			})
			res.send({ response: responseData })
		})
		.catch(err => {
			res.send({ response: false, err: err })
		})
})

router.get('/synonyms', async (req, res) => {
	await newsapi.v2
		.topHeadlines({
			country: 'gb'
		})
		.then(async response => {
			const { articles } = response
			const randomArticle = randomise(articles)
			randomArticle.title = await stringReplacer.wordsWithSynonyms(
				randomArticle.title
			)
			res.send({ response: randomArticle })
		})
		.catch(err => {
			console.log(err)
			res.send({ response: false, err: err })
		})
})

module.exports = router
