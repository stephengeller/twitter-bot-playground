const DatabaseManager = require("./databaseManager");

class TweetValidator {
  constructor(db) {
    this.databaseManager = new DatabaseManager(db);
  }

  catchBadWords(string, word) {
    return string.toLowerCase().includes(word.toLowerCase());
  }

  catchNoChanges(str1, str2) {
    return str1.toLowerCase() === str2.toLowerCase();
  }

  async catchTweetInDB(tweet, collection, callback) {
    let found = false;
    let blah;
    blah = await this.databaseManager.findOne(tweet, collection, function(r) {
      console.log(r);
      blah = r;
      if (r != null) {
        found = true;
      }
    });
    console.log(blah);
    return found;
  }
}

module.exports = TweetValidator;
