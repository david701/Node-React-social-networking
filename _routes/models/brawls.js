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
			mongoBrawl = mongo.schema.brawl;

const handle = require('../helpers/handle.js');

exports.getBrawls = (req, res)=>{
	var limit = parseInt(req.query.limit) || 0;
	mongoBrawl.find({}).limit(limit)
	.populate({
		path: 'book_a',
		select:'title cover rating author',
		populate: {
			path: 'author',
			model: 'Users',
			select: 'name email avatar'
		}
	})
	.populate({
		path: 'book_b',
		select:'title cover rating author',
		populate: {
			path: 'author',
			model: 'Users',
			select: 'name email avatar'
		}
	})
	.then((brawls)=>{
		mongoBrawl.find({}).count().then((count)=>{
			handle.res(res, brawls, count)
		})
	}).catch(err=>{
		handle.err(res, err)
	})
}

exports.getBrawlById = (req, res)=>{
	mongoBrawl.findOne({_id: req.params.id})
	.populate({
		path: 'book_a',
		select:'title cover rating author',
		populate: {
			path: 'author',
			model: 'Users',
			select: 'name email avatar'
		}
	})
	.populate({
	 	path: 'book_b',
		select:'title cover rating author',
		populate: {
			path: 'author',
			model: 'Users',
		 select: 'name email avatar'
		}
	})
	.then((brawl)=>{
		handle.res(res, brawl)
	}).catch(err=>{
		handle.err(res, err)
	})
}

exports.newBrawl = (req, res)=>{
	var brawl = {
		book_a: req.body.book_a,
		book_b: req.body.book_b,
		status: req.body.status || 1
	}

	brawl = new mongoBrawl(brawl);
	brawl.save().then((brawl)=>{
		handle.res(res, brawl);
	}).catch(err=>{
		handle.err(res, err);
	})
}

exports.editBrawl = (req, res)=>{
	var user;
	if(req.session && req.session._id){
		user = req.session;
	}
	if(!user){
		handle.err(res, 'Not Logged In')
	}
	mongoBrawl.findOne({_id: req.params.id})
	.then((brawl)=>{
		if(req.body.vote && user){
			if(user.role > 1){
				if(req.body.status) brawl.status = parseInt(req.body.status);
			}
			if(brawl.status == 2){
				if(req.body.vote == brawl.book_a.toString()) {
					brawl.book_a_vote = brawl.book_a_vote + 1;
				}
				if(req.body.vote == brawl.book_b.toString()){
					brawl.book_b_vote = brawl.book_b_vote + 1;
				}
				brawl.voters.push(user._id)
			}
			brawl.updated_at = new Date();
		}
		brawl.save().then((brawl)=>{
			handle.res(res, brawl)
		})
	}).catch(err=>{
		handle.err(res, err)
	})
}
