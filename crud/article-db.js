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


var insert = function(title,content,mytype)
{
    var now_date = new Date();
    console.log(now_date.toLocaleString());
    var post = {title: title, content: content , mydate:now_date.toLocaleString(),type:mytype};
    connection.query('insert into article set ?',post,function(err,result){
        console.log(result);
    })
}

//insert("chenshuanglin", "我是无敌的","默认的");


connection.query('SELECT * from article', function(err, rows, fields) {
  if (err) throw err;
  console.log(rows)
});

connection.end();