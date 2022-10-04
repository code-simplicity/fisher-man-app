/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.7.25-0ubuntu0.18.04.2 : Database - mo_yu_ucenter
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mo_yu_ucenter` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `mo_yu_ucenter`;

/*Table structure for table `uc_app` */

DROP TABLE IF EXISTS `uc_app`;

CREATE TABLE `uc_app` (
  `id` varchar(36) NOT NULL COMMENT 'ID',
  `app_name` varchar(64) DEFAULT NULL COMMENT '应用名称',
  `user_id` varchar(36) DEFAULT NULL COMMENT '创建者',
  `state` varchar(1) DEFAULT NULL COMMENT '1表示可用，0表示不可用',
  `app_key` varchar(32) DEFAULT NULL COMMENT '应用的id',
  `app_secret` varchar(128) DEFAULT NULL COMMENT '应用秘钥',
  `callback_url` varchar(1024) DEFAULT NULL COMMENT '回调地址',
  `app_icon` varchar(256) DEFAULT NULL COMMENT '图标地址',
  `app_description` varchar(512) DEFAULT NULL COMMENT '应用描述',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `uc_app` */

/*Table structure for table `uc_black_list` */

DROP TABLE IF EXISTS `uc_black_list`;

CREATE TABLE `uc_black_list` (
  `id` varchar(36) NOT NULL COMMENT 'ID',
  `user_id` varchar(36) DEFAULT NULL COMMENT '用户ID',
  `black_user_id` varchar(36) DEFAULT NULL COMMENT '黑名单ID',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `uc_black_list` */

/*Table structure for table `uc_fans` */

DROP TABLE IF EXISTS `uc_fans`;

CREATE TABLE `uc_fans` (
  `id` varchar(36) NOT NULL COMMENT 'ID',
  `user_id` varchar(36) DEFAULT NULL COMMENT '用户Id',
  `follow_id` varchar(36) DEFAULT NULL COMMENT '关注者的ID',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `uc_fans` */

/*Table structure for table `uc_images` */

DROP TABLE IF EXISTS `uc_images`;

CREATE TABLE `uc_images` (
  `id` varchar(36) NOT NULL COMMENT 'ID',
  `user_id` varchar(36) DEFAULT NULL COMMENT '用户ID',
  `md5` varchar(32) DEFAULT NULL COMMENT 'MD5值',
  `name` varchar(128) DEFAULT NULL COMMENT '文件名称',
  `url` varchar(512) DEFAULT NULL COMMENT 'url',
  `type` varchar(36) DEFAULT NULL COMMENT '类型：avatar,app_icon,cover',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `uc_images` */

/*Table structure for table `uc_login_record` */

DROP TABLE IF EXISTS `uc_login_record`;

CREATE TABLE `uc_login_record` (
  `id` varchar(36) NOT NULL COMMENT 'ID',
  `user_id` varchar(36) DEFAULT NULL COMMENT '用户ID',
  `ip` varchar(128) DEFAULT NULL COMMENT 'ip地址',
  `location` varchar(128) DEFAULT NULL COMMENT '地区',
  `login_from` varchar(10) DEFAULT NULL COMMENT '登录来源',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `uc_login_record` */

/*Table structure for table `uc_register_info` */

DROP TABLE IF EXISTS `uc_register_info`;

CREATE TABLE `uc_register_info` (
  `id` varchar(36) NOT NULL COMMENT 'ID',
  `user_id` varchar(36) DEFAULT NULL COMMENT '用户ID',
  `reg_time` datetime DEFAULT NULL COMMENT '注册时间',
  `reg_ip` varchar(128) DEFAULT NULL COMMENT '注册IP',
  `reg_from` varchar(10) DEFAULT NULL COMMENT '注册来源，PC，客户端，自定义渠道',
  `top` int(11) DEFAULT NULL COMMENT '全站第几位注册的',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `uc_register_info` */

/*Table structure for table `uc_settings` */

DROP TABLE IF EXISTS `uc_settings`;

CREATE TABLE `uc_settings` (
  `id` varchar(36) NOT NULL COMMENT 'ID',
  `key` varchar(64) DEFAULT NULL COMMENT '键',
  `value` varchar(128) DEFAULT NULL COMMENT '值',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `uc_settings` */

/*Table structure for table `uc_statistics` */

DROP TABLE IF EXISTS `uc_statistics`;

CREATE TABLE `uc_statistics` (
  `id` varchar(36) NOT NULL COMMENT 'ID',
  `user_id` varchar(36) DEFAULT NULL COMMENT '用户ID',
  `login_day` int(11) DEFAULT NULL COMMENT '登录天数',
  `register_time` datetime DEFAULT NULL COMMENT '注册时间',
  `fans` int(11) DEFAULT NULL COMMENT '粉丝数',
  `follows` int(11) DEFAULT NULL COMMENT '关注数',
  `on_time` int(11) DEFAULT NULL COMMENT '在线时长',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `uc_statistics` */

/*Table structure for table `uc_token` */

DROP TABLE IF EXISTS `uc_token`;

CREATE TABLE `uc_token` (
  `id` varchar(36) NOT NULL COMMENT 'ID',
  `user_id` varchar(36) DEFAULT NULL COMMENT '用户ID',
  `refresh_token` varchar(512) DEFAULT NULL COMMENT '刷新token',
  `token_key` varchar(32) DEFAULT NULL COMMENT 'token的md5值',
  `login_from` varchar(10) DEFAULT NULL COMMENT '登录来源',
  `app_id` varchar(36) DEFAULT NULL COMMENT '应用ID',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `uc_token` */

/*Table structure for table `uc_user` */

DROP TABLE IF EXISTS `uc_user`;

CREATE TABLE `uc_user` (
  `id` varchar(36) NOT NULL COMMENT 'ID',
  `user_name` varchar(64) DEFAULT NULL COMMENT '用户名',
  `password` varchar(128) DEFAULT NULL COMMENT '密码',
  `salt` varchar(32) DEFAULT NULL COMMENT '盐',
  `lev` int(11) DEFAULT NULL COMMENT '等级',
  `sex` varchar(10) DEFAULT NULL COMMENT '性别',
  `avatar` varchar(512) DEFAULT NULL COMMENT '头像地址',
  `sign` varchar(256) DEFAULT NULL COMMENT '签名',
  `deleted` varchar(1) DEFAULT NULL COMMENT '删除标记',
  `status` varchar(10) DEFAULT NULL COMMENT '用户状态',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `uc_user` */

/*Table structure for table `uc_user_info` */

DROP TABLE IF EXISTS `uc_user_info`;

CREATE TABLE `uc_user_info` (
  `id` varchar(36) NOT NULL COMMENT 'ID',
  `user_id` varchar(36) DEFAULT NULL COMMENT '用户ID',
  `phone_num` varchar(11) DEFAULT NULL COMMENT '手机号',
  `email` varchar(128) DEFAULT NULL COMMENT '邮箱地址',
  `compony` varchar(128) DEFAULT NULL COMMENT '公司地址',
  `position` varchar(128) DEFAULT NULL COMMENT '职位',
  `good_at` varchar(128) DEFAULT NULL COMMENT '擅长',
  `birthday` datetime DEFAULT NULL COMMENT '生日',
  `cover` varchar(256) DEFAULT NULL COMMENT '封面地址',
  `location` varchar(128) DEFAULT NULL COMMENT '所在地',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `uc_user_info` */

/*Table structure for table `uc_role` */

DROP TABLE IF EXISTS `uc_role`;

CREATE TABLE `uc_role` (
  `id` varchar(36) NOT NULL COMMENT 'ID',
  `name` varchar(255) DEFAULT NULL COMMENT '角色名称',
  `permissions` text COMMENT '权限配置',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色表';

/*Data for the table `uc_role` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
