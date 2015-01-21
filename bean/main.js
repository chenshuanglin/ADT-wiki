var Project = require('./Project');
var ChildProject = require('./childProject');

var fs = require("fs");
var data = 
{"project":[
	{
		'name':'6.0',
		'child':[
			{'childName':'项目1模块1'},
			{'childName':'项目1模块2'}
			]
	},
	{
		'name':'6.1',
		'child':[
			{'childName':'项目2模块1'},
			{'childName':'项目2模块2'}
			]
	}
	]
}

fs.writeFileSync('./test.json',JSON.stringify(data));
var jsonObj = JSON.parse(fs.readFileSync('./test.json'));
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

console.log(projects[0].name);
console.log(projects[1].child[0].childName);

var pro = new Project();
var child = new ChildProject("模块1");
var child2 = new ChildProject("模块2");
pro.setName("7.2");
pro.pushChild(child);
pro.pushChild(child2);

projects.push(pro);

projects.splice(0,1);
console.log(JSON.stringify(projects));

fs.writeFileSync('./test.json',JSON.stringify(projects));
