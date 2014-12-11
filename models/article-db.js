var mysql  = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'adtwiki',
    database : 'adt_wiki',
    insecureAuth: true
});

connection.connect(function(err){
    if(err){
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

/*
*定义一个article的文章对象，处理文章的增删改查操作
*@author:chenshuanglin
*@date 2014-12-11
*/

var Article = function(article)
{
    this.id = article.id;
    this.title = article.title;
    this.content = article.content;
    this.mydate = article.mydate;
    this.mytype = article.mytype;
}

module.exports = Article;


//写入mysql文章记录
Article.prototype.save = function(callback)
{
    var now_date = new Date();
    console.log(now_date.toLocaleString());
    var post = {title: this.title, content: this.content , mydate:now_date.toLocaleString(),type: this.mytype};
    connection.query('insert into article set ?',post,function(err,result){
        if(err) {
            console.log('insert article Error: '+ err.message);
            return;
        }
        console.log(result);
        callback(err,result);
    })
}

//insert("chenshuanglin1", "我是无敌的","默认的");
//删除指定的文章记录
Article.prototype.delete = function(article_id,callback)
{
    var sql = 'delete from article where id = ?';
    connection.query(sql,[article_id],function(err,result){
        if(err) {
            console.log('delete article Error: '+err.message);
        }
        console.log(result);
        callback(err,result);
    });
}

Article.prototype.showAll = function(callback)
{
    connection.query('SELECT * from article', function(err, rows, fields) {
        if (err) {
            console.log('showall article Error: '+err.message);
         }
        console.log(rows);
        callback(err,rows,fields);
    });
}

var myArticle = new Article({ 
    id: 1,
    title: "show message",
    content: "This is content body",
    mydate: "",
    mytype: "default"
});

myArticle.save(function (err, result){
});

connection.end();
