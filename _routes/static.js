var express = require('express'),
		router = express.Router();

router.get('/', (req, res)=>{
	res.render('home', {title: ''})
});

router.get('/login', (req, res)=>{
	res.render('login', {title: 'Login'})
});

router.get('/signup', (req, res)=>{
	res.render('signup', {title: 'Sign Up'})
});

router.get('/author', (req, res)=>{
	res.render('author', {title: 'Author Page'})
});

router.get('/dashboard', (req, res)=>{
	res.render('dashboard', {title: 'Dashboard'})
});

router.get('/dashboard/create', (req, res)=>{
	res.render('dashboard-create', {title: 'Create'})
});

router.get('/forum', (req, res)=>{
	res.render('forum', {title: 'Forum'})
});

router.get('/search', (req, res)=>{
	res.render('search', {title: 'Search'})
});

module.exports = router;
