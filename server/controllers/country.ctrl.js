var countryService = require('../services/country.service');

module.exports.list = function(req, res) {
	
	countryService.list()
		.then( function(liste) {
			res.status(200).json({'countries' : liste} );})
		.catch( function(err) {res.status(404).send(err)} );
	
}