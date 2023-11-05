-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2023 at 02:11 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tin_tin`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_deleted` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `image`, `is_deleted`, `created_at`) VALUES
(2, 'Category 1', 'images/340-front.jpeg', 0, '2023-10-17 11:46:40'),
(3, 'Category 2', 'images/1-category1.jpg', 0, '2023-10-24 14:17:06'),
(4, 'Category 3', 'images/162-category1.jpg', 0, '2023-10-24 14:19:03'),
(5, 'Category 4', 'images/933-category1.jpg', 0, '2023-10-24 14:20:00');

-- --------------------------------------------------------

--
-- Table structure for table `chat_conversations`
--

CREATE TABLE `chat_conversations` (
  `id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `customer_id` int(11) DEFAULT NULL,
  `provider_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chat_conversations`
--

INSERT INTO `chat_conversations` (`id`, `created_at`, `customer_id`, `provider_id`) VALUES
(6, '2023-10-28 18:04:42', 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `id` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `conversation_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `reciver_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chat_messages`
--

INSERT INTO `chat_messages` (`id`, `message`, `created_at`, `conversation_id`, `sender_id`, `reciver_id`) VALUES
(3, 'Hi', '2023-10-28 18:25:03', 6, 3, 2),
(4, 'testt', '2023-10-28 18:31:55', 6, 3, 2),
(5, 'test22', '2023-10-28 18:32:18', 6, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `commenter_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `is_deleted` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `comment`, `created_at`, `commenter_id`, `post_id`, `is_deleted`) VALUES
(1, 'Lorem 11 Ipsum 22 is 33 simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2023-10-19 23:14:56', 3, 1, 0),
(6, 'Comment 1', '2023-10-25 18:59:05', 3, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `review` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `customer_id` int(11) DEFAULT NULL,
  `provider_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT 1,
  `sub_category_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `review`, `created_at`, `customer_id`, `provider_id`, `status_id`, `sub_category_id`, `service_id`) VALUES
(2, 'Good Service', '2023-10-19 23:48:48', 3, 2, 4, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_type_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `created_at`, `user_type_id`) VALUES
(1, 'add_region', '2023-10-16 23:36:06', 1),
(2, 'get_region', '2023-10-16 23:36:06', 1),
(3, 'add_category', '2023-10-16 23:36:06', 1),
(4, 'edit_category', '2023-10-16 23:36:06', 1),
(5, 'delete_category', '2023-10-16 23:36:06', 1),
(6, 'get_category', '2023-10-16 23:36:06', 1),
(7, 'delete_post', '2023-10-16 23:36:06', 1),
(8, 'get_post', '2023-10-16 23:36:06', 1),
(9, 'delete_service', '2023-10-16 23:36:06', 1),
(10, 'get_service', '2023-10-16 23:36:06', 1),
(11, 'get_orders', '2023-10-16 23:38:01', 1),
(12, 'get_region', '2023-10-16 23:39:37', 2),
(13, 'get_category', '2023-10-16 23:39:37', 2),
(14, 'get_post', '2023-10-16 23:39:37', 2),
(15, 'get_orders', '2023-10-16 23:39:37', 2),
(16, 'delete_service', '2023-10-16 23:39:37', 2),
(17, 'get_service', '2023-10-16 23:39:37', 2),
(18, 'add_service', '2023-10-16 23:39:37', 2),
(19, 'edit_service', '2023-10-16 23:39:37', 2),
(30, 'get_region', '2023-10-16 23:42:19', 3),
(31, 'get_category', '2023-10-16 23:42:19', 3),
(32, 'get_post', '2023-10-16 23:42:19', 3),
(33, 'add_post', '2023-10-16 23:42:19', 3),
(34, 'edit_post', '2023-10-16 23:42:19', 3),
(35, 'delete_post', '2023-10-16 23:42:19', 3),
(36, 'get_orders', '2023-10-16 23:42:19', 3),
(37, 'add_orders', '2023-10-16 23:42:19', 3),
(38, 'cancel_orders', '2023-10-16 23:42:19', 3),
(39, 'get_service', '2023-10-16 23:42:19', 3),
(40, 'get_users', '2023-10-17 13:56:22', 1),
(41, 'get_users', '2023-10-17 13:56:22', 2),
(42, 'update_user', '2023-10-17 13:57:02', 1),
(43, 'update_user', '2023-10-17 13:57:02', 2),
(44, 'update_user', '2023-10-17 13:57:02', 3),
(45, 'delete_user', '2023-10-17 14:22:27', 1),
(46, 'delete_user', '2023-10-17 14:22:27', 2),
(47, 'delete_user', '2023-10-17 14:22:27', 3),
(48, 'delete_region', '2023-10-19 23:48:41', 1),
(49, 'add_comment', '2023-10-20 02:12:23', 3),
(50, 'get_comment', '2023-10-20 02:12:23', 3),
(51, 'get_comment', '2023-10-20 02:12:23', 1),
(52, 'delete_comment', '2023-10-20 02:20:59', 3),
(53, 'update_comment', '2023-10-20 02:20:59', 3),
(54, 'update_status', '2023-10-20 03:18:19', 3),
(55, 'update_status', '2023-10-20 03:18:19', 2),
(56, 'update_service_status', '2023-10-24 22:40:15', 1),
(57, 'get_users', '2023-10-25 14:00:12', 3),
(58, 'get_comment', '2023-10-25 23:50:30', 2),
(59, 'conversation_control', '2023-10-28 00:31:26', 3),
(60, 'conversation_control', '2023-10-28 00:31:26', 2);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `main_image` varchar(255) NOT NULL,
  `is_deleted` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `poster_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `sub_category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `description`, `main_image`, `is_deleted`, `created_at`, `poster_id`, `category_id`, `sub_category_id`) VALUES
(1, 'This is the updated posttt', 'images/329-keycoid.jpeg', 0, '2023-10-19 22:34:13', 3, 4, 3),
(5, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has su', 'images/604-company1.jpg', 0, '2023-10-25 19:51:55', 3, 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `regions`
--

CREATE TABLE `regions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `is_deleted` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `regions`
--

INSERT INTO `regions` (`id`, `name`, `created_at`, `is_deleted`) VALUES
(1, 'Khalda', '2023-10-17 13:02:22', 0),
(2, 'Umm Al summaq', '2023-10-19 20:44:49', 0),
(3, 'Dabpuq', '2023-10-24 12:18:58', 0),
(4, 'Baqaa', '2023-10-24 12:20:40', 0);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `default_image` varchar(255) DEFAULT NULL,
  `is_deleted` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `provider_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `description`, `default_image`, `is_deleted`, `created_at`, `provider_id`, `category_id`, `sub_category_id`, `status_id`) VALUES
(1, 'TITLE 1', 'Lorem 11 Ipsum  11 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'images/408-keycoid.jpeg', 0, '2023-10-19 13:55:57', 2, 2, 1, 2),
(8, 'TITLE 2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'images/754-company1.jpg', 0, '2023-10-25 20:58:59', 2, 5, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

CREATE TABLE `statuses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `statuses`
--

INSERT INTO `statuses` (`id`, `name`, `created_at`) VALUES
(1, 'PENDING', '2023-10-19 16:57:29'),
(2, 'ACCEPTED', '2023-10-19 16:57:29'),
(3, 'REJECTED', '2023-10-19 16:57:29'),
(4, 'CANCELED', '2023-10-19 16:57:29');

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_deleted` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `name`, `image`, `is_deleted`, `created_at`, `category_id`) VALUES
(1, 'SUB CATEGORY 1', 'images/471-keycoid.jpeg', 0, '2023-10-19 00:23:02', 2),
(2, 'Sub Category 2', 'images/4-category1.jpg', 0, '2023-10-24 14:39:35', 5),
(3, 'Sub Category 3', 'images/716-category1.jpg', 0, '2023-10-24 14:39:50', 4),
(4, 'Sub Cateogory 4', 'images/442-category1.jpg', 0, '2023-10-24 14:41:45', 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT 'defaultUser.png',
  `active` int(11) NOT NULL DEFAULT 1,
  `is_deleted` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_type_id` int(11) DEFAULT NULL,
  `region_id` int(11) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `nick_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `phone`, `image`, `active`, `is_deleted`, `created_at`, `user_type_id`, `region_id`, `first_name`, `last_name`, `nick_name`) VALUES
(1, 'moh@gmail.com', '$2b$10$cC9DV9wFbIbUsfgL0a7umu.YZgtwLL.7ooIulb6r4tYKNKOyvZXcy', '0795009184', 'defaultUser.png', 1, 0, '2023-10-17 10:10:48', 1, 1, 'Mohammad', 'Majali', 'Samrie'),
(2, 'ahmad@gmail.com', '$2b$10$uSNylLLKCSFHXkIQaS5NQuONLG5d1T1P9KSVC3.IRI49U/5vuU8VW', '0795009184', 'defaultUser.png', 1, 0, '2023-10-17 10:14:22', 2, 1, 'Ahmad', 'Tarsha', 'Mabo'),
(3, 'ibrahim@gmail.com', '$2b$10$mj5kxtHxxhX3dC102YGUyu9wJ8PanewscGETJLyGu4F.CXmhHnuZq', '0795009184', 'defaultUser.png', 1, 0, '2023-10-17 10:16:20', 3, 1, 'Ibrahim', 'Hushki', 'Ibo'),
(4, 'basheer@gmail.com', '$2b$10$SU1.l4lt3.5I012cJHhJq.XLfQOjkt1siE9z9lPmE8mU3hYf399Fm', '0795009184', 'defaultUser.png', 1, 0, '2023-10-17 10:20:11', 3, 1, 'Bashir', 'ahmad', 'beshi'),
(5, 'bashar@gmail.com', '$2b$10$zXEEUv4bBmlDfaKSbKpzy.0CEKJdaT4sOG/R7b6YfmwWxBF13IqXS', '0795009184', 'defaultUser.png', 1, 0, '2023-10-17 10:21:32', 3, 1, 'Bashar', 'ahmad', 'besho');

-- --------------------------------------------------------

--
-- Table structure for table `user_types`
--

CREATE TABLE `user_types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_types`
--

INSERT INTO `user_types` (`id`, `name`, `created_at`) VALUES
(1, 'ADMIN', '2023-10-17 02:25:35'),
(2, 'PROVIDER', '2023-10-17 02:25:35'),
(3, 'CUSTOMER', '2023-10-17 02:25:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_conversations`
--
ALTER TABLE `chat_conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `provider_id` (`provider_id`);

--
-- Indexes for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_messages_sender_id_foreign_idx` (`sender_id`),
  ADD KEY `chat_messages_reciver_id_foreign_idx` (`reciver_id`),
  ADD KEY `conversation_id` (`conversation_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commenter_id` (`commenter_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `provider_id` (`provider_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `sub_category_id` (`sub_category_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_type_id` (`user_type_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `poster_id` (`poster_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `sub_category_id` (`sub_category_id`);

--
-- Indexes for table `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `provider_id` (`provider_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `sub_category_id` (`sub_category_id`),
  ADD KEY `status_id` (`status_id`);

--
-- Indexes for table `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_type_id` (`user_type_id`),
  ADD KEY `region_id` (`region_id`);

--
-- Indexes for table `user_types`
--
ALTER TABLE `user_types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `chat_conversations`
--
ALTER TABLE `chat_conversations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `regions`
--
ALTER TABLE `regions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_types`
--
ALTER TABLE `user_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat_conversations`
--
ALTER TABLE `chat_conversations`
  ADD CONSTRAINT `chat_conversations_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `chat_conversations_ibfk_2` FOREIGN KEY (`provider_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD CONSTRAINT `chat_messages_ibfk_4` FOREIGN KEY (`conversation_id`) REFERENCES `chat_conversations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `chat_messages_reciver_id_foreign_idx` FOREIGN KEY (`reciver_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `chat_messages_sender_id_foreign_idx` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`commenter_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_4` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_34` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_35` FOREIGN KEY (`provider_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_36` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_37` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_38` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `permissions`
--
ALTER TABLE `permissions`
  ADD CONSTRAINT `permissions_ibfk_1` FOREIGN KEY (`user_type_id`) REFERENCES `user_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`poster_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_3` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_ibfk_10` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `services_ibfk_11` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `services_ibfk_12` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `services_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `services_ibfk_6` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `services_ibfk_9` FOREIGN KEY (`provider_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD CONSTRAINT `sub_categories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_19` FOREIGN KEY (`user_type_id`) REFERENCES `user_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_20` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
