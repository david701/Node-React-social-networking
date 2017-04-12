const express = require('express'),
			mongo = require('../../mongo.js'),
			bcrypt = require('bcrypt'),
			salt = bcrypt.genSaltSync(11);

const mongoUser = mongo.schema.user;

//// GET USERS LIST
exports.getUsers = (req, res) => {
	var limit = req.query.limit || 0,
			skip = req.query.skip || 0,
			query = {},
			sort = {};

	var query = mongoUser.find(query).limit(limit).skip(skip).sort(sort).exec();

	query.then((users)=>{
		res.json({status:'ok', data:users});
	})
	.catch(function(err){
	 res.json({status:'error', message: err});
	});
};

//// CREATE NEW USER
exports.createUser = (req, res)=>{
	mongoUser.findOne({email: req.body.email}).then((user)=>{
			if(!user){
				var userData = req.body
				userData.password =  bcrypt.hashSync(req.body.password, salt);
				userData.role = 1;
				userData.level = 0;
				userData.status = 1;

				var user = new mongoUser(userData);
				user.save((err, userInfo)=>{
					if(err){console.error(err);}
					res.json(userInfo)
				})
			}else{
				res.json({status:'error', message:'Email is already in use.'});
			}
		})
		.catch((err)=>{
			res.json({status:'error', message: err});
		})
}

/// GET SINGLE USER BY ID
exports.getUserById = (req, res)=>{
	mongoUser.findOne({_id: req.params.id})
		.then((user)=>{
			res.json(user)
		})
		.catch((err)=>{
			res.json({status:'error', message: err.message});
		})
}
/// GET SINGLE USER BY EMAIL
exports.getUserByEmail = (req, res)=>{
	mongoUser.findOne({email: req.query.email}, (err, user)=>{
		if(err){
			res.json({status:'error', message: err});
		}else{
			res.json(user)
		}
	})
}

/// UPDATE SINGLE USER
exports.updateUser = (req, res)=>{
	mongoUser.findOne({_id: req.params.id})
		.then((user)=>{
			user.update(req.body)
				.then((userUpdate)=>{
					res.json({status: 'ok', update: userUpdate});
				})
				.catch((err)=>{
					res.json({status: 'error', message: err.message})
				})
		})
		.catch((err)=>{
			res.json({status: 'error', message: err.message})
		})
}

/// SOFT REMOVE SINGLE USER
exports.removeUser = (req, res)=>{
	mongoUser.findOne({_id: req.params.id})
		.then((user)=>{
			user.update({status: 0})
				.then((userUpdate)=>{
					// TODO: SOFT REMOVE BOOKS
					// TODO: SOFT REMOVE COMMENTS
					// TODO: SOFT REMOVE REVIEWS
					// TODO: REMOVE FOLLOWS
					// TODO: REMOVE FOLLOWER
					res.json({status: 'removed', user: req.params.id});
				})
				.catch((err)=>{
					res.json({status: 'error', message: err.message})
				})
		})
		.catch((err)=>{
			res.json({status: 'error', message: err.message})
		})
}

/// USER LOGIN
exports.login = (req, res)=>{
	mongoUser.findOne({email: req.body.email}, (err, user)=>{
		if(err){
			console.error(err);
		}else{
			bcrypt.compare(req.body.password, user.password, function(err, auth) {
				var loggedIn = 'not logged in';
				if(err)console.error(err);
				if(auth) loggedIn = 'logged in'
				res.json({auth: loggedIn});
			});
		}
	});
}
