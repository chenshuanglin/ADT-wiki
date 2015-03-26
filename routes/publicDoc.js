var express = require('express');
var router = express.Router();
var Article = require('../models/article-db.js');
var tbOperate = require('../models/tb-operate.js');

/* GET home page. */
router.get('/', function(req, res) {
	var selectName = req.param("selectName");
	//获取该目录下的所有文档
	var tableName = req.param("tab");
	//判断是否有该表
	tableName = "tb_"+tableName;
	var tb_operate = new tbOperate();
	var isTable = tb_operate.isTable(tableName);
	var selectParent = tb_operate.getChineseName(tableName);
	if(!isTable)
	{
		res.render('index');
		return;
	}
	var myArticle = new Article({
		id: 1,
    	title: "",
    	content: "",
    	contentTxt: "",
    	classify: selectName,
    	mydate: "",
    	first: "",
    	tableName: tableName
	});
	myArticle.showAll(function (err,rows,result) {
		if (err) {
			res.send("<h1>获取数据失败</h1>");
		} else{
			res.render('publicDoc',{selectName:selectName,selectParent:selectParent,articles:rows});
		}
	})
}); 

module.exports = router;