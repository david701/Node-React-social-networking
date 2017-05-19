const express = require('express'),
			mongo = require('../../mongo.js'),
			async = require('async'),
			mandrill = require('mandrill-api/mandrill'),
			mandrill_client = new mandrill.Mandrill('CdbvIytAJInbYckp3pj1Jg');

const mongoUser = mongo.schema.user,
			mongoBook = mongo.schema.book,
			mongoChapter = mongo.schema.chapter,
			mongoComment = mongo.schema.comment,
			mongoReview = mongo.schema.review,
			mongoClaim = mongo.schema.claim;

const handle = require('../helpers/handle.js');


exports.getBookClaims = (req,res)=>{
	mongoComment.find({book: req.params.id}).where('status').equals(1).populate('book').populate('reporter', 'name email').then((comments)=>{
		handle.res(res, comments)
	}).catch((err)=>{
		handle.err(res, err)
	})
}

exports.addClaim = (req,res)=>{
	var user = req.session;
	var claim = {
			book: req.params.id,
			reporter: user._id,
			content: req.body.content,
		}

	var newClaim = new mongoClaim(claim);
	newClaim.save().then((claim)=>{
		handle.res(res, claim);
	}).catch((err)=>{
		handle.err(res, err.message);
	})
}
