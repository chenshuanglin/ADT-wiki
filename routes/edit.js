var express = require('express');
var Article = require('../models/article-db.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var isEdit = req.param("isEdit");
	var id = req.param('id');
	if(!isEdit || !id)
	{
		res.render("edit");
		return ;
	}
	article_id = parseInt(id);
	if(isEdit == 1)
	{
		var myArticle = new Article(
		{
			id: 1,
    		title: "",
    		content: "",
    		mydate: "",
    		mytype: "default"
		});
		myArticle.getArticleById(article_id,function(err,rows,result) {
			if(err){
				res.send("no");
				return;
			}
			res.render('edit',{article:rows[0]});
		});
	}
	else
	{
		res.render("index");
		return ;
	}
});

module.exports = router;
