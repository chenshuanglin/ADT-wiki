var fs = require('fs');
var OpreatePro = function(filename)
{
	this.fliename = filename;
}

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

OpreatePro.prototype.addProject =  function(project,callback){
	that = this;
	fs.readFile(that.filename,'utf8',function(err,data){
		var jsonObj = JSON.parse(data);
		var projects = that.jsonToProject(jsonObj);
		projects.push(project);
		callback(err,projects);
	});
}

OpreatePro.prototype.showProject =  function(callback)
{
	that = this;
	fs.readFile(that.filename,'utf8',function(err,data){
		var jsonObj = JSON.parse(data);
		var projects = that.jsonToProject(jsonObj);
		callback(err,projects);
	});
}

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

OpreatePro.prototype.updateProject = function()
{
	that = this;
	fs.readFile(that.filename,'utf8',function(err,data){

}
