var express = require('express');
var router = express.Router();
var Article = require('../models/article-db.js');

router.use('/',function (req,res) {
	//前台页面获取数据
	var mytitle = req.param("title");
	var mycontent = req.param("content");
	if(mytitle == "" || mycontent == "")
	{
		res.render("index");
		return;
	}
	//获取时间
	var now_date = new Date();
	var mydate = now_date.toLocaleString();
	console.log("this is comming");
	//组装数据
	var myArticle = new Article({ 
    	id: 1,
    	title: mytitle,
    	content: mycontent,
    	mydate: mydate,
    	mytype: "default"
	});
	//把数据保存到数据库中
	myArticle.save(function(err,result){
		if(err){
			res.send("no");
			return;
		}
		console.log("I am  win");
		res.send("yes");
	});
});

module.exports = router;