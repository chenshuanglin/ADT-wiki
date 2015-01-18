var mysql  = require('mysql');
var async = require('async');
var pool = mysql.createPool({
    connectionlimit : 10,
    host : 'localhost',
    user : 'root',
    password : 'adtwiki',
    database : 'adt_wiki',
    insecureAuth: true
});


var Project = function(){
	this.name="";
	this.childNames = new Array();
} 

Project.prototype.setName = function(name){
	this.name = name;
}

Project.prototype.getName = function(){
	return this.name;
}

Project.prototype.pushChild = function(childName){
	this.childNames.push(childName);
}

Project.prototype.getChildNames = function(){
	return this.childNames;
}

//添加项目
Project.prototype.add = function(callback){
	that = this
    pool.getConnection(function(err,connection){
        if(err){
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
        //先获取插入项目的ID，获取ID，执行插入该项目列表
        var post = {projectName: that.name};
        async.waterfall([
        	//获取插入数据的id
        	function(cb){
        		connection.query('insert into tb_project set ?',post,function(err,result){
            		cb(err,result);
            	});
        	},
        	//根据获取的ID,插入默认的项目列表
        	function(result,cb){
        		console.log(result.insertId);
        		for(i = 0 ; i < that.childNames.length ; i++)
        		{
        			var sql = 'insert into tb_project_list set project_id='+connection.escape(result.insertId)+' , project_list = '+connection.escape(that.childNames[i]);
        			connection.query(sql,function(err,result){
            			cb(err,result);
            		});
        		}
        	}
        	],function(err,result){
        		connection.release();
        		callback(err,result);
        	}
        );
    });
}

//删除项目
Project.prototype.delete = function(id,callback)
{
	 pool.getConnection(function(err,connection){
        if(err){
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);

        var sql = 'delete from article where id = ?';
        connection.query(sql,[id],function(err,result){
            if(err) {
                console.log('delete article Error: '+err.message);
            }
            connection.release();
            console.log(result);
            callback(err,result);
        });
    });
}

module.exports = Project;

var project = new Project();
project.setName("7.0");
project.pushChild("管理1");
project.pushChild("管理2");
project.pushChild("管理3");

project.add(function(err,result){
	if(err)
	{
		console.log("插入数据错误");
	}
	console.log("插入数据成功");
});