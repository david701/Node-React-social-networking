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
					res.json({status:'ok', data: userInfo})
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
			res.json({status:'ok', data: user})
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
			res.json({status:'ok', data: user})
		}
	})
}

/// UPDATE SINGLE USER
exports.updateUser = (req, res)=>{
	if(!req.session){
		res.json({status:'error', message: 'Not logged in'})
		return;
	}
	mongoUser.findOne({_id: req.params.id})
		.then((user)=>{
			if(req.body.password) delete req.body['password'];
			user.update(req.body)
				.then((userUpdate)=>{
					res.json({status: 'ok', data: userUpdate});
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
	if(!req.session){
		res.json({status:'error', message: 'Not logged in'})
		return;
	}
	mongoUser.findOne({_id: req.params.id})
		.then((user)=>{
			user.update({status: 0})
				.then((userUpdate)=>{
					// TODO: SOFT REMOVE BOOKS
					// TODO: SOFT REMOVE COMMENTS
					// TODO: SOFT REMOVE REVIEWS
					// TODO: REMOVE FOLLOWS
					// TODO: REMOVE FOLLOWER
					res.json({status: 'ok', data: req.params.id});
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
		if(err || !user){
			console.error(err);
			req.session = null;
			res.json({status:'error', message: 'Invalid Username or Password'});
		}else{
			bcrypt.compare(req.body.password, user.password, function(err, auth) {
				if(auth){
					var userData = {
						_id: user._id.toString(),
						email: user.email,
						name: user.name,
						avatar: user.avatar,
						level: user.level,
						role: user.role,
						status: user.status
					}
					req.session = userData;
					res.json({status: 'ok'});
				}else{
					req.session = null;
					res.json({status:'error', message: 'Invalid Username or Password'});
				}
			});
		}
	});
}

/// USER LOGOUT
exports.logout = (req, res)=>{
	req.session = null;
	res.json({status: 'ok'});
}

/// USER SESSION INFO
exports.userSession = (req, res)=>{
	if(!req.session){
		res.json({status:'error', message: 'Not logged in'})
		return;
	}
	var session = req.session;
	res.json({status: 'ok', data: session})
}

/// USER FOLLOW AUTHOR
exports.followAuthor = (req, res)=>{
	var user = req.session
	if(user && user._id){
		mongoUser.findOne({_id: user._id}).then((userInfo)=>{
			var following = userInfo.following_authors;
			if(following.indexOf(req.body.authorId) == -1){
				following.push(req.body.authorId)
				userInfo.update({following_authors: following}).then((update)=>{
					res.json({status: 'ok', data: update});
				})
			}else{
				res.json({status: 'error', message: 'Already following'});
			}
		});
	}else{
		res.json({status: 'error', message: 'Not logged in'});
	}
}
