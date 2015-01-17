var express = require('express');
var router = express.Router();
var Article = require('../models/article-db.js');


/* GET home page. */
router.get('/', function(req, res) {
	var myArticle = new Article(
		{
			id: 1,
    		title: "",
    		content: "",
    		mydate: "",
    		mytype: "default"
		});
	myArticle.showNewRecord(function(err,rows,result){
		if(err){
			res.send("no");
		}
	//	res.render('newIndex',{articles:rows});
		res.render('newIndex',{selectParent:"ADT文档系统介绍"});
	}); 
  // res.send("chenshuanglin");
});

module.exports = router;
