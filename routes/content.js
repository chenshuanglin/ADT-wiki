var express = require('express');
var router = express.Router();
var Article = require('../models/article-db.js');
var tbOperate = require('../models/tb-operate.js');
var tb_operate = new tbOperate();

/* GET home page. */
router.get('/', function(req, res) {
	var articleId = req.param("id");
	var tableName = req.param("tabName");
	if (articleId == "" || tableName == "") {
		res.render("index");
		return;
	}
	var myArticle = new Article({
		id: articleId,
    	title: "",
    	content: "",
    	contentTxt: "",
    	classify: "",
    	mydate: "",
    	tableName: tableName
	});
	var selectParent = tb_operate.getChineseName(tableName);
	myArticle.getArticleById(function(err,rows,result){
		if (err) {
			res.send("获取数据失败");
			return;
		} else{
			var article = rows[0];
			res.render('content',{
				selectParent:selectParent,
				selectName:article.tb_classify,
				tableName:"public",
				article:article
			});
		}
	});
});
module.exports = router;
