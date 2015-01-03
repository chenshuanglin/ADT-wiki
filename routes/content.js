var express = require('express');
var router = express.Router();
var Article = require('../models/article-db.js');

/* GET home page. */
router.get('/', function(req, res) {
	var id = req.param('id');
	if(!id)
	{
		res.render("index");
		return ;
	}
	var article_id = parseInt(id);
	var myArticle = new Article(
	{
		id: 1,
    	title: "",
    	content: "",
    	contentTxt: "",
    	mydate: "",
    	mytype: "default"
	});
	myArticle.getArticleById(article_id,function(err,rows,result) {
		if(err){
			res.send("no");
			return;
		}
		res.render('content',{articles:rows});
	});
  // res.send("chenshuanglin");
});

module.exports = router;
