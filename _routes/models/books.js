const express = require('express'),
			mongo = require('../../mongo.js'),
			async = require('async'),
			mandrill = require('mandrill-api/mandrill'),
			mandrill_client = new mandrill.Mandrill('CdbvIytAJInbYckp3pj1Jg');

const mongoUser = mongo.schema.user,
			mongoBook = mongo.schema.book,
			mongoChapter = mongo.schema.chapter;

exports.getBooks = (req, res)=>{
	mongoBook.find({status: 2}).then((books)=>{
		res.json({status: 'ok', data: books});
	}).catch((err)=>{
		res.json({status: 'error', message: err});
	});
}

exports.getUserBooks = (req, res)=>{
	var limit  = req.query.limit || 0;
	mongoBook.find({author: req.params.id}).where('status').gt(0).sort( [['_id', -1]] ).limit(limit).populate('author', 'name avatar').then((books)=>{
		if(!books){
			res.json({status: 'error', message: 'No books for current user'});
		}else{
			res.json({status: 'ok', data: books})
		}
	})
}

exports.getBooksById = (req, res)=>{
	mongoBook.findOne({_id: req.params.id}).then((book)=>{
		if(!book){
			res.json({status: 'error', message: 'Book does not exist.'});
		}else{
			res.json({status: 'ok', data: book})
		}
	})
}

exports.createBook = (req, res)=>{
	var user = req.session;
	if(!user){
		res.json({status:'error', message: 'Not logged in'})
		return;
	}

	var book = req.body;
	book.author = req.session._id;
	book.status = 1;

	var newBook = new mongoBook(book);
	newBook.save().then((book)=>{
		res.json({status: 'ok', data: book});
	}).catch((err)=>{
		res.json({status: 'error', message: err});
	})
}

exports.removeBook = (req, res)=>{
	var user = req.session;
	if(!user){
		res.json({status:'error', message: 'Not logged in'})
		return;
	}

	mongoBook.findOne({_id: req.params.id}).update({status: 0}).then((update)=>{
		res.json({status: 'ok', data: req.params.id})
	}).catch((err)=>{
		res.json({status: 'error', message: err});
	})
}

exports.editBook = (req, res)=>{
	var user = req.session;
	if(!user){
		res.json({status:'error', message: 'Not logged in'})
		return;
	}

	mongoBook.findOne({_id: req.params.id}).update(req.body).then((update)=>{
		res.json({status: 'ok', data: req.params.id})
	}).catch((err)=>{
		res.json({status: 'error', message: err});
	})
}

exports.addChapter = (req, res)=>{
	var book_id = req.params.id;

	if(!book_id || !req.body.number || !req.body.content || !req.body.name){
		res.json({status: 'error', message: 'Missing parameters'})
	}else{
		mongoChapter.findOne({number: req.body.number}).then((chapter)=>{
			if(chapter){
				res.json({status:'error', message: 'Chapter number already exists'});
			}else{
				var chapterInfo = {
					book_id: book_id,
					number: parseInt(req.body.number),
					name: req.body.name,
					content: req.body.content,
					status: 1
				}
				var chapter = new mongoChapter(chapterInfo);
				chapter.save().then((chapter)=>{
					res.json({status: 'ok', data: chapter});
				})
			}
		}).catch(function(err){
			res.json({status:'error', message: err});
		});
	}
}

exports.getChapters = (req, res)=>{
	var book_id = req.params.id;
	mongoChapter.find({_id: book_id}).sort('number').then((chapters)=>{
		res.json({status: 'ok', data: chapters})
	}).catch(function(err){
		res.json({status: 'ok', message: err})
	})
}

exports.getChapterByNumber = (req, res)=>{
	var book_id = req.params.id,
			number = parseInt(req.params.number);

	mongoChapter.findOne({_id: book_id}).where('number').equals(number).then((chapter)=>{
		res.json({status: 'ok', data: chapter})
	}).catch(function(err){
		res.json({status: 'ok', message: err})
	})
}

exports.editChapter = (req, res)=>{
	var book_id = req.params.id,
			number = parseInt(req.params.number);

	mongoChapter.findOne({_id: book_id}).where('number').equals(number).then((chapter)=>{
		if(!chapter){
			res.json({status:'error', message: 'Chapter does not exist'});
		}else{

			if(req.body.name) chapter.name = req.body.name;
			if(req.body.content) chapter.content = req.body.content;
			if(req.body.status) chapter.status = req.body.status;

			chapter.save().then(function(chapter){
				res.json({status: 'ok', data: chapter})
			}).catch(function(err){
				res.json({status: 'ok', message: err})
			})
		}
	}).catch(function(err){
		res.json({status: 'ok', message: err})
	})
}

exports.deleteChapter = (req, res)=>{
	var book_id = req.params.id,
			number = parseInt(req.params.number);
	mongoChapter.findOne({_id: book_id}).where('number').equals(number).then((chapter)=>{
		if(!chapter){
			res.json({status:'error', message: 'Chapter does not exist'});
		}else{
			chapter.status = 0;
			chapter.save().then(function(chapter){
				res.json({status: 'ok', data: chapter})
			}).catch(function(err){
				res.json({status: 'ok', message: err})
			})
		}
	}).catch(function(err){
		res.json({status: 'ok', message: err})
	})
}
