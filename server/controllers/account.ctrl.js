var accountService = require('../services/account.service');

module.exports.list = function(req, res) {
	
	var travelID = req.params['travelId'];
		
	accountService.list(travelID)
		.then( liste => res.status(200).json({'accounts' : liste} ))
		.catch( err => res.status(404).send(err) );
	
}

module.exports.add = function(req, res) {
	accountService.add(req.body)
		.then( result => res.status(200).send(result) )
		.catch(err => res.status(404).send(err) );
}

module.exports.deleteAccount = function(req, res){
	var id = req.params['accountId'];
	console.log(`account ${id}`);
	accountService.deleteAccount(id)
		.then( result => res.status(200).send(result) )
		.catch(err => res.status(404).send(err) );
}