var YelpResult = require('../models/yelp_result')

// routes for all yelp-related functionality

// YELP API STUFF -- move this
var yelp = require('yelp').createClient({
    consumer_key: "ca1j3morADtYi7GuPQqCVw", 
    consumer_secret: "k66LjcYeg0sx0LllxTbxFZIMx-c", 
    token: "VLNXKCcKEaI_8vaPwxbeQd29Mk6u-ZB4", 
    token_secret: "cKYBsPFXH4S7Y8fG-eTOhd6P07o"
  });

// display a user's Yelp results for their search
exports.display_yelp_results = function(req, res){
	yelp.search({term: req.body.category, location: req.body.city}, function(error, data) {
  		if(error)
  			console.log("Error in pulling Yelp results", error);
  		var yelpResults = [];
  		for(var i=0; i<data.businesses.length; i++){
  			var currBusiness = data.businesses[i];
  			var newYelpResult = new YelpResult({name: currBusiness.name, image_url: currBusiness.image_url, business_url: currBusiness.url, rating_img_url: currBusiness.rating_img_url, snippet_img_url: currBusiness.snippet_img_url, snippet_text: currBusiness.snippet_text, yelp_id: currBusiness.yelp_id, is_closed: currBusiness.is_closed, num_group_votes: 0});
  			yelpResults.push(newYelpResult);
  			newYelpResult.save(function (err){
  				if(err)
  					console.log("Unable to save yelp result");
  			});
  		};
  		res.render('_yelp_results', {yelp_results: yelpResults, curr_room: req.params.room_id});
  });
};

// delete all yelp results stored in the db
// NOTE: dummy endpt at this pt, need to fix this
exports.delete_all = function(req, res){
	YelpResult.remove({}, function(err) { 
		if(err)
			console.log("Unable to delete yelp results");
		res.redirect('/room_index');
	});
};

// upvote a listing
exports.vote_listing_up = function(req, res){
	var listingInQuestion = YelpResult.findOne({_id: req.params.yelp_id}).exec(function (err, listing){
		listing.num_group_votes = listing.num_group_votes + 1;
		listing.save(function (err){
			if(err)
				console.log("Unable to upvote listing");
			res.redirect('/room_index');
		});
	});
};

// downvote a listing
exports.vote_listing_down = function(req, res){
	var listingInQuestion = YelpResult.findOne({_id: req.params.yelp_id}).exec(function (err, listing){
		listing.num_group_votes = listing.num_group_votes - 1;
		listing.save(function (err){
			if(err)
				console.log("Unable to downvote listing");
			res.redirect('/room_index');
		});
	});
};


// save a given Yelp listing to 
exports.save_listing_to_room = function(req, res){
	var roomToSave
}
