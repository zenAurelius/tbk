var travelService = require('../services/travel.service');

module.exports.list = function(req, res) {
	
	var userId = req.params['userid'];
	console.log(userId);
	
	travelService.list(userId)
		.then( liste => res.status(200).json({'travels' : liste} ))
		.catch( err => res.status(404).send(err) );
	
}

module.exports.add = function(req, res) {
	console.log("travel ctrl");
	travelService.add(req.body)
		.then( result => res.status(200).send(result) )
		.catch(err => res.status(404).send(err) );
}

module.exports.deleteTravel = function(req, res){
	var id = req.params['travelid'];
	travelService.deleteTravel(id)
		.then( result => res.status(200).send(result) )
		.catch(err => res.status(404).send(err) );
}