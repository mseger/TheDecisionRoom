var mongoose = require('mongoose'), Schema = mongoose.Schema

var RoomSchema = new Schema({
	name: String, 
	clock: Number, 
	locked: Boolean, 
	room_inhabitants: [], 
	saved_yelp_listings: []
});

var Room = mongoose.model('Room', RoomSchema);

module.exports = Room;