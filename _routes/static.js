var express = require('express'),
		router = express.Router();

router.get('/', (req, res)=>{
	res.render('home', {title: 'Browse'})
});

router.get('/login', (req, res)=>{
	res.render('login', {title: 'Login'})
});

router.get('/signup', (req, res)=>{
	res.render('signup', {title: 'Sign Up'})
});

router.get('/email', (req, res)=>{
	res.render('email', {title: 'Check Email'})
});

router.get('/recover-password', (req, res)=>{
	res.render('email', {title: 'Recover Password'})
});

router.get('/password-reset', (req, res)=>{
	res.render('email', {title: 'Password Reset'})
});


router.get('/report-sent', (req, res)=>{
	res.render('email', {title: 'Report Sent'})
});

router.get('/author/:id', (req, res)=>{
	res.render('author', {title: 'Author Page',id: req.params.id})
});

router.get('/author/:id/edit', (req, res)=>{
	res.render('edit', {title: 'Author Page',id: req.params.id})
});

router.get('/author/:id/reset-password', (req, res)=>{
	res.render('reset-password', {title: 'Reset Password',id: req.params.id})
});

router.get('/dashboard', (req, res)=>{
	if(req.session){
		res.render('dashboard', {title: 'Dashboard'});
	}else{
		res.redirect('/login');
	}
});

router.get('/dashboard/edit', (req, res)=>{
	res.render('edit', {title: 'Edit', id: 0});
});

router.get('/dashboard/create', (req, res)=>{
	if(req.session){
		res.render('dashboard-create', {title: 'Create'})
	}else{
		res.redirect('/login');
	}
});

router.get('/dashboard/find-friends', (req, res)=>{
	res.render('friends', {title: 'Find Friends'});
});

router.get('/dashboard/all-users', (req, res)=>{
	res.render('friends', {title: 'All Users'});
});

router.get('/forum', (req, res)=>{
	res.render('forum', {title: 'Forum'})
});

router.get('/search', (req, res)=>{
	res.render('search', {title: 'Search'})
});

router.get('/verify', (req, res)=>{
	var token = req.query.token;
	mongoUser.findOne({token: token}, (err, user)=>{
		if(err || !user){
			req.session = null;
			res.json({status:'error', message: 'Invalid Token'});
		}else{
			if(user.status == 0){
				res.json({status:'error', message: 'This user has been removed'});
			}else{
						var userData = {
							_id: user._id.toString(),
							email: user.email,
							name: user.name,
							avatar: user.avatar,
							level: user.level,
							role: user.role,
							status: user.status
						}
						req.session = userData;
						res.redirect('/dashboard');
				};
			}
		})
});

router.get('/reset_password', (req, res)=>{
	var token = req.query.token;
	mongoUser.findOne({token: token}, (err, user)=>{
		if(err || !user){
			req.session = null;
			res.json({status:'error', message: 'Invalid Token'});
		}else{
			if(user.status == 0){
				res.json({status:'error', message: 'This user has been removed'});
			}else{
						var userData = {
							_id: user._id.toString(),
							email: user.email,
							name: user.name,
							avatar: user.avatar,
							level: user.level,
							role: user.role,
							status: user.status
						}
						req.session = userData;
						res.redirect('/author/'+userData._id+'/reset-password');
				};
			}
		})
});

router.get('/admin', (req, res)=>{
	if(req.session && req.session.role > 0){
		res.render('search', {title: 'Search'})
	}
});

module.exports = router;
