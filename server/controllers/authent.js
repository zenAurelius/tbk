var userService = require('../services/user.service');

module.exports.login = function(req, res, next) {

	if(!req.body.username || !req.body.password) {
		console.log (req.params['username'] + ':' + req.params['password']  + ' = il manque des params'  )
		res.status(400);
		res.json('Il manque des paramètres');
		return;
	}
	
	res.status(200).send('ok');
}

module.exports.register = function(req, res) {
	
	if(!req.body.username || !req.body.password) {
		console.log (req.body.username + ':' + req.body.password + ' = il manque des params'  )
		res.status(400);
		res.json('Il manque des paramètres');
		return;
	}
	
	userService.create(req.body)
		.then(function () {
            res.sendStatus(200).send('ok');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

}