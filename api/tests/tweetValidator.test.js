const TweetValidator = require("../src/tweetValidator");
const DatabaseManager = require("../src/DatabaseManager");
const dbManager = new DatabaseManager("testDB");
const testCollection = "testCollection";

let tweetValidator = new TweetValidator();

describe("catchBadWords", () => {
  test("returns true if bad word is found in string", () => {
    const badWord = "foo";
    const string = "Here is a headline with the word foo in it";
    expect(tweetValidator.catchBadWords(string, badWord)).toBeTruthy();
  });

  test("returns true if bad word is found with different case", () => {
    const badWord = "FOo";
    const string = "Here is a headline with the word foo in it";
    expect(tweetValidator.catchBadWords(string, badWord)).toBeTruthy();
  });

  test("returns true if bad word is not found in string", () => {
    const badWord = "foo";
    const string = "Here is a headline without the word in it";
    expect(tweetValidator.catchBadWords(string, badWord)).toBeFalsy();
  });
});

describe("catchNoChanges", () => {
  test("returns true if string not changed by external", () => {
    const oldString = "Here is the same headline";
    const newString = "Here is the same headline";
    expect(tweetValidator.catchNoChanges(oldString, newString)).toBeTruthy();
  });

  test("returns false if string changed by external", () => {
    const oldString = "Here is the same headline";
    const newString = "Here is a different headline";
    expect(tweetValidator.catchNoChanges(oldString, newString)).toBeFalsy();
  });

  test("returns true if string not changed with different punctuation", () => {
    const oldString = "Here is the same headline";
    const newString = "Here is the same Headline";
    expect(tweetValidator.catchNoChanges(oldString, newString)).toBeTruthy();
  });
});

describe("catchTweetInDB", () => {
  test("returns false if string is found in DB", async () => {
    const tweet = { tweet: "in DB" };
    dbManager.insert(tweet, testCollection);
    let result;
    await tweetValidator.catchTweetInDB(tweet, testCollection, r => {
      result = r;
      expect(result).toBeFalsy();
    });
  });

  test("returns true if string is not found in DB", async () => {
    const tweet = { tweet: "NOT in DB" };
    let result;
    await tweetValidator.catchTweetInDB(tweet, testCollection, r => {
      result = r;
      expect(result).toBeTruthy();
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
