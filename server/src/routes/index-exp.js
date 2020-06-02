var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json({
		state: 0,
		msg: 'Express success'
	});
	res.end('/ req end');
});

module.exports = router;