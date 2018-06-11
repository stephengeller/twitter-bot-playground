const Twit = require("twit");
const axios = require("axios");

const bot = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000
});

let idiots = [
  "Max",
  "Pie",
  "Ollie",
  "Joel",
  "Billy",
  "Pob",
  "Ricky",
  "Tom",
  "Rufus",
  "Poiters"
];

let idiot = idiots[Math.floor(Math.random() * idiots.length)];
let url = "http://localhost:3000/insult";

function postToTwitter(message) {
  bot.post("statuses/update", { status: message }, (err, data, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data.text + " was tweeted");
    }
  });
}

axios
  .get(url)
  .then(r => {
    const post = `${idiot} is ${r.data.comingFromApi}`;
    postToTwitter(post);
  })
  .catch(err => console.log(err));
