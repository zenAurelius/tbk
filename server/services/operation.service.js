
var Q = require('q');
var dbProvider = require('../utils/dbProvider');

var service = {};
service.list = list;
service.add = add;
service.deleteOperation = deleteOperation;

module.exports = service;

var COLNAME = 'Operation';
var ObjectId = require('mongodb').ObjectId;

function list(id) {
	var deferred = Q.defer();
	
	dbProvider.db.collection(COLNAME).find({"travelId": id}).sort({date:1, order:1}).toArray(function (err, operations) {
		
		if (err) deferred.reject(err);
		
		if (operations) {
            deferred.resolve(operations);
        } else {
             deferred.reject();
        }
	});
	
	return deferred.promise;
}

function add(operation) {
	
	var deferred = Q.defer();
	dbProvider.db.collection(COLNAME).insert(operation, (err, result) => {

		if (err){
			deferred.reject(err);
		} else {
			deferred.resolve(result);
		}
	})
	
	return deferred.promise;
};


function deleteOperation(id) {
	var deferred = Q.defer();
	
	dbProvider.db.collection(COLNAME).remove({ _id: new ObjectId(id) }, (err, result) => {
		if (err){
			deferred.reject(err);
		} else {
			deferred.resolve(result);
		}
	})
	
	return deferred.promise;
}