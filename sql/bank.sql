# Host: localhost  (Version: 5.5.15)
# Date: 2018-07-04 19:33:18
# Generator: MySQL-Front 5.3  (Build 4.269)

/*!40101 SET NAMES gb2312 */;

#
# Structure for table "account"
#

DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `number` varchar(19) CHARACTER SET utf8 DEFAULT NULL COMMENT '账号',
  `password` varchar(6) COLLATE utf8_unicode_ci NOT NULL COMMENT '密码',
  `userId` varchar(64) CHARACTER SET utf8 DEFAULT NULL COMMENT '外键，user表的id',
  `principal` double DEFAULT '0' COMMENT '本金',
  `interest` double DEFAULT '0' COMMENT '利息',
  `isDelete` int(11) NOT NULL DEFAULT '0' COMMENT '销户状态（0：未销户，1：已销户）',
  `isActive` int(11) NOT NULL DEFAULT '0' COMMENT '激活状态（0：未激活，1：已激活）',
  `typeId` int(11) NOT NULL COMMENT '产品码',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `activeTime` datetime DEFAULT NULL COMMENT '激活时间',
  `isAutomateDeposit` int(11) DEFAULT '0' COMMENT '是否自动转存（0：否，1：是）',
  `isLost` int(11) DEFAULT '0' COMMENT '挂失状态（0：未挂失，1：已挂失）',
  `isFreeze` int(11) DEFAULT '0' COMMENT '冻结状态(0:未冻结，1：已冻结)',
  `accountBank` varchar(120) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '开户行',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Structure for table "admin"
#

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `role` int(1) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

#
# Structure for table "interest"
#

DROP TABLE IF EXISTS `interest`;
CREATE TABLE `interest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` varchar(32) NOT NULL,
  `rate` double NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

#
# Structure for table "product"
#

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(8) NOT NULL,
  `name` varchar(100) NOT NULL,
  `minMoney` double NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

#
# Structure for table "product_interest"
#

DROP TABLE IF EXISTS `product_interest`;
CREATE TABLE `product_interest` (
  `productId` int(11) NOT NULL DEFAULT '0',
  `interestId` int(11) NOT NULL DEFAULT '0',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`productId`,`interestId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

#
# Structure for table "transaction"
#

DROP TABLE IF EXISTS `transaction`;
CREATE TABLE `transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(64) NOT NULL DEFAULT '',
  `inAccount` int(11) DEFAULT NULL,
  `outAccount` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `money` double NOT NULL,
  `preSaveTime` varchar(32) DEFAULT NULL,
  `createTime` datetime NOT NULL,
  `withdrawTime` datetime DEFAULT NULL,
  `isFinished` int(1) DEFAULT '0',
  `state` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for table "type"
#

DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(2) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

#
# Structure for table "type_product"
#

DROP TABLE IF EXISTS `type_product`;
CREATE TABLE `type_product` (
  `typeId` int(11) NOT NULL DEFAULT '0',
  `productId` int(11) NOT NULL DEFAULT '0',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`typeId`,`productId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

#
# Structure for table "user"
#

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '姓名',
  `sex` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '性别',
  `IDNumber` varchar(18) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '身份证号',
  `credit` varchar(3) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '信用等级',
  `phoneNumber` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '电话',
  `address` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '地址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;
