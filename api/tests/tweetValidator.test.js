const TweetValidator = require("../src/tweetValidator");
const DatabaseManager = require("../src/DatabaseManager");
const dbManager = new DatabaseManager("testDB");
const testCollection = "testCollection";

let tweetValidator = new TweetValidator();

describe("catchBadWord", () => {
  test("returns true if bad word is found in string", () => {
    const badWord = "foo";
    const string = "Here is a headline with the word foo in it";
    expect(tweetValidator.catchBadWord(string, badWord)).toBe(true);
  });

  test("returns true if bad word is found with different case", () => {
    const badWord = "FOo";
    const string = "Here is a headline with the word foo in it";
    expect(tweetValidator.catchBadWord(string, badWord)).toBe(true);
  });

  test("returns false if bad word is not found in string", () => {
    const badWord = "foo";
    const string = "Here is a headline without the word in it";
    expect(tweetValidator.catchBadWord(string, badWord)).toBe(false);
  });
});

describe("ensureNoBadWords", () => {
  test("returns false if word in array is found in string", () => {
    const arrOfBannedWords = ["foo", "baz", "bar"];
    const string = "Here is a headline with the word foo in it";
    expect(tweetValidator.ensureNoBadWords(string, arrOfBannedWords)).toBe(
      false
    );
  });

  test("returns false if bad word is found with different case", () => {
    const arrOfBannedWords = ["FoO", "baz", "bar"];
    const string = "Here is a headline with the word foo in it";
    expect(tweetValidator.ensureNoBadWords(string, arrOfBannedWords)).toBe(
      false
    );
  });

  test("works with one item", () => {
    const arrOfBannedWords = ["foo"];
    const string = "Here is a headline with the word foo in it";
    expect(tweetValidator.ensureNoBadWords(string, arrOfBannedWords)).toBe(
      false
    );
  });

  test("works with multiple found items", () => {
    const arrOfBannedWords = ["foo", "bar"];
    const string = "Here is a headline with the word foo and bar in it";
    expect(tweetValidator.ensureNoBadWords(string, arrOfBannedWords)).toBe(
      false
    );
  });

  test("returns true if bad word is not found in string", () => {
    const arrOfBannedWords = ["foo"];
    const string = "Here is a headline without the word in it";
    expect(tweetValidator.ensureNoBadWords(string, arrOfBannedWords)).toBe(
      true
    );
  });
});

describe("catchNoChanges", () => {
  test("returns true if string not changed by external", () => {
    const oldString = "Here is the same headline";
    const newString = "Here is the same headline";
    expect(tweetValidator.catchNoChanges(oldString, newString)).toBe(true);
  });

  test("returns false if string changed by external", () => {
    const oldString = "Here is the same headline";
    const newString = "Here is a different headline";
    expect(tweetValidator.catchNoChanges(oldString, newString)).toBe(false);
  });

  test("returns true if string not changed with different punctuation", () => {
    const oldString = "Here is the same headline";
    const newString = "Here is the same Headline";
    expect(tweetValidator.catchNoChanges(oldString, newString)).toBe(true);
  });
});

describe("catchTweetInDB", () => {
  test("returns false if string is found in DB", async () => {
    const tweet = { tweet: "in DB" };
    dbManager.insert(tweet, testCollection);
    let result;
    await tweetValidator.catchTweetInDB(tweet, testCollection, r => {
      result = r;
      expect(result).toBe(false);
    });
  });

  test("returns true if string is not found in DB", async () => {
    const tweet = { tweet: "NOT in DB" };
    let result;
    await tweetValidator.catchTweetInDB(tweet, testCollection, r => {
      result = r;
      expect(result).toBe(true);
    });
  });
});

beforeEach(() => {
  tweetValidator = new TweetValidator("testDB");
});

beforeAll(() => {
  // dbManager.createCollectionIfExists(testCollection);
});

afterAll(() => {
  // dbManager.dropCollectionIfExists(testCollection);
});
