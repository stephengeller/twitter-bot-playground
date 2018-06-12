class StringReplacer {
	constructor() {}

	replaceWord(string, oldWord, newWord) {
		let items = string.split(' ');

		const index = items.indexOf(oldWord);
		if (index !== -1) {
			items[index] = newWord;
		}
		return items.join(' ');
	}

	replaceAnyMatch(string, oldWord, newWord) {
		return string.replace(oldWord, newWord);
	}
}

String.prototype.replaceAll = function(searchStr, replaceStr) {
	var str = this;

	// escape regexp special characters in search string
	searchStr = searchStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

	return str.replace(new RegExp(searchStr, 'gi'), replaceStr);
};

module.exports = StringReplacer;
