var User = require('../models/user')
var Room = require('../models/room')

exports.main = function(req, res){
	if(req.session.user !== null){
		var rooms = Room.findOne({_id: req.params.room_id}).exec(function (err, room){
			if(err)
				return console.log("Couldn't retrieve your rooms");
			res.render('room', {title: "Welcome to your room.", curr_user: req.session.user, curr_room: room});
		})
	}else{
		res.redirect('/');
	}
};

exports.index = function(req, res){
	if(req.session.user !== null){
		var rooms = Room.find({}).exec(function (err, docs){
			if(err)
				return console.log("Couldn't retrieve your rooms");
			res.render('room_index', {title: "All rooms.", curr_user: req.session.user, rooms: docs});
		});
	}else{
		res.redirect('/');
	}
};

exports.create = function(req, res){
	// create, save, post, and update new room

	if(Room.findOne({name: req.body.room_name})!== undefined){
		// save the new Room, and direct user into it
		var newRoom = new Room({name: req.body.room_name, clock: req.body.valid_for, locked: req.body.locked, room_inhabitants: [req.session.user]});
		newRoom.save(function (err){
			if (err)
				console.log("Error creating new room");
			res.render('/room/' + newRoom._id, {title: req.body.room_name, curr_user: req.session.user, curr_room: newRoom});
		})
	}else{
		// will have to trigger an alert or something to tell user here
		console.log("Room already exists.");
	};
};

// delete all rooms
exports.delete_all = function(req, res){
	// clears out your list so you can start from scratch
	Room.remove({}, function(err) { 
		if(err)
			console.log("Unable to delete rooms");
		res.redirect('/room_index');
	});
};