var express = require('express');
var router = express.Router();
var Article = require('../models/article-db.js');
var tbOperate = require('../models/tb-operate.js');
var tb_operate = new tbOperate();

router.use('/',function (req,res) {
	//前台页面获取数据
	var mytitle = req.param("title");
	var mycontent = req.param("content");
	var contentTxt = req.param("contentTxt");
	var tableName = req.param("tabName");
	var classify = req.param("classify");
	var id = req.param("id");
	var isTable = tb_operate.isTable(tableName);
	if(mytitle == "" || mycontent == "" || !isTable)
	{
		console.log("no in")
		var strObj = {isSuccess:"no"};
		var str = JSON.stringify(strObj);
		res.send(str);
		return;
	}
	var firstTxt = getFirstTxt(contentTxt)
	//获取时间
	var now_date = new Date();
	var mydate = now_date.toLocaleString();
	var myArticle = new Article({
		id: id,
    	title: mytitle,
    	content: mycontent,
    	contentTxt: contentTxt,
    	classify: classify,
    	mydate: mydate,
    	first:firstTxt,
    	tableName: tableName
	});
	myArticle.updateArticleById(function(err,result){
		if (err) {
			var strObj = {isSuccess:"no"};
			var str = JSON.stringify(strObj);
			res.send(str);
		} else{
			var strObj = {isSuccess:"yes",tab:tableName,id:id}
			var str = JSON.stringify(strObj);
			res.send(str);
		}
	});
});

function getFirstTxt (contentTxt) {
	var COUNT = 180;
	var firstTxt = "";
	if(contentTxt.length < COUNT)
	{
		firstTxt = contentTxt.substr(0,contentTxt.length);
	}
	else
	{
		firstTxt = contentTxt.substring(0,COUNT);
	}
	return firstTxt;
}

module.exports = router;