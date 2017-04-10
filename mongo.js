const mongoose   = require('mongoose'),
			Schema = mongoose.Schema;

const mongo = mongoose.connect('mongodb://adminuser:bookbrawl@ds155080.mlab.com:55080/bb-dev')

mongoose.connection.on('connected', ()=>{console.log('Connected to DB');});
mongoose.connection.on('error', ()=>{throw new Error('Cannot connect to DB');});

const userSchema = new Schema({
	email: String,
	password: String,
	created: { type: Date, default: Date.now },
	last_active: { type: Date, default: Date.now }
});

const schema = {
	user: mongo.model('Users', userSchema)
}

exports.mongo = mongo;
exports.schema = schema;
