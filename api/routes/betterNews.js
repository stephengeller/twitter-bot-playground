var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res) {
	res.send({ message: 'better news' });
});

const replaceWordInString = (string, oldWord, newWord) => {
	return string.replace(oldWord, newWord);
};

module.exports = router;
