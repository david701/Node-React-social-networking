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


exports.getComments = (req,res)=>{
	mongoReview.find({book_id: req.params.id}).then((reviews)=>{
		handle.res(res, reviews)
	}).catch((err)=>{
		handle.err(res, err)
	})
	// handle.res(res)
}

exports.getCommentById = (req,res)=>{
	handle.res(res)
}

exports.addComment = (req,res)=>{
	handle.res(res)
}

exports.editComment = (req,res)=>{
	handle.res(res)
}

exports.removeComment = (req,res)=>{
	handle.res(res)
}
