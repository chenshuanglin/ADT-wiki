
var mysql  = require('mysql');
var async = require('async');

//数据库连接信息
var pool = mysql.createPool({
    connectionlimit : 10,
    host : 'localhost',
    user : 'root',
    password : 'adtwiki',
    database : 'adtWiki',
    insecureAuth: true
});

/*
*定义一个article的文章对象，处理文章的增删改查操作
*@author:chenshuanglin
*@date 2014-12-11
*/
var article = function(){
	this.id = "";
	this.title = "";
	this.content = "";
	this.contentTxt = "";
	this.tableName = "";
	this.classify = "";
	this.date = "";
}

//保存文章
article.prototype.save = function(callback) {
	that = this;
	//调用async的异步串行执行
	async.waterfall([
		function (cb){
			pool.getConnection(function (err,connection) {
				// 获取连接
				cb(err,connection);
			})
		},
		function (conn,cb){
			//构造发送到数据库的数据
			var post = {
				tb_title: that.title,
				tb_content: that.content,
				tb_contentTxt: that.contentTxt,
				tb_classify: that.classify,
				tb_date: that.date
			}
			//发送到数据库的语句
			var sql = 'insert into '+that.tableName+' set ?';
			conn.query(sql,post,function(err,result){
				conn.release();
				cb(err,result);
			});
		}
	],function(err,result){
		//最终结果回调
		callback(err,result);
	});
};

//删除指定的文章
article.prototype.delete = function(callback) {
	that = this;
	//调用async的异步串行执行
	async.waterfall([
		function (cb){
			pool.getConnection(function (err,connection) {
				// 获取连接
				cb(err,connection);
			})
		},
		function (conn,cb){
			//发送到数据库的语句
			var sql = 'delete from '+that.tableName+' where tb_id =  ?';
			conn.query(sql,[that.id],function(err,result){
				conn.release();
				cb(err,result);
			});
		}
	],function(err,result){
		//最终结果回调
		callback(err,result);
	});
};

//获取所有的文章
article.prototype.allArticle = function(callback){
	that = this;
	//调用async的异步串行执行
	async.waterfall([
		function (cb){
			pool.getConnection(function (err,connection) {
				// 获取连接
				cb(err,connection);
			})
		},
		function (conn,cb){
			//发送到数据库的语句
			var sql = 'SELECT * from '+that.tableName;
			conn.query(sql,function(err,result){
				conn.release();
				cb(err,result);
			});
		}
	],function(err,result){
		//最终结果回调
		callback(err,result);
	});
}

//根据ID获取指定的数据
article.prototype.getArticleById = function (callback){
	that = this;
	//调用async的异步串行执行
	async.waterfall([
		function (cb){
			pool.getConnection(function (err,connection) {
				// 获取连接
				cb(err,connection);
			})
		},
		function (conn,cb){
			//发送到数据库的语句
			var sql = 'SELECT * from '+that.tableName+'where id = ?';
			conn.query(sql,[that.id],function(err,result){
				conn.release();
				cb(err,result);
			});
		}
	],function(err,result){
		//最终结果回调
		callback(err,result);
	});	
}

//根据指定ID获取指定的数据
article.prototype.updateArticleById = function (callback) {
	that = this;
	//调用async的异步串行执行
	async.waterfall([
		function (cb){
			pool.getConnection(function (err,connection) {
				// 获取连接
				cb(err,connection);
			})
		},
		function (conn,cb){
			//发送到数据库的语句
			var sql = 'update '+that.tableName+' set ? where id = '+that.id;
			//构造发送到数据库的数据
			var post = {
				tb_title: that.title,
				tb_content: that.content,
				tb_contentTxt: that.contentTxt,
				tb_classify: that.classify,
				tb_date: that.date
			}
			conn.query(sql,[that.id],function(err,result){
				conn.release();
				cb(err,result);
			});
		}
	],function(err,result){
		//最终结果回调
		callback(err,result);
	});	
}

//根据起始位置和结束位置获取数据
article.prototype.getLimitArticle = function (begin,end,callback)
{
	that = this;
	//调用async的异步串行执行
	async.waterfall([
		function (cb){
			pool.getConnection(function (err,connection) {
				// 获取连接
				cb(err,connection);
			})
		},
		function (conn,cb){
			//发送到数据库的语句
			var sql = 'SELECT * from '+that.tableName+' limit '+conn.escape(begin)+','+conn.escape(end);
			conn.query(sql,[that.id],function(err,result){
				conn.release();
				cb(err,result);
			});
		}
	],function(err,result){
		//最终结果回调
		callback(err,result);
	});	
}

