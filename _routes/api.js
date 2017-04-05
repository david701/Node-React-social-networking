var express = require('express'),
		router = express.Router();

var fs = require('fs');

router.get('/mybooks', (req, res)=>{
	fs.readFile('./mybooks.json',function(err,data){
		obj = JSON.parse(data);
		res.json(obj.books);
	})
});

router.post('/mybooks', (req, res)=>{
	fs.readFile('./mybooks.json',function(err,data){
		obj = JSON.parse(data);
		obj.books.push(req.body);
		fs.writeFile('./mybooks.json', JSON.stringify(obj), 'utf8', function(err){
			if(err)console.log(err);
			res.send('ok');
		});
	})
});


module.exports = router;
