var express = require('express');
var router = express.Router();

/* homepage for backend */
router.get('/', function(req, res) {
	res.json('Squad Up');
});

module.exports = router;
