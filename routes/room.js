var User = require('../models/user')
var Room = require('../models/room')

exports.main = function(req, res){
	if(req.session.user !== null){
		console.log(req.session.user);
		res.render('room', {title: "Welcome to your room.", curr_user: req.session.user});
	}else{
		res.redirect('/');
	}
};

exports.index = function(req, res){
	if(req.session.user !== null){
		res.render('room_index', {title: "All rooms.", curr_user: req.session.user});
	}else{
		res.redirect('/');
	}
};