var express = require('express');
var async = require('async');
var path = require('path');
var OperatePro = require('../bean/opreatePro');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
	var operate = new OperatePro(path.join(__dirname,"../conf/projects.json"));
	async.parallel([
		function(callback){
			operate.showProject(callback);
		}
		],function(err,results){
			console.log(results[0]);
			res.render('profile',{projects:results[0]});
	});
});

module.exports = router;
