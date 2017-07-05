var passport = require('passport');
var userService = require('../services/user.service');
var jwt = require('jsonwebtoken');

module.exports.login = function(req, res, next) {

	if(!req.body.username || !req.body.password) {
		console.log (req.params['username'] + ':' + req.params['password']  + ' = il manque des params'  )
		res.status(400);
		res.json('Il manque des paramètres');
		return;
	}
	
	passport.authenticate('local', function(err, user, info){
		var token;
		var expiry = new Date();
		expiry.setDate(expiry.getDate() + 7);

		// If Passport throws/catches an error
		if (err) {
		  res.status(404).json(err);
		  return;
		}

		// If a user is found
		if(user){
			res.status(200).json({ 'token' : jwt.sign({
				_id: user._id,
				exp: parseInt(expiry.getTime() / 1000)}, process.env.JWT_SECRET) });
		} else {
			// If user is not found
			res.status(401).json(info);
		}
	})(req, res);
}

module.exports.register = function(req, res) {
	
	if(!req.body.username || !req.body.password) {
		console.log (req.body.username + ':' + req.body.password + ' = il manque des params'  )
		res.status(400).json('Il manque des paramètres');
		return;
	}
	
	userService.create(req.body)
		.then(function (userID) {
            res.status(200).json({ 'token' : jwt.sign({ _id: userID }, process.env.JWT_SECRET) });
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

}