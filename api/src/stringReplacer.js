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

	async wordWithSynonym(word) {
		let wordURL = `${this.url}/${word}/synonyms`
		let finalWord = ''
		return axios
			.get(wordURL, this.headers)
			.then(r => {
				if (r.data && r.data.synonyms && r.data.synonyms.length > 0) {
					return randomise(r.data.synonyms)
				} else {
					return word
				}
			})
			.catch(err => {
				console.log(`"${word}": ${err}`)
				return word
			})
	}

	async wordsWithSynonyms(stringOfWords) {
		let array = stringOfWords.split(' ')
		let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

		for (let i in array) {
			let word = array[i]
			if (!format.test(word) && word == word.toLowerCase() && word.length > 4) {
				array[i] = await this.wordWithSynonym(word)
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
