var Project = function(){
	this.name="";
	this.child = new Array();
}

Project.prototype.setName = function(name){
	this.name = name;
}

Project.prototype.getName = function(){
	return this.name;
}

Project.prototype.pushChild = function(childName){
	this.child.push(childName);
}

module.exports = Project;
