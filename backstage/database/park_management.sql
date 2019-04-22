/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : 127.0.0.1:3306
Source Database       : park_management

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2019-04-20 16:16:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `password` varchar(255) NOT NULL,
  `carMoney` varchar(20) NOT NULL,
  `validDeadline` varchar(20) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'superadmin', 'e10adc3949ba59abbe56e057f20f883e', '5', '30');

-- ----------------------------
-- Table structure for cost
-- ----------------------------

-- 费用记录表
-- price1代表房租，price2代表物业费，price3代表水电费，price4代表停车费
-- priceType字段分别对应 0:按月 1:按季度 2:按年

DROP TABLE IF EXISTS `cost`;
CREATE TABLE `cost` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(16) NOT NULL,
  `code` varchar(16) NOT NULL,
  `car` varchar(255) DEFAULT NULL,
  `price1` varchar(20) NOT NULL,
  `price2` varchar(20) NOT NULL,
  `price3` varchar(20) NOT NULL,
  `price4` varchar(20) NOT NULL,
  `priceType` varchar(1) NOT NULL,
  `balance` varchar(20) NOT NULL,
  `startDay` varchar(20) NOT NULL,
  `endDay` varchar(20) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cost
-- ----------------------------

-- ----------------------------
-- Table structure for parking
-- ----------------------------

-- parking表
-- 记录外来车辆停车时间以及费用
-- end字段代表此条停车记录是否未结算,1:已结算

