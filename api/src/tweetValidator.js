const DatabaseManager = require("./databaseManager");
const BadWords = require("../../data/bannedWords");

class TweetValidator {
  constructor(db = "testDB") {
    this.databaseManager = new DatabaseManager(db);
  }

  catchBadWord(string, word) {
    return string.toLowerCase().includes(word.toLowerCase());
  }

  ensureNoBadWords(string, arr) {
    for (let w in arr) {
      if (this.catchBadWord(string, arr[w])) {
        console.log(`${arr[w]} found in ${string}`);
        return false;
      }
    }
    return true;
  }

  catchNoChanges(str1, str2) {
    return str1.toLowerCase() === str2.toLowerCase();
  }

  catchTweetInDB(tweet, collection, callback) {
    if (typeof tweet !== "object") {
      throw new Error("please pass tweet object type");
    }
    let found = false;
    this.databaseManager.findOne(tweet, collection, function(r) {
      if (r != null) {
        found = true;
      }
      callback(!found);
    });
  }

  validateTweetBefore(tweet) {
    return !this.ensureNoBadWords(tweet, BadWords);
  }

  validateTweetAfter(original, changed) {
    return !this.catchNoChanges(original, changed);
  }
}

module.exports = TweetValidator;
