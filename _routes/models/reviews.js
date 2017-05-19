const express = require('express'),
			mongo = require('../../mongo.js'),
			async = require('async'),
			mandrill = require('mandrill-api/mandrill'),
			mandrill_client = new mandrill.Mandrill('CdbvIytAJInbYckp3pj1Jg');

const mongoUser = mongo.schema.user,
			mongoBook = mongo.schema.book,
			mongoChapter = mongo.schema.chapter,
			mongoComment = mongo.schema.comment,
			mongoReview = mongo.schema.review;

const handle = require('../helpers/handle.js');

exports.getReviews = (req,res)=>{
	var status = req.query.status || 1;
	mongoReview.find({book_id: req.params.id}).where('status').equals(status).populate('author', 'name').then((reviews)=>{
		handle.res(res, reviews)
	}).catch((err)=>{
		handle.err(res, err)
	})
}

exports.getReviewById = (req,res)=>{
	mongoReview.findOne({_id: req.params.id}).populate('author', 'name').then((review)=>{
		handle.res(res, review)
	}).catch((err)=>{
		handle.err(res, err)
	})
}

exports.addReview = (req,res)=>{
	var user = req.session;
	var review = {
			author: user._id,
			book_id: req.params.id,
			content: req.body.content,
			rating: req.body.rating || 0,
			status: 1
		}

	var newReview = new mongoReview(review);
	newReview.save().then((review)=>{
		handle.res(res, review);
	}).catch((err)=>{
		handle.err(res, err.message);
	})

}

exports.editReview = (req,res)=>{
	mongoReview.findOne({_id: req.params.id}).then((review)=>{
		if(!review){
			handle.err(res, 'No review with this ID')
		}
		review.update(req.body).then((update)=>{
			hackndle.res(res)
		}).catch(err=>{
			handle.err(res, err.message)
		})
	}).catch(err=>{
		handle.err(res, err.message)
	})
}

exports.removeReview = (req,res)=>{
	mongoReview.findOne({_id: req.params.id}).then((review)=>{
		if(!review){
			handle.err(res, 'No review with this ID')
		}
		review.update({status: 0}).then((update)=>{
			handle.res(res)
		}).catch(err=>{
			handle.err(res, err.message)
		})
	}).catch(err=>{
		handle.err(res, err.message)
	})
}
