var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res) {
	let url = 'https://jsonplaceholder.typicode.com/posts';
	axios.get(url).then(r => {
		const message = r.data[0].title;
		res.send({ message: message });
	});
});

router.get('/insult', function(req, res) {
	let idiots = [
		'Max',
		'Pie',
		'Ollie',
		'Joel',
		'Billy',
		'Pob',
		'Ricky',
		'Tom',
		'Rufus',
		'Poiters'
	];
	let idiot = randomise(idiots);
	let url = 'https://insult.mattbas.org/api/adjective/json';
	axios.get(url).then(r => {
		const message = `${idiot} is ${r.data}`;
		console.log(`${message} was sent`);
		res.send({ message: message });
	});
});

router.get('/date', function(req, res) {
	const date = new Date().toISOString();
	const message = `The time is: ${date}`;
	res.send({ message: message });
});

const randomise = arr => {
	return arr[Math.floor(Math.random() * arr.length)];
};

module.exports = router;
