var express = require('express');
var Article = require('../models/article-db.js');
var tbOperate = require('../models/tb-operate.js');
var router = express.Router();
var tb_operate = new tbOperate();

/* GET home page. */
router.get('/', function(req, res) {
	var selectParent=req.param("selectParent");
	var selectName = req.param("selectName");
	var tb_id = req.param("id");
	if (selectName == "undefined") {
		selectName = "";
	}
	var tableName = tb_operate.getTablename(selectParent);
	if (tb_id == "" || tableName == "") {
		res.render('index');
	}
	else
	{
		var myArticle = new Article({
			id: tb_id,
    		title: "",
    		content: "",
    		contentTxt: "",
    		classify: "",
    		mydate: "",
    		first:"",
    		tableName: tableName
		});
		myArticle.getArticleById(function(err,rows,result){
			if (err) {
				res.send("获取数据失败");
				return;
			} else{
				var article = rows[0];
				res.render('editor',{
					selectParent:selectParent,
					selectName:selectName,
					tableName:tableName,
					article:article
				});
			}
		});
	}
});

module.exports = router;
