var express = require('express');
var router = express.Router();
var Article = require('../models/article-db.js');

/*搜索中返回结果的对象*/
var SearchBox = function(searchBox)
{
	this.id = searchBox.id;         //文章的id
    this.title = searchBox.title;     //搜索结果的标题
    this.content = searchBox.content;  //搜索结果返回的文章内容
}

router.use('/',function (req,res) {
	//前台页面获取数据
	var keyword = req.param("keyword");
	var number = req.param('number');
	if( !keyword)
	{
		res.render("index");
		return;
	}
	else{
		if(!number || number == "")
		{
			number = 0;
		}
	}
	var myArticle = new Article(
		{
			id: 1,
    		title: "",
    		content: "",
    		mydate: "",
    		mytype: "default"
		});
	myArticle.getArticlesByKeyWord(keyword,function(err,rows,result){
		if(err){
			res.send("no");
		}
		var searchBoxs = new Array();
		var begin = 0;  //获取的数据从哪行开始
		begin = number * 10;
		var length = rows.length;
		for( var i = 0 ; i < rows.length-begin  && i < 10; i++ )
		{
			var searchBox = new SearchBox({
				id : "",
    			title : "",
    			content : ""
			});
			searchBox.id = rows[i+begin].id;
			searchBox.title = rows[i+begin].title;
			searchBox.content = indexKeyword(keyword,rows[i+begin].contentTxt);
			searchBoxs.push(searchBox);
		}
		var pageNum = 1;
		if(length%10 == 0)
		{
			pageNum = length/10;
		}
		else
		{
			pageNum = length/10+1;
		}
		pageNum = Math.floor(pageNum);
		res.render("searchResult",{searchBoxs: searchBoxs, keyword:keyword , beforeNumber:number, length:length ,pageNum:pageNum});
	}); 	
});

//根据字符串和文章内容截取字符串
function indexKeyword(keyword,content)
{
	var COUNT = 120;  //要截取的文字的一半长度
	var length = content.length;  
	var indexStr; //要返回的字符串
	//关键字所在文章的位置
	var begin;
	var end;
	var keywordIndex = content.indexOf(keyword);
	if ( keywordIndex >= 0 )  {
		if(keywordIndex < COUNT )
		{
			begin = 0 ;
		}else{
			begin = keywordIndex-COUNT;
		}
		if(keywordIndex+COUNT>length)
		{
			end = length;
		}
		else{
			end = keywordIndex+COUNT;
		}
		indexStr = content.substring(begin, end);
		indexStr = indexStr+"...";
	}
	else
	{
		if( COUNT >　length ){
			end = length;
		}else{
			end = COUNT;
		}
		indexStr = content.substring(begin, end);
		indexStr = indexStr+"...";
	}
	return indexStr;
}

module.exports = router;