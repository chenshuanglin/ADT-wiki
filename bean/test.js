var OperatePro = require('./opreatePro');
var Project = require('./Project');
var ChildProject = require('./childProject');

var project = new Project();
var childProject1 = new ChildProject("chenshuanglin1");
var childProject2 = new ChildProject("chenshaunglin2");
project.setName('8.0');
project.child.push(childProject1);
project.child.push(childProject2);

var operate = new OperatePro("./test.json");
operate.addProject(project,function(err,judge){
	if(err){return;}
	if(judge)
	{
		console.log("tian jia cheng gong");
	}
});

