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
	myArticle.showAll(function(err,rows,result){
		if(err){
			res.send("no");
		}
		res.render('main',{articles:rows});
	}); 
	
  // res.send("chenshuanglin");
});

module.exports = router;
