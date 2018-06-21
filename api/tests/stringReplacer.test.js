const StringReplacer = require("../src/stringReplacer");

let stringReplacer = new StringReplacer();

test("wordWithSynonym", () => {
  expect(stringReplacer.wordWithSynonym("funny")).toBeTruthy();
});

test("wordsWithSynonyms", () => {
  expect(
    stringReplacer.wordsWithSynonyms(
      "this is a funny sentence, a man fell off the roof to the great abyss"
    )
  ).toBeTruthy();
});

beforeEach(() => {
  stringReplacer = new StringReplacer();
});
