var User = require('../models/user')
var Room = require('../models/room')

// login a new user, start a new session
exports.login = function (req, res) {
  req.facebook.api('/me', function(err, data){
  	req.facebook.api('/me/picture?redirect=false&type=large', function(err, picData){
	  		var existentUser = User.findOne({name: data.name}, function (err, user){
	  			if(user){
	  				req.session.user = user;
	  				res.redirect('/room_index');
		  		}else{
		  			var loggedInUser = new User({name: data.name, profPicURL: picData.data.url});
		  			loggedInUser.save(function (err){
				  			if(err)
				  				console.log("Unable to save new user.");
				  		 	req.session.user = loggedInUser; 
				  			res.redirect('/room_index');
		  			});
		  		}
		  	});
  		});
  });
};

// logout of your account
exports.logout = function(req, res){
	req.session.user = null;
	res.redirect('/');
}

// delete all users
exports.delete_all = function(req, res){
	// clears out your list so you can start from scratch
	User.remove({}, function(err) { 
		if(err)
			console.log("Error deleting all users");
   		console.log('collection removed');
   		res.redirect('/');
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
  	console.log(error);
  	console.log(data);
  });
};







