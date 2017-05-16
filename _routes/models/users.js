const express = require('express'),
			mongo = require('../../mongo.js'),
			async = require('async'),
			bcrypt = require('bcrypt'),
			salt = bcrypt.genSaltSync(11),
			mandrill = require('mandrill-api/mandrill'),
			mandrill_client = new mandrill.Mandrill('CdbvIytAJInbYckp3pj1Jg');

const mongoUser = mongo.schema.user;

const handle = require('../helpers/handle.js');

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
		handle.res(res, users);
	})
	.catch(function(err){
	 handle.err(res, err);
	});
};

//// CREATE NEW USER
exports.createUser = (req, res)=>{
	mongoUser.findOne({email: req.body.email}).then((user)=>{
			if(!user){
				var token = makeToken();
				var userData = req.body
				userData.password =  bcrypt.hashSync(req.body.password, salt);
				userData.role = 0;
				userData.level = 0;
				userData.status = 1;
				userData.token = token;
				var user = new mongoUser(userData);
				user.save((err, userInfo)=>{
					if(err){console.error(err);}
					var link = req.protocol + '://' + req.get('host')+'/verify?token='+ token;
					var vars = [{name:'verify_link', content: link}]
					sendEmail('Verify Email', 'Verify Book Brawl Email', {vars: vars}, userInfo.email, (err, resp)=>{
						handle.res(res, userInfo)
					})
				})
			}else{
				handle.err(res, 'Email is already in use.');
			}
		})
		.catch((err)=>{
			handle.err(res, err);
		})
}

/// GET SINGLE USER BY ID
exports.getUserById = (req, res)=>{
	mongoUser.findOne({_id: req.params.id}).populate('following_authors', 'name avatar').populate('followers', 'name avatar').populate('following_books')
		.then((user)=>{
			if(user.status > 0){
				handle.res(res, user)
			}else{
				handle.err(res, 'User has been removed');
			}
		})
		.catch((err)=>{
			handle.err(res, err.message);
		})
}
/// GET SINGLE USER BY EMAIL
exports.getUserByEmail = (req, res)=>{
	mongoUser.findOne({email: req.query.email}, (err, user)=>{
		if(err){
			handle.err(res, err);
		}else{
			if(user.status > 0){
				handle.res(res, user)
			}else{
				handle.err(res, 'User has been removed');
			}
		}
	})
}

/// UPDATE SINGLE USER
exports.updateUser = (req, res)=>{
	if(!req.session){
		handle.err(res, 'Not logged in')
		return;
	}
	mongoUser.findOne({_id: req.params.id})
		.then((user)=>{
			if(req.body.password) delete req.body['password'];
			user.update(req.body)
				.then((userUpdate)=>{
					mongoUser.findOne({_id: req.params.id}).then((user)=>{
						delete user.password;
						handle.res(res, user);
					})
				})
				.catch((err)=>{
					handle.err(res, err.message)
				})
		})
		.catch((err)=>{
			handle.err(res, err.message)
		})
}

/// SOFT REMOVE SINGLE USER
exports.removeUser = (req, res)=>{
	if(!req.session){
		handle.err(res, 'Not logged in')
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
					handle.res(res, req.params.id);
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
					// 	handle.err(res, err.message)
					// })
				})
				.catch((err)=>{
					handle.err(res, err.message)
				})
		})
		.catch((err)=>{
			handle.err(res, err.message)
		})
}

/// USER LOGIN
exports.login = (req, res)=>{
	mongoUser.findOne({email: req.body.email}, (err, user)=>{
		if(err || !user){
			console.error(err);
			req.session = null;
			handle.err(res, 'Invalid Username or Password');
		}else{
			if(user.status == 0){
				handle.err(res, 'This user has been removed');
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
						handle.res(res, user._id.toString());
					}else{
						req.session = null;
						handle.err(res, 'Invalid Username or Password');
					}
				});
			}
		}
	});
}

/// USER LOGOUT
exports.logout = (req, res)=>{
	req.session = null;
	handle.res(res);
}

/// PASSWORD RESET

exports.resetRequest = (req, res)=>{
	mongoUser.findOne({email: req.body.email}).then((user)=>{
		if(!user){
			handle.err(res, 'Email not on file.');
		}else{
			var date = new Date(),
					token = makeToken();
					var link = req.protocol + '://' + req.get('host')+'/reset_password?token='+token;
			user.update({token: token, reset_request: date}, (err, update)=>{
				if(err){
					handle.err(res, err);
				}else{
					var vars =[{name: 'verify_link', content: link}]
					sendEmail('Reset Password', 'Book Brawl Reset Password Request', {vars: vars}, user.email, (err, resp)=>{
						handle.res(res, user._id)
					})
				}
			})
		}
	}).catch((err)=>{
		handle.err(res, err);
	});
}

exports.resetTokenAuth = (req, res)=>{
	mongoUser.findOne({token: token}).then((user)=>{
		var userData = {_id: user._id.toString(), email: user.email};
		handle.res(res, userData);
	}).catch((err)=>{
		handle.err(res, err);
	})
}

exports.resetPassword = (req, res)=>{
	mongoUser.findOne({_id: req.body.userId}, (err, user)=>{
		if(err){
			handle.err(res, err);
			return;
		}

		var password = bcrypt.hashSync(req.body.password, salt);

		user.update({password: password}).then((update)=>{
			handle.res(res, req.body.userId);
		}).catch((err)=>{
			handle.err(res, err.message);
		})

	});

}


/// USER SESSION INFO
exports.userSession = (req, res)=>{
	if(!req.session){
		handle.err(res, 'Not logged in')
		return;
	}
	var session = req.session;
	handle.res(res, session)
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
								handle.res(res, req.body.authorId);
							}).catch((err)=>{
								handle.err(res, err.message)
							})
						}else{
							handle.err(res, 'Already following');
						}
					})
				})
			}else{
				handle.err(res, 'Already following');
			}
		})
		.catch((err)=>{
			handle.err(res, err.message)
		})
		;
	}else{
		handle.err(res, 'Not logged in');
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
						handle.res(res)
					}).catch((err)=>{
						handle.err(res, err.message)
					})
				});
			}).catch((err)=>{
				handle.err(res, err.message)
			});
		}).catch((err)=>{
			handle.err(res, err.message)
		})
	}else{
		handle.err(res, 'Not logged in');
	}
}

exports.reports = (req, res)=>{
	var user = req.session;
	if(!user){
		handle.err(res, 'Not logged in')
		return;
	}else{
		var vars = [{name: 'content', content: req.body.message}, {name:'email', content: user.email}];
		sendEmail('Report', 'Book Brawl Report Submitted', {vars: vars}, 'ericka@elonandcompany.com', (err, resp)=>{
			if(!err){
				handle.res(res)
			}else{
				handle.err(res, err);
			}
		});
	}
}
