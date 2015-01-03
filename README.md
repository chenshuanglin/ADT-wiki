ADT-wiki
========
ALTER TABLE `adt_wiki`.`article` ADD COLUMN `contentTxt` TEXT NOT NULL  AFTER `type` ;
ALTER TABLE `adt_wiki`.`article` CHANGE COLUMN `contentTxt` `contentTxt` TEXT NOT NULL  AFTER `content` ;
