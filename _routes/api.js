var express = require('express'),
		router = express.Router();

var mongo = require('../mongo.js');

var fs = require('fs');

var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(11);


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
			if(err)console.error(err);
			res.send('ok');
		});
	})
});

router.route('/user')
	.post((req, res)=>{
		var user = new mongo.schema.user();
		user.email = req.body.email;
		user.password =  bcrypt.hashSync(req.body.password, salt);
		user.save((err, userData)=>{
			if(err){console.error(err);}
			res.json(userData)
		})
	})
	.get((req, res)=>{
		mongo.schema.user.findOne({_id: req.query.userId}, (err, user)=>{
			// console.log(user._id.getTimestamp());
			res.json(user)
		})
	})

router.route('/users')
	.get((req, res)=>{
		mongo.schema.user.find({}, (err, users)=>{
			if(err)console.error(err);
			res.json(users)
		});
	})

router.post('/login', (req, res)=>{
	mongo.schema.user.findOne({email: req.body.email}, (err, user)=>{
		if(err){
			console.error(err);
		}else{
			bcrypt.compare(req.body.password, user.password, function(err, auth) {
				var loggedIn = 'not logged in';
				if(err)console.error(err);
				if(auth) loggedIn = 'logged in'
				res.json({auth: loggedIn});
			});
		}
	});
})



module.exports = router;
