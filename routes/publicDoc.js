var express = require('express');
var router = express.Router();
var Article = require('../models/article-db.js');
/* GET home page. */
router.get('/', function(req, res) {
	var selectName = req.param("selectName");
	res.render('publicDoc',{selectName:selectName,selectParent:"公共文档"});
}); 

module.exports = router;