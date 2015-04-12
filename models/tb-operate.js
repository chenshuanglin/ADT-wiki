var tbOperate = function(){};
module.exports = tbOperate;
//根据表名得到表的中文名称
tbOperate.prototype.getChineseName = function (tb_name){
	var returnStr="";
	switch (tb_name){
		case "tb_public":
			returnStr = "公共文档";
			break;
		case "tb_person":
			returnStr = "个人文档";
			break;
		case "tb_newPerson":
			returnStr = "新员工学习文档";
			break;
		case "tb_other":
			returnStr = "其他文档";
			break;
		case "tb_links":
			returnStr = "相关链接";
			break;
		default:
			break;
	}
	return returnStr;
}

//判断是否在数据库中有这个表，没有返回false;

tbOperate.prototype.isTable = function (tb_name){
	var is_table = false;
	switch (tb_name){
		case "tb_public":
			is_table = true;
			break;
		case "tb_person":
			is_table = true;
			break;
		case "tb_newPerson":
			is_table = true;
			break;
		case "tb_other":
			is_table = true;
			break;
		case "tb_links":
			break;
		default:
			break;
		}
	return is_table;
}

//根据表的中文名，得到表的表名
tbOperate.prototype.getTablename = function (chineseName){
	var tableName = "";
	switch (chineseName){
		case "公共文档":
			tableName = "tb_public";
			break;
		case "个人文档":
			tableName = "tb_person";
			break;
		case "新员工学习文档":
			tableName = "tb_newPerson";
			break;
		case "其他文档":
			tableName = "tb_other";
			break;
		case "相关链接":
			tableName = "tb_links";
			break;
		default:
			break;
	}
	return tableName;
}

