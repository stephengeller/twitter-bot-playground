const Synonyms = require('synonyms')

class StringReplacer {
	constructor() {
		this.synonyms = Synonyms
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

	wordWithSynonym(word) {
		const synonymArray = this.synonyms(word)
		if (
			!!synonymArray &&
			Object.keys(synonymArray).length > 0 &&
			!!synonymArray.s
		) {
			const lastSynonym = synonymArray.s[synonymArray.s.length - 1]
			if (lastSynonym.length > 1) {
				console.log(`*** replacing ${word} with ${lastSynonym}`)
				return lastSynonym
			}
		}
		return word
	}

	wordsWithSynonyms(stringOfWords) {
		let array = stringOfWords.split(' ')
		let word = ''
		for (word in array) {
			array[word] = this.wordWithSynonym(array[word])
		}
		const finalString = array.join(' ')
		console.log(finalString)
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
