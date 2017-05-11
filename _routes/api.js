const express = require('express'),
			router = express.Router(),
			fs = require('fs')

const Users = require('./models/users.js'),
			Books = require('./models/books.js'),
			Reviews = require('./models/reviews.js'),
			Comments = require('./models/comments.js');

/// USER API ///
router.route('/users')
	.get(Users.getUsers)
	.post(Users.createUser)

router.route('/users/:id')
	.get(Users.getUserById)
	.put(Users.updateUser)
	.delete(Users.removeUser)


router.post('/login', Users.login)
router.get('/logout', Users.logout)

router.get('/user_session', Users.userSession)

router.post('/follow_author', Users.followAuthor)
router.post('/unfollow_author', Users.unfollowAuthor)

router.post('/reset_request', Users.resetRequest)
router.post('/reset_auth', Users.resetTokenAuth)
router.post('/reset_password', Users.resetPassword)

router.post('/reports', Users.reports)
/// END USER API ///


/// BOOKS API ///

router.route('/books')
	.get(Books.getBooks)
	.post(Books.createBook)

router.route('/books/:id')
	.get(Books.getBooksById)
	.put(Books.editBook)
	.delete(Books.removeBook)

router.route('/users/:id/books')
	.get(Books.getUserBooks)

router.route('/books/:id/chapters')
	.post(Books.addChapter)
	.get(Books.getChapters)

router.route('/books/:id/chapters/:number')
	.get(Books.getChapterByNumber)
	.put(Books.editChapter)
	.delete(Books.deleteChapter)

/// END BOOKS API ///


/// REVIEWS API ///
router.route('/book/:id/reviews')
	.get(Reviews.getReviews)
	.post(Reviews.addReview)

router.route('/reviews/:id')
	.get(Reviews.getReviewById)
	.put(Reviews.editReview)
	.delete(Reviews.removeReview)
/// END REVIEWS API ///


/// COMMENTS API ///
router.route('/chapter/:id/comments')
	.get(Comments.getComments)
	.post(Comments.addComment)

router.route('/comments/:id')
	.get(Comments.getCommentById)
	.put(Comments.editComment)
	.delete(Comments.removeComment)
/// END COMMENTS API ///



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
