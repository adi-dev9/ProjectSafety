const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema({
	username: String,
	password: String,
	first_name: String,
	SOS_contacts: [String]
});

const User = mongoose.model('user', UserSchema);
module.exports = User;