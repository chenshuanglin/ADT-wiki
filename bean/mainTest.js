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