const express = require('express'),
			mongo = require('../../mongo.js'),
			async = require('async'),
			bcrypt = require('bcrypt'),
			salt = bcrypt.genSaltSync(11),
			mandrill = require('mandrill-api/mandrill'),
			mandrill_client = new mandrill.Mandrill('CdbvIytAJInbYckp3pj1Jg');

const mongoUser = mongo.schema.user;

const makeToken = ()=>{
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for( var i=0; i < 12; i++ )
				text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
}

const sendEmail = (template, subject, options, email, cb)=>{
	var template_content = [];
	var replyTo = options.replyTo || "info@bookbrawl.com";
	var render = options.render || 'mailchimp';
	var message = {
	    "subject": subject,
	    "from_email": "info@bookbrawl.com",
	    "from_name": "Book Brawl",
			"merge_language": render,
	    "to": [{
	            "email": email,
	            "type": "to"
	        }],
	    "headers": {
	        "Reply-To": replyTo,
					"X-MC-MergeLanguage": render
	    },
	    "merge_vars": [{
	            "rcpt": email,
							"vars": options.vars
	        }],
	};
		mandrill_client.messages.sendTemplate({"template_name": template, "template_content": template_content, "message": message}, function(result) {
			cb(null, result);
		}, function(e) {
			cb('A mandrill error occurred: ' + e.name + ' - ' + e.message);
		});
}



//// GET USERS LIST
exports.getUsers = (req, res) => {
	var limit = parseInt(req.query.limit) || 0,
			skip = parseInt(req.query.skip) || 0,
			query = {},
			sort = {};

	var query = mongoUser.find(query).where('status').gt(0).limit(limit).skip(skip).sort(sort).exec();

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
				userData.role = 0;
				userData.level = 0;
				userData.status = 1;

				var user = new mongoUser(userData);
				user.save((err, userInfo)=>{
					if(err){console.error(err);}
					var link = req.protocol + '://' + req.get('host')+'/verify?token='+ makeToken();
					var vars = [{name:'verify_link', content: link}]
					sendEmail('Verify Email', 'Verify Book Brawl Email', {vars: vars}, userInfo.email, (err, resp)=>{
						res.json({status:'ok', data: userInfo})
					})
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
	mongoUser.findOne({_id: req.params.id}).populate('following_authors', 'name avatar').populate('followers', 'name avatar')
		.then((user)=>{
			if(user.status > 0){
				res.json({status:'ok', data: user})
			}else{
				res.json({status:'error', message: 'User has been removed'});
			}
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
			if(user.status > 0){
				res.json({status:'ok', data: user})
			}else{
				res.json({status:'error', message: 'User has been removed'});
			}
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
					// mongoUser.find({followers: req.params.id}).then((follow)=>{
							// async.each(follow, (item, cb)=>{
							//
							// })
					// 	if(follow){
					// 		follow.followers.remove(req.params.id);
					// 		follow.save();
					// 	}
					// 	mongoUser.find({following_authors: req.params.id}).then((author)=>{
					// 		if(author){
					// 			author.following_authors.remove(req.params.id);
					// 			author.save();
					// 		}
					// 	})
					// }).catch((err)=>{
					// 	res.json({status: 'error', message: err.message})
					// })
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
			if(user.status == 0){
				res.json({status:'error', message: 'This user has been removed'});
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
		}
	});
}

/// USER LOGOUT
exports.logout = (req, res)=>{
	req.session = null;
	res.json({status: 'ok'});
}

/// PASSWORD RESET

exports.resetRequest = (req, res)=>{
	mongoUser.findOne({email: req.body.email}).then((user)=>{
		if(!user){
			res.json({status:'error', message: 'Email not on file.'});
		}else{
			var date = new Date(),
					token = makeToken();
					var link = req.protocol + '://' + req.get('host')+'/reset_password?token='+token;
			user.update({token: token, reset_request: date}, (err, update)=>{
				if(err){
					res.json({status:'error', message: err});
				}else{
					var vars =[{name: 'verify_link', content: link}]
					sendEmail('Reset Password', 'Book Brawl Reset Password Request', {vars: vars}, user.email, (err, resp)=>{
						res.json({status:'ok', data: user._id})
					})
				}
			})
		}
	}).catch((err)=>{
		res.json({status:'error', message: err});
	});
}

exports.resetTokenAuth = (req, res)=>{
	mongoUser.findOne({token: token}).then((user)=>{
		var userData = {_id: user._id.toString(), email: user.email};
		res.json({status: 'ok', data: userData});
	}).catch((err)=>{
		res.json({status:'error', message: err});
	})
}

exports.resetPassword = (req, res)=>{
	mongoUser.findOne({_id: req.body.userId}, (err, user)=>{
		if(err){
			res.json({status:'error', message: err});
			return;
		}

		var password = bcrypt.hashSync(req.body.password, salt);

		user.update({password: password}).then((update)=>{
			res.json({status: 'ok', data: update});
		}).catch((err)=>{
			res.json({status: 'error', message: err.message});
		})

	});

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
					mongoUser.findOne({_id: req.body.authorId}).then((autherInfo)=>{
						var followed = autherInfo.followers;
						if(followed.indexOf(userInfo._id.toString()) == -1){
							followed.push(userInfo._id.toString());
							autherInfo.update({followers: followed}).then((update)=>{
								res.json({status: 'ok', data: update});
							}).catch((err)=>{
								res.json({status: 'error', message: err.message})
							})
						}else{
							res.json({status: 'error', message: 'Already following'});
						}
					})
				})
			}else{
				res.json({status: 'error', message: 'Already following'});
			}
		})
		.catch((err)=>{
			res.json({status: 'error', message: err.message})
		})
		;
	}else{
		res.json({status: 'error', message: 'Not logged in'});
	}
}

// USER UNFOLLOW AUTHOR
exports.unfollowAuthor = (req, res)=>{
	var user = req.session;
	if(user && user._id){
		mongoUser.findOne({_id: user._id}).then((user)=>{
			user.following_authors.remove(req.body.authorId);
			user.save().then(()=>{
				mongoUser.findOne({_id: req.body.authorId}).then((author)=>{
					author.followers.remove(user._id)
					author.save().then(()=>{
						res.json({status: 'ok'})
					}).catch((err)=>{
						res.json({status: 'error', message: err.message})
					})
				});
			}).catch((err)=>{
				res.json({status: 'error', message: err.message})
			});
		}).catch((err)=>{
			res.json({status: 'error', message: err.message})
		})
	}else{
		res.json({status: 'error', message: 'Not logged in'});
	}
}

exports.reports = (req, res)=>{
	var user = req.session;
	if(!user){
		res.json({status:'error', message: 'Not logged in'})
		return;
	}else{
		var vars = [{name: 'content', content: req.body.message}, {name:'email', content: user.email}];
		sendEmail('Report', 'Book Brawl Report Submitted', {vars: vars}, 'ericka@elonandcompany.com', (err, resp)=>{
			if(!err){
				res.json({status: 'ok'})
			}else{
				res.json({status: 'error', message: err});
			}
		});
	}
}
