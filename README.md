ADT-wiki
========
ALTER TABLE `adt_wiki`.`article` ADD COLUMN `contentTxt` TEXT NOT NULL  AFTER `type` ;
ALTER TABLE `adt_wiki`.`article` CHANGE COLUMN `contentTxt` `contentTxt` TEXT NOT NULL  AFTER `content` ;

//创建td_person表
CREATE  TABLE `adt_wiki`.`tb_person` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) )
DEFAULT CHARACTER SET = utf8;

//创建td_project表
CREATE  TABLE `adt_wiki`.`tb_project` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `projectName` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) )
DEFAULT CHARACTER SET = utf8;

//
CREATE  TABLE `adt_wiki`.`tb_project_list` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `project_id` VARCHAR(45) NOT NULL ,
  `project_list` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) )
DEFAULT CHARACTER SET = utf8;


INSERT INTO `adt_wiki`.`tb_project` (`id`, `projectName`) VALUES ('1', '6.0');
INSERT INTO `adt_wiki`.`tb_project` (`id`, `projectName`) VALUES ('2', '6.1');

INSERT INTO `adt_wiki`.`tb_project_list` (`id`, `project_id`, `project_list`) VALUES ('1', '1', '模块1');
INSERT INTO `adt_wiki`.`tb_project_list` (`id`, `project_id`, `project_list`) VALUES ('2', '1', '模块2');
INSERT INTO `adt_wiki`.`tb_project_list` (`id`, `project_id`, `project_list`) VALUES ('3', '2', '模块1');
INSERT INTO `adt_wiki`.`tb_project_list` (`id`, `project_id`, `project_list`) VALUES ('4', '2', '模块2');
INSERT INTO `adt_wiki`.`tb_project_list` (`id`, `project_id`, `project_list`) VALUES ('5', '1', '调试命令');
INSERT INTO `adt_wiki`.`tb_project_list` (`id`, `project_id`, `project_list`) VALUES ('6', '2', 
'调试命令');

CREATE  TABLE `adt_wiki`.`tb_public` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `title` VARCHAR(45) NOT NULL ,
  `content` TEXT NOT NULL ,
  `contentTxt` TEXT NOT NULL ,
  `type` VARCHAR(45) NOT NULL ,
  `date` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) )
DEFAULT CHARACTER SET = utf8;

