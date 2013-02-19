var mongoose = require('mongoose'), Schema = mongoose.Schema

var YelpResultSchema = new Schema({
	name: String, 
	image_url: String, 	
	business_url: String, 
	rating_img_url: String, 
	snippet_img_url: String, 
	snippet_text: String, 	
	yelp_id: Number, 
	is_closed: Boolean,
	num_group_votes: Number
});

var YelpResult = mongoose.model('YelpResult', YelpResultSchema);

module.exports = YelpResult;	