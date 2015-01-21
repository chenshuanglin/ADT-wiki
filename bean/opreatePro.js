var fs = require('fs');
var OpreatePro = function(filename)
{
	this.fliename = filename;
}

//把json字符串对象变为Project对象
OpreatePro.prototype.jsonToProject = function(jsonObj)
{
	var projects = new Array();
	for(var i= 0 ; i < jsonObj.project.length; i++ )
	{
		var project = new Project();
		project.setName(jsonObj.project[i].name);
		for(var j = 0 ; j < jsonObj.project[i].child.length; j++)
		{
			var name = jsonObj.project[i].child[j].childName;
			var childProject = new ChildProject(name);
			project.pushChild(childProject);
		}
		projects.push(project);
	}
	return projects;
}
//增加项目到文件中
OpreatePro.prototype.addProject =  function(project,callback){
	that = this;
	fs.readFile(that.filename,'utf8',function(err,data){
		var jsonObj = JSON.parse(data);
		var projects = that.jsonToProject(jsonObj);
		//判断是否跟已有的项目重名
		var judge = true;
		for(var i = 0 ; i < projects.length ; i++)
		{
			if(projects[i].name == project.name)
			{
				judge = false;
				break;
			}
		}
		if(judge)
		{
			projects.push(project);
		}
		callback(err,projects,judge);
	});
}

//查询所有项目
OpreatePro.prototype.showProject =  function(callback)
{
	that = this;
	fs.readFile(that.filename,'utf8',function(err,data){
		var jsonObj = JSON.parse(data);
		var projects = that.jsonToProject(jsonObj);
		callback(err,projects);
	});
}
//根据项目名删除指定的项目
OpreatePro.prototype.deleteProject = function(projectName,callback)
{
	that = this;
	fs.readFile(that.filename,'utf8',function(err,data){
		var jsonObj = JSON.parse(data);
		var projects = that.jsonToProject(jsonObj);
		for(var i = 0 ; i < projects.length ; i++)
		{
			if(projects[i].name == projectName)
			{
				projects.splice(i,1);
				break;
			}
		}
		callback(err,projects);
	});
}

//更新项目的名称
OpreatePro.prototype.updateProject = function(oldName,newName,callback)
{
	that = this;
	fs.readFile(that.filename,'utf8',function(err,data){
		var jsonObj = JSON.parse(data);
		var projects = that.jsonToProject(jsonObj);
		for(var i = 0 ; i < projects.length ; i++)
		{
			if(projects[i].name == oldName)
			{
				projects[i].name = newName;
				break;
			}
		}
	});
}

//增加项目子目录到文件中
OpreatePro.prototype.addChild =  function(projectName,childProject,callback){
	that = this;
	fs.readFile(that.filename,'utf8',function(err,data){
		var jsonObj = JSON.parse(data);
		var projects = that.jsonToProject(jsonObj);
		//遍历项目找到对应的项目，进行增加操作
		var index = -1;  //对应项目的下标,-1是没找到该项目
		for(var i = 0 ; i < projects.length ; i++)
		{
			var childs = projects[i].child;
			if(projects[i].name == projectName)
			{
				//判断是否跟项目中的子目录重名
				var judge = true;
				for(var j = 0 ; j < childs.length; j++)
				{
					var child = childs[j];
					if(child.childName == childProject.childName)
					{
						judge = false;
						break;
					}
				}
				index = i; 
				break;
			}
		}
		if(index == -1)
		{
			projects[index].child.push():;
		}
		callback(err,projects,judge);
	});
}

//查询所有项目
OpreatePro.prototype.showProject =  function(callback)
{
	that = this;
	fs.readFile(that.filename,'utf8',function(err,data){
		var jsonObj = JSON.parse(data);
		var projects = that.jsonToProject(jsonObj);
		callback(err,projects);
	});
}
//根据项目名删除指定的项目
OpreatePro.prototype.deleteProject = function(projectName,callback)
{
	that = this;
	fs.readFile(that.filename,'utf8',function(err,data){
		var jsonObj = JSON.parse(data);
		var projects = that.jsonToProject(jsonObj);
		for(var i = 0 ; i < projects.length ; i++)
		{
			if(projects[i].name == projectName)
			{
				projects.splice(i,1);
				break;
			}
		}
		callback(err,projects);
	});
}

//更新项目的名称
OpreatePro.prototype.updateProject = function(oldName,newName,callback)
{
	that = this;
	fs.readFile(that.filename,'utf8',function(err,data){
		var jsonObj = JSON.parse(data);
		var projects = that.jsonToProject(jsonObj);
		for(var i = 0 ; i < projects.length ; i++)
		{
			if(projects[i].name == oldName)
			{
				projects[i].name = newName;
				break;
			}
		}
	});
