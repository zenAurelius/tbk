
var Q = require('q');
var dbProvider = require('../utils/dbProvider');

var service = {};
service.list = list;
service.add = add;
service.deleteAccount = deleteAccount;

module.exports = service;

var COLNAME = 'Account';
var ObjectId = require('mongodb').ObjectId;

function list(travelID) {
	var deferred = Q.defer();
	
	dbProvider.db.collection(COLNAME).find({"travelId": travelID}).toArray(function (err, travels) {
		
		if (err) deferred.reject(err);
		
		if (travels) {
            deferred.resolve(travels);
        } else {
             deferred.reject();
        }
	});
	
	return deferred.promise;
}

function add(account) {
	
	var deferred = Q.defer();

	dbProvider.db.collection(COLNAME).insert(account, (err, result) => {
		console.log(`account err = ${err}`)
		console.log(`account result = ${result}`)
		if (err){
			deferred.reject(err);
		} else {
			deferred.resolve(result);
		}
	})
	
	return deferred.promise;
};

function deleteAccount(id) {
	console.log("ok0");
	var deferred = Q.defer();
	console.log("ok1"); 
	dbProvider.db.collection(COLNAME).remove({ _id: new ObjectId(id) }, (err, result) => {
		console.log("ok");
		if (err){
			deferred.reject(err);
		} else {
			deferred.resolve(result);
		}
	})
	
	return deferred.promise;
}