//创建数据库
CREATE SCHEMA `adtWiki` DEFAULT CHARACTER SET utf8 ;

//创建tb_public表
CREATE  TABLE `adtWiki`.`tb_public` (
  `tb_id` INT NOT NULL AUTO_INCREMENT ,
  `tb_title` VARCHAR(100) NOT NULL ,
  `tb_content` TEXT NOT NULL ,
  `tb_contentTxt` TEXT NOT NULL ,
  `tb_classify` VARCHAR(100) NOT NULL ,
  `tb_date` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`tb_id`) )
DEFAULT CHARACTER SET = utf8;

