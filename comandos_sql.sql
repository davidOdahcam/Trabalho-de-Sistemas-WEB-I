DROP DATABASE IF EXISTS `web1`;
CREATE DATABASE `web1`;
USE `web1`;
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `birthdate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);