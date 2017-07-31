var operationService = require('../services/operation.service');

module.exports.list = function(req, res) {
	
	var id = req.params['travelId'];
	console.log(id);
	
	operationService.list(id)
		.then( liste => res.status(200).json({'operations' : liste} ))
		.catch( err => res.status(404).send(err) );
	
}

module.exports.add = function(req, res) {
	console.log("operation ctrl");
	operationService.add(req.body)
		.then( result => res.status(200).send(result) )
		.catch(err => res.status(404).send(err) );
}

module.exports.deleteOperation = function(req, res){
	var id = req.params['operationId'];
	operationService.deleteOperation(id)
		.then( result => res.status(200).send(result) )
		.catch(err => res.status(404).send(err) );
}