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

router.get('/report-sent', (req, res)=>{
	res.render('email', {title: 'Report Sent'})
});

router.get('/reset-password', (req, res)=>{
	res.render('reset-password', {title: 'Reset Password'})
});

router.get('/author/:id', (req, res)=>{
	res.render('author', {title: 'Author Page',id: req.params.id})
});

router.get('/dashboard', (req, res)=>{
	if(req.session){
		res.render('dashboard', {title: 'Dashboard'});
	}else{
		res.redirect('/login');
	}
});

router.get('/dashboard/edit', (req, res)=>{
	res.render('edit', {title: 'Edit'});
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

router.get('/forum', (req, res)=>{
	res.render('forum', {title: 'Forum'})
});

router.get('/search', (req, res)=>{
	res.render('search', {title: 'Search'})
});

router.get('/admin', (req, res)=>{
	if(req.session && req.session.role > 0){
		res.render('search', {title: 'Search'})
	}
});

module.exports = router;
