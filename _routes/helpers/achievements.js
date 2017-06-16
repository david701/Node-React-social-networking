const mongo = require('../../mongo.js')
const mongoUser = mongo.schema.user,
			mongoBook = mongo.schema.book,
			mongoChapter = mongo.schema.chapter,
			mongoComment = mongo.schema.comment,
			mongoReview = mongo.schema.review;

const levelCheck = (points, cb)=>{
	var level = 0, title = 'Apprentice';
	if(points > 0){ level = 1; title = 'Bronze Acolyte' } else
	if(points >= 2){ level = 1 } else
	if(points >= 4){ level = 2 } else
	if(points >= 7){ level = 3 } else
	if(points >= 9){ level = 4 } else
	if(points >= 12){ level = 5; title='Silver Acolyte'} else
	if(points >= 15){ level = 6 } else
	if(points >= 19){ level = 7 } else
	if(points >= 23){ level = 8 } else
	if(points >= 27){ level = 9; title='Gold Acolyte'} else
	if(points >= 32){ level = 10 } else
	if(points >= 37){ level = 11; title='Bronze Aspirant'} else
	if(points >= 43){ level = 12 } else
	if(points >= 49){ level = 13 } else
	if(points >= 56){ level = 14 } else
	if(points >= 54){ level = 15; title='Silver Aspirant'} else
	if(points >= 72){ level = 16 } else
	if(points >= 81){ level = 17 } else
	if(points >= 91){ level = 18 } else
	if(points >= 102){ level = 19; title='Gold Aspirant'} else
	if(points >= 115){ level = 20 } else
	if(points >= 128){ level = 21; title='Bronze Adventurer'} else
	if(points >= 143){ level = 22 } else
	if(points >= 159){ level = 23 } else
	if(points >= 177){ level = 24 } else
	if(points >= 193){ level = 25; title='Silver Adventurer'} else
	if(points >= 211){ level = 26 } else
	if(points >= 229){ level = 27 } else
	if(points >= 250){ level = 28 } else
	if(points >= 272){ level = 29; title='Gold Adventurer'} else
	if(points >= 296){ level = 30 } else
	if(points >= 312){ level = 31; title='Bronze Veteran'} else
	if(points >= 330){ level = 32 } else
	if(points >= 348){ level = 33 } else
	if(points >= 368){ level = 34 } else
	if(points >= 388){ level = 35; title='Silver Veteran'} else
	if(points >= 410){ level = 36 } else
	if(points >= 432){ level = 37 } else
	if(points >= 456){ level = 38 } else
	if(points >= 481){ level = 39; title='Gold Veteran'} else
	if(points >= 507){ level = 40 } else
	if(points >= 534){ level = 41; title='Bronze Master'} else
	if(points >= 563){ level = 42 } else
	if(points >= 593){ level = 43 } else
	if(points >= 624){ level = 44 } else
	if(points >= 658){ level = 45; title='Silver Master'} else
	if(points >= 692){ level = 46 } else
	if(points >= 729){ level = 47 } else
	if(points >= 768){ level = 48 } else
	if(points >= 808){ level = 49; title='Gold Master'} else
	if(points > 850){ level = 50 }
	cb(level, title);
}

const levelAvatar = (level)=>{
	var avatar = {kitty: '', puppy:''}

	if(!level || level == 0){
		avatar.kitty = '/assets/images/avatars/Cat_1.png';
		avatar.puppy = '/assets/images/avatars/Dog_1.png';
	} else if (level >= 1) {
		avatar.kitty = '/assets/images/avatars/Cat_2.png';
		avatar.puppy = '/assets/images/avatars/Dog_2.png';
	} else if (level >= 11) {
		avatar.kitty = '/assets/images/avatars/Cat_3.png';
		avatar.puppy = '/assets/images/avatars/Dog_3.png';
	} else if (level >= 21) {
		avatar.kitty = '/assets/images/avatars/Cat_4.png';
		avatar.puppy = '/assets/images/avatars/Dog_4.png';
	} else if (level >= 31) {
		avatar.kitty = '/assets/images/avatars/Cat_5.png';
		avatar.puppy = '/assets/images/avatars/Dog_5.png';
	} else if (level >= 41) {
		avatar.kitty = '/assets/images/avatars/Cat_6.png';
		avatar.puppy = '/assets/images/avatars/Dog_6.png';
	}

	return avatar;
}

const avatarCheck = (avatar)=>{
	if(avatar === '/assets/images/avatars/Cat_1.png' || avatar === '/assets/images/avatars/Cat_2.png' || avatar === '/assets/images/avatars/Cat_3.png' || avatar === '/assets/images/avatars/Cat_4.png' || avatar === '/assets/images/avatars/Cat_5.png' || avatar === '/assets/images/avatars/Cat_6.png' || avatar === '/assets/images/avatars/cat_1.png'){
		return 'cat';
	}else{
		return 'dog';
	}
}

const selectAvatar = (level, avatar)=>{
	var animal = avatarCheck(avatar);

	if(animal === 'dog'){
		var selected = levelAvatar(level).puppy;
	}else{
		var selected = levelAvatar(level).kitty;
	}

	return selected;
}

const addPoints = (userId, points, cb)=>{
	mongoUser.findOne({_id: userId}).then((user)=>{
		if(!user.points){
			user.points = 0;
		}
		user.points = user.points + points;
		levelCheck(user.points, (level, title)=>{
			user.level = level;
			user.level_title = title
			user.avatar = selectAvatar(user.level, user.avatar);
			user.save().then((user)=>{
				cb(null, user);
			}).catch(err=>{
				cb(err)
			});
		})
	})
}

module.exports = {
	finishFiction: (userId, cb)=>{
		// 1 for reading 2 last chapters
		var points = 1/2;
		addPoints(userId, points, (err, user)=>{
			cb(err, user)
		});
	},
	rateBook: (userId, cb)=>{
		// 1 for rating book
		var points = 1;
		addPoints(userId, points, (err, user)=>{
			cb(err, user)
		});
	},
	comment: (userId, cb)=>{
		// 1 for 4 comments left
		var points = 1/4;
		addPoints(userId, points, (err, user)=>{
			cb(err, user)
		});
	},
	vote: (userId, cb)=>{
		// 1 for voting
		var points = 1;
		addPoints(userId, points, (err, user)=>{
			cb(err, user)
		});
	},
	publish: (userId, cb)=>{
		// 2 for approved book
		var points = 2;
		addPoints(userId, points, (err, user)=>{
			cb(err, user)
		});
	},
	followers: (userId, cb)=>{
		// 1 per 100 followers
		var points = 1/100;
		addPoints(userId, points, (err, user)=>{
			cb(err, user)
		});
	},
	views: (userId, cb)=>{
		// 1 per 4000 views
		var points = 1/4000;
		addPoints(userId, points, (err, user)=>{
			cb(err, user)
		});
	},
	reviews: (userId, cb)=>{
		// 1 per 20 reviews
		var points = 1/20;
		addPoints(userId, points, (err, user)=>{
			cb(err, user)
		});
	},
	chapter: (userId, cb)=>{
		// 1 per chapter added
		var points = 1;
		addPoints(userId, points, (err, user)=>{
			cb(err, user)
		});
	},
	avatars: (userId, cb)=>{
		// return array of correct avatars
		var points = 0;
		addPoints(userId, points, (err, user)=>{
			cb(err, user)
		});
	}
}
