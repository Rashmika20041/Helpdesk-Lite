-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: helpdesk_lite
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ticket_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_text` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ticket_id` (`ticket_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `priority` enum('LOW','MEDIUM','HIGH') DEFAULT 'LOW',
  `status` enum('OPEN','IN_PROGRESS','RESOLVED') DEFAULT 'OPEN',
  `user_id` int NOT NULL,
  `assigned_to` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (1,'sd','sd','MEDIUM','OPEN',3,NULL,'2025-11-03 07:38:12','2025-11-03 07:38:12'),(2,'ds','sd','HIGH','OPEN',3,NULL,'2025-11-03 07:39:37','2025-11-03 07:39:37'),(3,'ssd','ssd','LOW','OPEN',3,NULL,'2025-11-03 07:39:42','2025-11-03 07:39:42'),(4,'1','1','MEDIUM','RESOLVED',8,'Unassigned','2025-11-03 07:47:05','2025-11-03 07:48:09'),(5,'2','2','MEDIUM','IN_PROGRESS',8,'Unassigned','2025-11-03 07:47:10','2025-11-03 07:47:38'),(6,'example','examplee','MEDIUM','OPEN',9,NULL,'2025-11-03 08:06:51','2025-11-03 08:06:51');
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_general_ci DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Test User','t@test.com','tester','$2b$10$UWakHajVjNkmLHScsDO2o.RiIeTf0iPRnt/SKV9/3cP0AB.i6ZHfa','user','2025-11-03 06:03:18','2025-11-03 06:03:18'),(2,'Rashmika Perera','rashmikaperera330@gmail.com','perera','$2b$10$31dgeWbmoG9DD8JI1QZey.GLwWQ7Dt7bZMW8MgfzaI4wc3T7Rqy5u','user','2025-11-03 06:05:17','2025-11-03 06:05:17'),(3,'Perera','rashmikaperera@gmail.com','pereera','$2b$10$b3znkcvPc2yeLAPJJFeLzuSvTplm5sLlFzCUIlg52v2XCP5n4LWlO','user','2025-11-03 06:16:54','2025-11-03 06:16:54'),(4,'example','example@example.com','example','20040202','admin','2025-11-03 06:59:30','2025-11-03 06:59:30'),(5,'System Admin','admin@helpdesk.com','admin','$2b$10$4Zc5rlPZyTBBPdakE5AlIONcvWQpgecZR9gcdpKxSWGxV/6c.sBxC','admin','2025-11-03 07:10:47','2025-11-03 07:10:47'),(7,'example1','example@gmail.com','example1','20040202','admin','2025-11-03 07:18:21','2025-11-03 07:18:21'),(8,'Rashmika Perera','rashmika@gmail.com','Rashmik','$2b$10$pA3k/8zhxND5Swr/Jwpp3O//7W7.vzh.EQIqTAyUIpyO2GWXtdS/6','user','2025-11-03 07:46:52','2025-11-03 07:46:52'),(9,'example2','example2@gmail.com','example2','$2b$10$k9eYV0LdUcoM2b8v6Fly8e3BqTygwUGB9RdtiIm0leYNWH8mNCrMu','user','2025-11-03 08:06:21','2025-11-03 08:06:21');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-03 13:58:04
