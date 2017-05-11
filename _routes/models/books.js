const express = require('express'),
			mongo = require('../../mongo.js'),
			async = require('async'),
			mandrill = require('mandrill-api/mandrill'),
			mandrill_client = new mandrill.Mandrill('CdbvIytAJInbYckp3pj1Jg');

const mongoUser = mongo.schema.user,
			mongoBook = mongo.schema.book,
			mongoChapter = mongo.schema.chapter;

const handle = require('../helpers/handle.js');

exports.getBooks = (req, res)=>{
	var status = req.query.status || 2;
	mongoBook.find({status: status}).then((books)=>{
		handle.res(res, books)
	}).catch((err)=>{
		handle.err(res, err)
	});
}

exports.getUserBooks = (req, res)=>{
	var limit  = req.query.limit || 0;
	mongoBook.find({author: req.params.id}).where('status').gt(0).sort( [['_id', -1]] ).limit(limit).populate('author', 'name avatar').then((books)=>{
		if(!books){
			handle.err(res, 'No books for current user');
		}else{
			handle.res(res, books)
		}
	})
}

exports.getBooksById = (req, res)=>{
	mongoBook.findOne({_id: req.params.id}).populate('author', 'avatar name').then((book)=>{
		if(!book){
			handle.err(res, 'Book does not exist.');
		}else{
			handle.res(res, book)
		}
	})
}

exports.createBook = (req, res)=>{
	var user = req.session;
	if(!user){
		handle.err(res, 'Not logged in');
		return;
	}

	var book = req.body;
	book.author = req.session._id;
	book.status = 1;

	var newBook = new mongoBook(book);
	newBook.save().then((book)=>{
		handle.res(res, book)
	}).catch((err)=>{
		handle.err(res, err);
	})
}

exports.removeBook = (req, res)=>{
	var user = req.session;
	if(!user){
		handle.err(res, 'Not logged in');
		return;
	}

	mongoBook.findOne({_id: req.params.id}).update({status: 0}).then((update)=>{
		handle.res(res, req.params.id)
	}).catch((err)=>{
		handle.err(res, err);
	})
}

exports.editBook = (req, res)=>{
	var user = req.session;
	if(!user){
		handle.err(res, 'Not logged in');
		return;
	}

	mongoBook.findOne({_id: req.params.id}).update(req.body).then((update)=>{
		handle.res(res, req.params.id)
	}).catch((err)=>{
		handle.err(res, err);
	})
}

exports.addChapter = (req, res)=>{
	var book_id = req.params.id;

	if(!book_id || !req.body.number || !req.body.content || !req.body.name){
		handle.err(res, 'Missing parameters')
	}else{
		mongoChapter.findOne({book_id: book_id}).where('number').equals(parseInt(req.body.number)).then((chapter)=>{
			if(chapter){
				handle.err(res, 'Chapter number already exists');
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
					handle.res(res, chapter);
				})
			}
		}).catch(function(err){
			handle.err(res, err);
		});
	}
}

exports.getChapters = (req, res)=>{
	var book_id = req.params.id;
	mongoChapter.find({book_id: book_id}).sort('number').then((chapters)=>{
		handle.res(res, chapters)
	}).catch(function(err){
		handle.err(res, err)
	})
}

exports.getChapterByNumber = (req, res)=>{
	var book_id = req.params.id,
			number = parseInt(req.params.number);

	mongoChapter.findOne({book_id: book_id}).where('number').equals(number).then((chapter)=>{
		handle.res(res, chapter)
	}).catch(function(err){
		handle.err(res, err)
	})
}

exports.editChapter = (req, res)=>{
	var book_id = req.params.id,
			number = parseInt(req.params.number);

	mongoChapter.findOne({book_id: book_id}).where('number').equals(number).then((chapter)=>{
		if(!chapter){
			handle.err(res, 'Chapter does not exist');
		}else{

			if(req.body.name) chapter.name = req.body.name;
			if(req.body.content) chapter.content = req.body.content;
			if(req.body.status) chapter.status = req.body.status;

			chapter.save().then(function(chapter){
				handle.res(res, chapter)
			}).catch(function(err){
				handle.err(res, err)
			})
		}
	}).catch(function(err){
		handle.err(res, err)
	})
}

exports.deleteChapter = (req, res)=>{
	var book_id = req.params.id,
			number = parseInt(req.params.number);
	mongoChapter.findOne({book_id: book_id}).where('number').equals(number).then((chapter)=>{
		if(!chapter){
			handle.err(res, 'Chapter does not exist');
		}else{
			chapter.status = 0;
			chapter.save().then(function(chapter){
				handle.res(res, chapter)
			}).catch(function(err){
				handle.err(res, err)
			})
		}
	}).catch(function(err){
		handle.err(res, err)
	})
}
