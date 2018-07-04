# Host: localhost  (Version: 5.5.15)
# Date: 2018-07-04 19:33:18
# Generator: MySQL-Front 5.3  (Build 4.269)

/*!40101 SET NAMES gb2312 */;

#
# Structure for table "account"
#

DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '����',
  `number` varchar(19) CHARACTER SET utf8 DEFAULT NULL COMMENT '�˺�',
  `password` varchar(6) COLLATE utf8_unicode_ci NOT NULL COMMENT '����',
  `userId` varchar(64) CHARACTER SET utf8 DEFAULT NULL COMMENT '�����user���id',
  `principal` double DEFAULT '0' COMMENT '����',
  `interest` double DEFAULT '0' COMMENT '��Ϣ',
  `isDelete` int(11) NOT NULL DEFAULT '0' COMMENT '����״̬��0��δ������1����������',
  `isActive` int(11) NOT NULL DEFAULT '0' COMMENT '����״̬��0��δ���1���Ѽ��',
  `typeId` int(11) NOT NULL COMMENT '��Ʒ��',
  `createTime` datetime DEFAULT NULL COMMENT '����ʱ��',
  `activeTime` datetime DEFAULT NULL COMMENT '����ʱ��',
  `isAutomateDeposit` int(11) DEFAULT '0' COMMENT '�Ƿ��Զ�ת�棨0����1���ǣ�',
  `isLost` int(11) DEFAULT '0' COMMENT '��ʧ״̬��0��δ��ʧ��1���ѹ�ʧ��',
  `isFreeze` int(11) DEFAULT '0' COMMENT '����״̬(0:δ���ᣬ1���Ѷ���)',
  `accountBank` varchar(120) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '������',
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
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '����',
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '����',
  `sex` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '�Ա�',
  `IDNumber` varchar(18) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '���֤��',
  `credit` varchar(3) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '���õȼ�',
  `phoneNumber` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '�绰',
  `address` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '��ַ',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;
