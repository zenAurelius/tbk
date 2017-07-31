
var Q = require('q');
var dbProvider = require('../utils/dbProvider');

var service = {};
service.list = list;

module.exports = service;

var COLNAME = 'Country';
var ObjectId = require('mongodb').ObjectId;

function list() {
	var deferred = Q.defer();
	
	dbProvider.db.collection(COLNAME).find({}).sort({name:1}).toArray(function (err, countries) {
		if (err) deferred.reject(err);
		if (countries) {
            deferred.resolve(countries);
        } else {
             deferred.reject();
        }
	});
	
	return deferred.promise;
}