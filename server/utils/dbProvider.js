var mongodb = require("mongodb");
var ObjectId = require('mongodb').ObjectId; 

module.exports = {

	initializeDB: function(next){
		if(process.env.DB == "DEV") {
						
			var Datastore = require('nedb');
			
			module.exports.db = {};
			module.exports.db.collections = {};
			module.exports.db.collection = function(name){return module.exports.db.collections[name]; }
			module.exports.db.collections.Country = new Datastore({ filename: 'server/utils/dbdev/countries.nedb', autoload: true });
			module.exports.db.collections.Account = new Datastore({ filename: 'server/utils/dbdev/accounts.nedb', autoload: true });
			module.exports.db.collections.Operation = new Datastore({ filename: 'server/utils/dbdev/operations.nedb', autoload: true });
			module.exports.db.collections.Travel = new Datastore({ filename: 'server/utils/dbdev/travels.nedb', autoload: true });
			module.exports.db.collections.User = new Datastore({ filename: 'server/utils/dbdev/users.nedb', autoload: true });
			
			module.exports.getID= function(_id) { 
				console.log('oid');
				return _id;
			};
			console.log("Database de dev...");
			next();
		} else {
			console.log(process.env.MONGODB_URI);
			mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
				if (err) {
					return next(err);
				}

				// Save database object from the callback for reuse.
				module.exports.db = client.db('tbk_database');
				module.exports.getID = function(_id) {
					var oid = ObjectId(_id);
					return oid; 
				};
				console.log("Database connection ready");
				next();
			});
		}
  },
  
  initialize: function(next){
    // initialization actions, there can be many of these
    this.initializeDB(next);
  }
}