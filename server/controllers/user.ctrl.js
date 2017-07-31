var userService = require('../services/user.service');

module.exports.get = function(req, res) {
	
	var userId = req.params['id'];
	console.log(req.payload);

	userService.getById(userId)
		.then(function (user) {
            res.status(200).json({ 'user' : user });
        })
        .catch(function (err) {
            res.status(404).send(err);
        });

}

module.exports.getFriends = function(req, res) {
	
	var userId = req.params['id'];
	console.log(req.payload);

	userService.getFriends(userId)
		.then(function (liste) {
			console.log(liste);
            res.status(200).json({ 'friends' : liste });
        })
        .catch(function (err) {
            res.status(404).send(err);
        });
}