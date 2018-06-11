var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.send({ comingFromApi: true });
});

module.exports = router;
