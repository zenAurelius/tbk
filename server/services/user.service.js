
var Q = require('q');
var dbProvider = require('../db/dbProvider');
var crypto = require('crypto');

var service = {};
//service.authenticate = authenticate;
service.getById = getById;
service.getByUsername = getByUsername;
service.create = create;
service.validPassword = validPassword;
//service.update = update;
//service.delete = _delete;
 
module.exports = service;

var COLNAME = 'User';
var ObjectId = require('mongodb').ObjectId; 

function create(params) {
	
	var deferred = Q.defer();
	
	//Verifier si username n'existe pas déjà
	getByUsername(params.username, function (err, user) {
            if (err) deferred.reject(err);
            if (user) deferred.reject('Username "' + params.username + '" existe déjà.');
			createUser(params);
	});
	
	function createUser() {
		//Création du nouveau User
		var newUser = {};
		newUser.username = params.username;
		var hashedPwd = hashPwd(params.password);
		newUser.password = hashedPwd.hash;
		newUser.salt = hashedPwd.salt;
		
		//Enregistrement du nouveau User
		dbProvider.db.collection(COLNAME).insertOne(newUser, function(err, doc) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve();
			}
		});
	}
	
	return deferred.promise;	
}

function getById(id) {
	var deferred = Q.defer();
	console.log("id = " + id);
	dbProvider.db.collection(COLNAME).findOne( { _id: new ObjectId(id) }, function(err, user){
		console.log("err = " + err);
		console.log("user = " + user);
		if (err) deferred.reject(err);
 
        if (user) {
			var foundUser = {_id: user._id, username: user.username};
            deferred.resolve(foundUser);
        } else {
             deferred.reject();
        }
	});
	
	return deferred.promise;
}

function validPassword(user, password) {
  var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 512, 'sha512').toString('hex');
  console.log(hash + ' : ' + user.password);
  return user.password === hash;
};

function hashPwd(password) {
	var salt = crypto.randomBytes(16).toString('hex');
	var hash = crypto.pbkdf2Sync(password, salt, 1000, 512, 'sha512').toString('hex');
	return {salt: salt, hash: hash};
}

function getByUsername(username, next) {
	dbProvider.db.collection(COLNAME).findOne( { username: username }, next);
}


