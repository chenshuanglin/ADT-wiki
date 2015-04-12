var express = require('express');
var async = require('async');
var path = require('path');
var OperatePro = require('../bean/opreatePro');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
	res.render('index',{selectParent:"ADT文档系统介绍"});
});

module.exports = router;
