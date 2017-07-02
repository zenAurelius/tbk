var mongodb = require("mongodb");

module.exports = {

  initializeDB: function(next){
	mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
		if (err) {
			return next(err);
		}

		// Save database object from the callback for reuse.
		module.exports.db = database;
		console.log("Database connection ready");
		next();
    });
  },
  
  initialize: function(next){
    // initialization actions, there can be many of these
    this.initializeDB(next);
  }
}