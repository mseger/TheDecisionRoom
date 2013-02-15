var mongoose = require('mongoose'), Schema = mongoose.Schema
var Room = require('Room')

var UserSchema = new Schema({
	name: String, 
	profPicURL: String, 
	friends: [], 
	my_rooms: [Room]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;