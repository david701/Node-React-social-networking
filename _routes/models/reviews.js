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
	mongoReview.find({book_id: req.params.id}).then((reviews)=>{
		handle.res(res, reviews)
	}).catch((err)=>{
		handle.err(res, err)
	})
}

exports.getReviewById = (req,res)=>{
	mongoReview.findOne({_id: req.params.id}).then((review)=>{
		handle.res(res, review)
	}).catch((err)=>{
		handle.err(res, err)
	})
}

exports.addReview = (req,res)=>{
	handle.res(res)
}

exports.editReview = (req,res)=>{
	handle.res(res)
}

exports.removeReview = (req,res)=>{
	handle.res(res)
}
