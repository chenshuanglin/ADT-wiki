var fs = require('fs');
var Project = require('./Project');
var ChildProject = require('./childProject');
var AllProjects = require('./allProjects');

var OpreatePro = function(filename)
{
	this.filename = filename;
}

module.exports = OpreatePro;
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

//把projects写入文件中
OpreatePro.prototype.projectsToFile = function(projects){
	var allProjects = new AllProjects();
	allProjects.project = projects;
	fs.writeFileSync(this.filename,JSON.stringify(allProjects));
}

//增加项目
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
			that.projectsToFile(projects);
		}
		callback(err,judge);
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
		var judge = false;
		for(var i = 0 ; i < projects.length ; i++)
		{
			if(projects[i].name == projectName)
			{
				judge = true;
				projects.splice(i,1);
				that.projectsToFile(projects);
				break;
			}
		}
		callback(err,judge);
	});
}

//更新项目的名称
OpreatePro.prototype.updateProject = function(oldName,newName,callback)
{
	that = this;
	fs.readFile(that.filename,'utf8',function(err,data){
		var jsonObj = JSON.parse(data);
		var projects = that.jsonToProject(jsonObj);
		var judge = false;
		for(var i = 0 ; i < projects.length ; i++)
		{
			if(projects[i].name == oldName)
			{
				judge = true;
				projects[i].name = newName;
				that.projectsToFile(projects);
				break;
			}
		}
		callback(err,judge);
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
		var judge = true; //判断是否添加成功
		for(var i = 0 ; i < projects.length ; i++)
		{
			var childs = projects[i].child;
			if(projects[i].name == projectName)
			{
				//判断是否跟项目中的子目录重名
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
		if(judge && index != -1)
		{
			projects[index].child.push(childProject);
			that.projectsToFile(projects);
		}
		callback(err,judge);
	});
}

//根据项目名以及子目录名删除指定的项目子目录
OpreatePro.prototype.deleteChild = function(projectName,childName,callback)
{
	that = this;
	fs.readFile(that.filename,'utf8',function(err,data){
		var jsonObj = JSON.parse(data);
		var projects = that.jsonToProject(jsonObj);
		var judge = false;  //判断是否删除成功
		for(var i = 0 ; i < projects.length ; i++)
		{
			if(projects[i].name == projectName)
			{
				var childs = projects[i].child;
				for(var j = 0 ; j < childs.length; j++)
				{
					var child = childs[j];
					if(child.childName == childName)
					{
						projects[i].child[j].splice(j,1);
						judge = true;
						break;
					}
				}
				break;
			}
		}
		if(judge)
		{
			that.projectsToFile(projects);
		}
		callback(err,judge);
	});
}

//更新项目中子目录的的名称
OpreatePro.prototype.updateChild = function(projectName,oldName,newName,callback)
{
	that = this;
	fs.readFile(that.filename,'utf8',function(err,data){
		var jsonObj = JSON.parse(data);
		var projects = that.jsonToProject(jsonObj);
		var judge = false;
		for(var i = 0 ; i < projects.length ; i++)
		{
			if(projects[i].name == projectName)
			{
				var childs = projects[i].child;
				for(var j = 0 ; j < childs.length ; j++)
				{
					var child = childs[j];
					if(child.childName == oldName)
					{
						judge = true;
						projects[i].child[j].childName = newName;
						break;
					}
				}
				break;
			}
			break;
		}
		if(judge)
		{
			that.projectsToFile(projects);
		}
		callback(err,judge);
	});
}


