var OperatePro = require('./opreatePro');
var async =  require('async');

var operate = new OperatePro("../conf/projects.json");
async.parallel([
	function(callback){
		operate.showProject(callback);
	}
	],function(err,results){
		console.log(results[0]);
});


