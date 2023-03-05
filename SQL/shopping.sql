# Host: localhost  (Version: 5.7.26)
# Date: 2023-03-05 13:20:54
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "shopping"
#

DROP TABLE IF EXISTS `shopping`;
CREATE TABLE `shopping` (
  `carId` int(11) NOT NULL AUTO_INCREMENT,
  `goodsId` int(11) NOT NULL DEFAULT '0',
  `userId` int(11) NOT NULL DEFAULT '0',
  `number` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`carId`)
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

#
# Data for table "shopping"
#

/*!40000 ALTER TABLE `shopping` DISABLE KEYS */;
INSERT INTO `shopping` VALUES (41,1,24,163),(44,8,24,22),(45,4,24,1),(46,9,24,8),(47,3,24,14),(48,40,24,1);
/*!40000 ALTER TABLE `shopping` ENABLE KEYS */;
