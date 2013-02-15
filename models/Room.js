var mongoose = require('mongoose'), Schema = mongoose.Schema
var Room = require('User')

var RoomSchema = new Schema({
	name: String, 
	clock: Number, 
	locked: Boolean, 
	room_inhabitants: [User]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;