DROP TABLE IF EXISTS `parking`;
CREATE TABLE `parking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `car` varchar(255) NOT NULL,
  `startParking` varchar(255) NOT NULL,
  `end` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of parking
-- ----------------------------
INSERT INTO `parking` VALUES ('1', '京B253E', '2019-04-19 08:00', '');
INSERT INTO `parking` VALUES ('2', '京A253E', '2019-04-19 19:00', '');
INSERT INTO `parking` VALUES ('3', '津B213E', '2019-04-20 18:00', '');
INSERT INTO `parking` VALUES ('4', '京D253E', '2019-04-11 13:00', null);
INSERT INTO `parking` VALUES ('5', '浙A1063', '2019-04-13 12:00', '');
INSERT INTO `parking` VALUES ('6', '京A253E', '2019-04-02 08:00', null);
INSERT INTO `parking` VALUES ('7', '冀C133E', '2019-04-09 04:00', '');
INSERT INTO `parking` VALUES ('8', '沪B153E', '2019-04-29 05:00', null);
INSERT INTO `parking` VALUES ('9', '鲁B136E', '2019-04-29 05:00', null);
INSERT INTO `parking` VALUES ('10', '京B263E', '2019-04-19 08:00', '');
INSERT INTO `parking` VALUES ('11', '京B219E', '2019-04-19 08:00', '');
INSERT INTO `parking` VALUES ('12', '京B219E', '2019-04-19 08:00', '');
INSERT INTO `parking` VALUES ('13', '津B128E', '2019-04-20 18:00', '');
INSERT INTO `parking` VALUES ('14', '京B369E', '2019-04-11 13:00', null);
INSERT INTO `parking` VALUES ('15', '浙A1483', '2019-04-13 12:00', '');
INSERT INTO `parking` VALUES ('16', '京A368E', '2019-04-02 08:00', null);
INSERT INTO `parking` VALUES ('17', '冀C562E', '2019-04-09 04:00', '');
INSERT INTO `parking` VALUES ('18', '沪B478E', '2019-04-29 05:00', null);
INSERT INTO `parking` VALUES ('19', '鲁B546E', '2019-04-29 05:00', null);

-- ----------------------------
-- Table structure for room
-- ----------------------------

-- 仓库表
-- price1代表房租，price2代表物业费，price3代表水电费，price4代表停车费
-- isUse代表本仓库是否被使用，0表示未被使用，1表示被使用中
-- user字段中用','分开投标者，前缀'-'表示为租户，无前缀则为一般用户
-- description为仓库描述

DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(16) NOT NULL,
  `size` varchar(20) NOT NULL,
  `price1` varchar(20) NOT NULL,
  `price2` varchar(20) NOT NULL,
  `price3` varchar(20) NOT NULL,
  `price4` varchar(20) NOT NULL,
  `tel` varchar(11) NOT NULL,
  `isUse` varchar(1) NOT NULL,
  `user` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of room
-- ----------------------------
INSERT INTO `room` VALUES ('1', '001', '100', '2000', '30', '150', '300', '13525366987', '1', 'jerrywang', '价格便宜，物美价廉');
INSERT INTO `room` VALUES ('2', '002', '200', '5000', '100', '300', '400', '13225647896', '1', 'jerrywang', '高级仓库，适合放重要物品');
INSERT INTO `room` VALUES ('3', '003', '50', '1500', '30', '80', '70', '15247896542', '0', ' alex01 jerrywang', '小型仓库，适合个人租赁');
INSERT INTO `room` VALUES ('4', '004', '150', '3000', '60', '80', '90', '13698524569', '0', '', '中型仓库，位置靠门，交通方便');
INSERT INTO `room` VALUES ('5', '005', '100', '8000', '500', '400', '900', '13896587459', '0', '', '安全等级极高');
INSERT INTO `room` VALUES ('6', '006', '200', '3000', '200', '150', '320', '15254788562', '1', 'alex01', '测试仓库描述信息');
INSERT INTO `room` VALUES ('7', '007', '300', '8000', '400', '300', '150', '15225477856', '0', ' alex01', '测试仓库描述信息');
INSERT INTO `room` VALUES ('8', '008', '100', '2000', '30', '150', '300', '13525366987', '0', '', '价格便宜，物美价廉');
INSERT INTO `room` VALUES ('9', '009', '200', '5000', '100', '300', '400', '13225647896', '0', '', '高级仓库，适合放重要物品');
INSERT INTO `room` VALUES ('10', '010', '50', '1500', '30', '80', '70', '15247896542', '0', '', '小型仓库，适合个人租赁');
INSERT INTO `room` VALUES ('11', '011', '150', '3000', '60', '80', '90', '13698524569', '0', '', '中型仓库，位置靠门，交通方便');
INSERT INTO `room` VALUES ('12', '012', '100', '8000', '500', '400', '900', '13896587459', '0', '', '安全等级极高');
INSERT INTO `room` VALUES ('13', '013', '200', '3000', '200', '150', '320', '15254788562', '0', '', '测试仓库描述信息');
INSERT INTO `room` VALUES ('14', '014', '300', '8000', '400', '300', '150', '15225477856', '0', '', '测试仓库描述信息');
INSERT INTO `room` VALUES ('15', '015', '100', '8000', '500', '400', '900', '13896587459', '0', '', '安全等级极高');
INSERT INTO `room` VALUES ('16', '016', '200', '3000', '200', '150', '320', '15254788562', '1', 'alex01', '测试仓库描述信息');
INSERT INTO `room` VALUES ('17', '017', '300', '8000', '400', '300', '150', '15225477856', '0', ' alex01', '测试仓库描述信息');

-- ----------------------------
-- Table structure for token
-- ----------------------------
DROP TABLE IF EXISTS `token`;
CREATE TABLE `token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `deadline` varchar(20) NOT NULL,
  `user_id` varchar(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of token
-- ----------------------------
INSERT INTO `token` VALUES ('1', '9045539095', '1555749775763', '11');
INSERT INTO `token` VALUES ('3', '5644247486', '1555749761434', '1');
INSERT INTO `token` VALUES ('16', '4285603073', '1555749309363', '10');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tel` varchar(11) NOT NULL,
  `car` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('10', 'alex01', 'e10adc3949ba59abbe56e057f20f883e', '15903565236', '京B253W');
INSERT INTO `user` VALUES ('11', 'jerrywang', '0b679dcc69d9d0526c497f0d5f57ba44', '13612004497', '津A125ML');

-- ----------------------------
-- Table structure for valid
-- ----------------------------
DROP TABLE IF EXISTS `valid`;
CREATE TABLE `valid` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tel` varchar(11) NOT NULL,
  `valid` varchar(6) NOT NULL,
  `deadline` varchar(20) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `tel` (`tel`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- 存在手机号则更新验证码码，不存在则新增一行
-- INSERT INTO valid (tel,valid,deadline) VALUES('13552366545','123456', '132131')
-- ON DUPLICATE KEY 
-- UPDATE valid='111111'

-- ----------------------------
-- Records of valid
-- ----------------------------
INSERT INTO `valid` VALUES ('1', '15903565236', '419714', '1555660149898');
INSERT INTO `valid` VALUES ('2', '13612004497', '290793', '1555660190384');