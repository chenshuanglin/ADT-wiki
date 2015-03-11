var mysql  = require('mysql');
var pool = mysql.createPool({
    connectionlimit : 10,
    host : 'localhost',
    user : 'root',
    password : 'adtwiki',
    database : 'adtwiki',
    insecureAuth: true
});

var Article = function(article)
{
    this.id = article.id;
    this.title = article.title;
    this.content = article.content;
    this.contentTxt = article.contentTxt;
    this.classify = article.classify;
    this.mydate = article.mydate;
    this.tableName = article.tableName;
}


module.exports = Article;


/*
*定义一个article的文章对象，处理文章的增删改查操作
*@author:chenshuanglin
*@date 2014-12-11
*/

//写入mysql文章记录
Article.prototype.save = function(callback)
{
    that = this
    pool.getConnection(function(err,connection){
        if(err){
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
        var sql = "insert into "+that.tableName+" set ?";
        var post = {tb_title: that.title, tb_content: that.content , tb_contentTxt: that.contentTxt, tb_classify: that.classify, tb_date:that.mydate};
        connection.query(sql,post,function(err,result){
            if(err) {   
                console.log('insert article Error: '+ err.message);
                return;
            }
            //释放连接
            connection.release();
            console.log(result);
            callback(err,result);
        });
    });
}



//insert("chenshuanglin1", "我是无敌的","默认的");
//删除指定的文章记录
Article.prototype.delete = function(article_id,callback)
{
    pool.getConnection(function(err,connection){
        if(err){
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);

        var sql = 'delete from article where id = ?';
        connection.query(sql,[article_id],function(err,result){
            if(err) {
                console.log('delete article Error: '+err.message);
            }
            connection.release();
            console.log(result);
            callback(err,result);
        });
    });
}

Article.prototype.showAll = function(callback)
{
    pool.getConnection(function(err,connection){
        if(err){
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);

        connection.query('SELECT * from article', function(err, rows, result) {
            if (err) {
                console.log('showall article Error: '+err.message);
            }
            connection.release();
//            console.log(rows);
            callback(err,rows,result);
        });
    });
}

//根据指定ID获取指定的数据
Article.prototype.getArticleById = function (callback) {
	that = this;
    pool.getConnection(function(err,connection){
        if(err){
            console.error('error connecting: ' + err.stack);
            return;
        }
        var sql = 'SELECT * from '+that.tableName+' where tb_id = ?';
        connection.query(sql,[that.id],function(err,rows,result){
             if (err) {
                console.log('get article by Id Error: '+err.message);
            }
            connection.release();
            callback(err,rows,result);
        });
    });
}

//根据指定ID更新指定的数据
//根据指定ID获取指定的数据
Article.prototype.updateArticleById = function (callback) {
    var that = this;
    pool.getConnection(function(err,connection){
        if(err){
            console.error('error connecting: ' + err.stack);
            return;
        }
        var sql = 'update '+that.tableName+' set ? where tb_id ='+that.id;
        var post = {tb_title: that.title, tb_content: that.content , tb_contentTxt: that.contentTxt, tb_classify: that.classify, tb_date:that.mydate};
        connection.query(sql,post,function(err,rows,result){
             if (err) {
                console.log('get article by Id Error: '+err.message);
            }
            connection.release();
            callback(err,rows,result);
        });
    });
}

//获取最后五条记录
Article.prototype.showNewRecord = function(callback)
{
    pool.getConnection(function(err,connection){
        if(err){
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);

        connection.query('SELECT * from article order by id desc limit 5 ', function(err, rows, result) {
            if (err) {
                console.log('showall article Error: '+err.message);
            }
            connection.release();
//            console.log(rows);
            callback(err,rows,result);
        });
    });
}

//根据输入内容搜索文章的标题和内容，找到匹配内容
Article.prototype.getArticlesByKeyWord = function (keyword,callback) {
    pool.getConnection(function(err,connection){
        if(err){
            console.error('error connecting: ' + err.stack);
            return;
        }
        keyword = "%"+keyword+"%";
        var sql = 'SELECT * FROM article where contentTxt like ? or title like ?';
        console.log(sql);
        connection.query(sql,[keyword,keyword],function(err,rows,result){
             if (err) {
                console.log('get article by keyword Error: '+err.message);
            }
            connection.release();
            callback(err,rows,result);
        });
    });
}
