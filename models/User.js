var mongoose = require('mongoose'), Schema = mongoose.Schema

var UserSchema = new Schema({
	name: String, 
	profPicURL: String, 
	friends: [], 
	my_rooms: []
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
