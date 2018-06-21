const DatabaseManager = require("./databaseManager");

class TweetValidator {
  constructor(db = "testDB") {
    this.databaseManager = new DatabaseManager(db);
  }

  catchBadWords(string, word) {
    return string.toLowerCase().includes(word.toLowerCase());
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
}

module.exports = TweetValidator;
