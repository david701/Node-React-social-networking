const express = require('express'),
			router = express.Router(),
			fs = require('fs')

const Users = require('./models/users.js');

/// USER API ///
router.route('/users')
	.get(Users.getUsers)
	.post(Users.createUser)

router.route('/users/:id')
	.get(Users.getUserById)
	.put(Users.updateUser)
	.delete(Users.removeUser)


router.post('/login', Users.login)
router.post('/logout', Users.logout)

router.get('/user_session', Users.userSession)

router.post('/follow_author', Users.followAuthor)
/// END USER API ///



// === DEPRICATED ROUTES ===
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



module.exports = router;
