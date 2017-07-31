var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userService = require('../services/user.service');

passport.use(new LocalStrategy( function(username, password, done) {

	userService.getByUsername(username, function (err, user) {

		if (err) { return done(err); }
		if (!user) {
			return done(null, false, { message: 'Username inconnu.' });
		}
      
		if (!userService.validPassword(user, password)) {
			return done(null, false, { message: 'Password incorrect.' });
		}
		return done(null, user);
	});
  }
));