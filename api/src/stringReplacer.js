const Synonyms = require('synonyms')
const axios = require('axios')
const dotenv = require('dotenv').config()
const { randomise } = require('./helperFunctions')

class StringReplacer {
	constructor() {
		this.synonyms = Synonyms
		this.url = 'https://wordsapiv1.p.mashape.com/words'
		this.headers = {
			headers: {
				'X-Mashape-Key': process.env.MASHAPE_KEY,
				'X-Mashape-Host': process.env.MASHAPE_HOST
			}
		}
	}

	replaceWord(string, oldWord, newWord) {
		let items = string.split(' ')

		const index = items.indexOf(oldWord)
		if (index !== -1) {
			items[index] = newWord
		}
		return items.join(' ')
	}

	replaceAnyMatch(string, oldWord, newWord) {
		return string.replace(oldWord, newWord)
	}

	async wordWithSynonym(word, type) {
		let wordURL = `${this.url}/${word}/${type}`
		let finalWord = ''
		return axios
			.get(wordURL, this.headers)
			.then(r => {
				if (r.data[type] && r.data[type].length > 0) {
					return randomise(r.data[type])
				} else {
					return word
				}
			})
			.catch(err => {
				console.log(`"${word}": ${err.response.data.message}`)
				return word
			})
	}

	async wordsWithSynonyms(stringOfWords, type) {
		let array = stringOfWords.split(' ')
		let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

		for (let i in array) {
			let word = array[i]
			if (!format.test(word) && word.length > 2) {
				array[i] = await this.wordWithSynonym(word, type)
			}
		}
		const finalString = array.join(' ')
		console.log(`${stringOfWords} => ${finalString}`)
		return finalString
	}
}

String.prototype.replaceAll = function(searchStr, replaceStr) {
	var str = this

	// escape regexp special characters in search string
	searchStr = searchStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

	return str.replace(new RegExp(searchStr, 'gi'), replaceStr)
}

module.exports = StringReplacer
