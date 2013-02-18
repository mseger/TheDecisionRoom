var User = require('../models/user')
var Room = require('../models/room')

exports.main = function(req, res){
	if(req.session.user !== null){
		var rooms = Room.findOne({_id: req.params.room_id}).exec(function (err, room){
			if(err)
				return console.log("Couldn't retrieve your rooms");
			res.render('room', {title: "Welcome to your room.", curr_user: req.session.user, curr_room: room, yelp_results: []});
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
			res.render('/room/' + newRoom._id, {title: req.body.room_name, curr_user: req.session.user, curr_room: newRoom, yelp_results: []});
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


// YELP API STUFF -- move this
var yelp = require('yelp').createClient({
    consumer_key: "ca1j3morADtYi7GuPQqCVw", 
    consumer_secret: "k66LjcYeg0sx0LllxTbxFZIMx-c", 
    token: "VLNXKCcKEaI_8vaPwxbeQd29Mk6u-ZB4", 
    token_secret: "cKYBsPFXH4S7Y8fG-eTOhd6P07o"
  });

// display a user's Yelp results for their search
exports.display_yelp_results = function(req, res){
	yelp.search({term: "food", location: "Montreal"}, function(error, data) {
  		if(error)
  			console.log("Error in pulling Yelp results", error);
  		res.render('_yelp_results', {yelp_results: ["1", "2"]});
  });
};
