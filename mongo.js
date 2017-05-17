const mongoose = require('mongoose');
			mongoose.Promise = require('bluebird');

const	Schema = mongoose.Schema;

const mongo = mongoose.connect('mongodb://adminuser:bookbrawl@ds155080.mlab.com:55080/bb-dev')

mongoose.connection.on('connected', ()=>{console.log('Connected to DB');});
mongoose.connection.on('error', ()=>{throw new Error('Cannot connect to DB');});

const userSchema = new Schema({
	email: String,
	password: String,
	name: String,
	bday: Date,
	gender: String,
	role: Number,
	genres: [],
	themes: [],
	level: Number,
	points: Number,
	avatar: String,
	social_media: {},
	followers: [{type:Schema.Types.ObjectId}],
	following_authors: [{type:Schema.Types.ObjectId}],
	following_books: [{type:Schema.Types.ObjectId, ref:'Books'}],
	last_active: { type: Date, default: Date.now },
	status: Number,
	token: String,
	reset_request: Date,
	newsletter: Boolean
});

const bookSchema = new Schema({
	title: String,
	cover: String,
	author: { type: Schema.Types.ObjectId, ref: 'Users' },
	type: Number,
	description: String,
	genre: String,
	tags: [],
	warnings: [],
	status: Number,
	followers: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
	viewed_by: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
	featured: Boolean,
	in_library: Boolean,
	links: {},
	updated_at: { type: Date, default: Date.now }
});

const chapterSchema = new Schema({
	book_id: { type: Schema.Types.ObjectId, ref: 'Books' },
	number: Number,
	name: String,
	content: String,
	status: Number
});

const commentSchema = new Schema({
	book_id: { type: Schema.Types.ObjectId, ref: 'Books' },
	chapter_id: { type: Schema.Types.ObjectId, ref: 'Chapters' },
	content: String,
	author_id: { type: Schema.Types.ObjectId, ref: 'Users' },
	status: Number
})

const brawlSchema = new Schema({
	book_a_id: { type: Schema.Types.ObjectId, ref: 'Books' },
	book_b_id: { type: Schema.Types.ObjectId, ref: 'Books' },
	book_a_vote: Number,
	book_b_vote: Number,
	status: Number,
	updated_at: { type: Date, default: Date.now }
})

const reviewSchema = new Schema({
	book_id: { type: Schema.Types.ObjectId, ref: 'Books' },
	content: String,
	rating: Number,
	author_id: {type: Schema.Types.ObjectId, ref: 'Users' },
	status: Number
})

const genreSchema = new Schema({
	name: String
})

const tagSchema = new Schema({
	name: String
})

const warningSchema = new Schema({
  name: String
})

const schema = {
	user: mongo.model('Users', userSchema),
	book: mongo.model('Books', bookSchema),
	chapter: mongo.model('Chapters', chapterSchema),
	comment: mongo.model('Comments', commentSchema),
	brawl: mongo.model('Brawls', brawlSchema),
	review: mongo.model('Reviews', reviewSchema),
	genre: mongo.model('Genres', genreSchema),
  tag: mongo.model('Tags', tagSchema),
  warning: mongo.model('Warnings', warningSchema)
}

exports.mongo = mongo;
exports.schema = schema;
