
var Q = require('q');
var dbProvider = require('../db/dbProvider');
var crypto = require('crypto');

var service = {};
//service.authenticate = authenticate;
//service.getById = getById;
service.create = create;
//service.update = update;
//service.delete = _delete;
 
module.exports = service;

function create(params) {
	
	var deferred = Q.defer();
	
	var newUser = {};
	newUser.username = params.username;
	var hashedPwd = hashPwd(params.password);
	newUser.password = hashedPwd.hash;
	newUser.salt = hashedPwd.salt;
	
	dbProvider.db.collection('User').insertOne(newUser, function(err, doc) {
		if (err) {
			deferred.reject(err);
		} else {
			 deferred.resolve();
		}
		
		
	});
	
	return deferred.promise;	
}

function hashPwd(password) {
	var salt = crypto.randomBytes(16).toString('hex');
	var hash = crypto.pbkdf2Sync(password, salt, 1000, 512, 'sha512').toString('hex');
	return {salt: salt, hash: hash};
}