// land on logged-out splash page when first entering app
exports.splash = function(req, res){
	res.render('loginPage', {title: "Login with Facebook"});
}