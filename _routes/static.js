var express = require('express'),
		router = express.Router();

router.get('/', (req, res)=>{
	res.render('home', {title: 'Home'})
});

module.exports = router;
