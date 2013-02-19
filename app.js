
/**
 * Module dependencies.
 */

var express = require('express')
  , loginPage = require('./routes/loginPage')
  , user = require('./routes/user')
  , room = require('./routes/room')
  , yelp = require('./routes/yelp')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , Facebook = require('facebook-node-sdk');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(Facebook.middleware({appId: '339641609478969', secret: 'bc99e76f98c5783ae99e050aac4d75ef'}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  mongoose.connect(process.env.MONGOLAB_URI || 'localhost');
});

// GETS
app.get('/', loginPage.splash);
app.get('/login', Facebook.loginRequired(), user.login);
app.get('/room_index', Facebook.loginRequired(), room.index);
app.get('/room/:room_id', Facebook.loginRequired(), room.main);
app.get('/users/delete_all', user.delete_all);
app.get('/rooms/delete_all', Facebook.loginRequired(), room.delete_all);
app.get('/room/:room_id/yelp', yelp.display_yelp_results);
app.get('/room/:room_id/yelps/delete_all', yelp.delete_all);

// POSTS
app.post('/login', Facebook.loginRequired(), user.login);
app.post('/logout', Facebook.loginRequired(), user.logout);
app.post('/room/new', Facebook.loginRequired(), room.create);
app.post('/room/:room_id/yelp', yelp.display_yelp_results);
app.post('/room/:room_id/:yelp_id/vote-up', yelp.vote_listing_up);
app.post('/room/:room_id/:yelp_id/vote-down', yelp.vote_listing_down);
//app.post('/room/:room_id/:yelp_id/save', room.save_listing_to_room);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
