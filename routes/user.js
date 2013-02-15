var User = require('../models/user')

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
	FBUser.remove({}, function(err) { 
   		console.log('collection removed');
   		res.redirect('/');
	});
};
