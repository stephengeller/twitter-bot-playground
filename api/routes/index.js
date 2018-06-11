var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
	let url = 'https://jsonplaceholder.typicode.com/posts';
	axios.get(url).then(r => {
		const message = r.data[0].title;
		console.log(message);
		res.send({ comingFromApi: message });
	});
});

module.exports = router;
