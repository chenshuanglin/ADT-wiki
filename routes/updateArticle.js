var express = require('express');
var router = express.Router();
var Article = require('../models/article-db.js');

router.use('/',function (req,res) {
	//前台页面获取数据
	var mytitle = req.param("title");
	var mycontent = req.param("content");
	var id = req.param("id");
	if(!mytitle||!mycontent || !id)
	{
		res.render("index");
		return;
	}
	//获取时间
	var article_id = parseInt(id);
	var now_date = new Date();
	var mydate = now_date.toLocaleString();
	console.log("this is comming");
	//组装数据
	var myArticle = new Article({ 
    	id: article_id,
    	title: mytitle,
    	content: mycontent,
    	mydate: mydate,
    	mytype: "default"
	});
	//把数据保存到数据库中
	myArticle.updateArticleById(article_id,function(err,rows,result){
		if(err){
			res.send("真不好意思，更新数据失败了^_^...饶小的一条命吧！");
			return;
		}
		res.render('content',{articles:rows});
	});
});

module.exports = router;