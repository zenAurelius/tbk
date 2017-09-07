
var Q = require('q');
var dbProvider = require('../utils/dbProvider');

var service = {};
service.list = list;
service.add = add;
service.update = update;
service.deleteTravel = deleteTravel;

module.exports = service;

var COLNAME = 'Travel';
var ObjectId = require('mongodb').ObjectId;

function list(userId) {
	var deferred = Q.defer();
	
	dbProvider.db.collection(COLNAME).find({"users._id": userId}).sort({departDate: 1}).toArray(function (err, travels) {
		
		if (err) deferred.reject(err);
		
		if (travels) {
            deferred.resolve(travels);
        } else {
             deferred.reject();
        }
	});
	
	return deferred.promise;
}

function add(travel) {
	
	var deferred = Q.defer();

	dbProvider.db.collection(COLNAME).insert(travel, (err, result) => {

		if (err){
			deferred.reject(err);
		} else {
			deferred.resolve(result);
		}
	})
	
	return deferred.promise;
};

function update(travel) {
	
	var deferred = Q.defer();

	console.log(travel);
	dbProvider.db.collection(COLNAME).update({ _id: dbProvider.getID(travel._id) }, travel, {}, (err, nbResult, result) => {
		console.log(err);
		if (err){
			deferred.reject(err);
		} else {
			deferred.resolve(result);
		}
	})
	
	return deferred.promise;
};


function deleteTravel(id) {
	var deferred = Q.defer();
	
	dbProvider.db.collection(COLNAME).remove({ _id: dbProvider.getID(id) }, (err, result) => {
		if (err){
			deferred.reject(err);
		} else {
			deferred.resolve(result);
		}
	})
	
	return deferred.promise;
}