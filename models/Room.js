var mongoose = require('mongoose'), Schema = mongoose.Schema

var RoomSchema = new Schema({
	name: String, 
	clock: Number, 
	locked: Boolean, 
	room_inhabitants: []
});

var Room = mongoose.model('Room', RoomSchema);

module.exports = Room;