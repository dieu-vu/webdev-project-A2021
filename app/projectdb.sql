-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2021 at 01:44 PM
-- Server version: 5.5.68-MariaDB
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE IF NOT EXISTS `activity` (
  `activity_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `location` text NOT NULL,
  `description` text NOT NULL,
  `filename` text NOT NULL,
  `owner` int(11) NOT NULL,
  `VST` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `VET` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`activity_id`, `name`, `location`, `description`, `filename`, `owner`, `VST`, `VET`) VALUES
(14, 'Hiking', 'Espoo', 'Hiking in Nuuksio', 'f7ab22def71d542757f65fcb8ea3258a', 8, '2021-12-08 09:18:03', '2022-11-30 17:00:00'),
(15, 'Fishing', 'Espoo', 'Fishing in Nuuksio', '34a10943cfd1e406ef28d2d9150769ab', 7, '2021-12-01 09:57:44', '2022-01-01 12:00:00'),
(17, 'Swimming', 'Helsinki', 'Swimming in this weekend', 'a00f631933d073d58219cd0959e89296', 1, '2021-12-03 11:13:08', '2022-01-29 12:00:00'),
(18, 'Skating', 'Helsinki', 'Skating in this weekend', '796e675a85a4ee4bf4a0eb64d4c27962', 8, '2021-12-04 22:00:00', '2022-01-10 12:00:00'),
(19, 'Card games', 'Vantaa', 'Play card game in this weekend', '78baf8f1b80f6f5d0d76b3a3fb6e69de', 13, '2021-12-04 23:52:58', '2021-12-20 12:00:00'),
(75, 'Plane spotting', 'Helsinki-Vantaa airport', 'Sunday is the busiest time at Helsinki Airport as it''s the departure time of many flights. There are also some enthusiast present. If you are one of us, please come along! ', '1639241120881.jpg', 130, '2021-12-11 16:45:20', '2021-12-19 08:00:00'),
(76, 'Badminton', 'Kirkkonummi', 'I am looking for a buddy to play with. If we get more people then we should get a club.', '1639243232633.jpg', 130, '2021-12-11 17:20:32', '2021-12-28 18:00:00'),
(77, 'Horseback riding', 'Rovaniemi', 'Sunday morning sunset on the back of a horse. Going through a forest.', '1639243314922.jpg', 130, '2021-12-11 17:21:55', '2021-12-26 08:00:00'),
(79, 'Horseback riding', 'Espoo', 'Forest ride', '1639328701398.jpg', 94, '2021-12-12 17:05:01', '2021-12-13 13:00:00'),
(80, 'Badminton', 'Nummela', 'Buddy?', '1639329932576.jpg', 94, '2021-12-12 17:25:32', '2022-01-07 07:00:00'),
(81, 'Camping', 'Teijo', 'Camping trip to the forest. Lets put the tents up under the stars.', '1639397458184.jpg', 94, '2021-12-13 12:10:58', '2022-05-20 21:00:00'),
(82, 'Badminton', 'Turku', 'Looking for a badminton buddy.', '1639407176755.jpg', 94, '2021-12-13 14:52:56', '2021-12-30 09:00:00'),
(83, 'Basketball', 'Helsinki', 'Lets play ball', '1639485666546.jpeg', 94, '2021-12-14 12:41:06', '2022-01-18 12:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `comment_in`
--

CREATE TABLE IF NOT EXISTS `comment_in` (
  `comment_id` int(11) NOT NULL,
  `participant_id` int(11) DEFAULT NULL,
  `activity_id` int(11) DEFAULT NULL,
  `u_comment` text NOT NULL,
  `p_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comment_in`
--

INSERT INTO `comment_in` (`comment_id`, `participant_id`, `activity_id`, `u_comment`, `p_time`) VALUES
(9, 4, 15, 'Hope we will catch some big fish', '2021-12-11 10:43:32'),
(10, 43, 15, 'how to we get there?', '2021-12-11 10:43:32'),
(11, 24, 15, 'you can take bus 1234', '2021-12-11 10:43:32'),
(13, 4, 14, 'Looking forward to playing with you guys', '2021-12-11 10:43:32'),
(14, 42, 17, 'How much does the ticket cost?', '2021-12-11 10:43:32'),
(16, 4, 17, 'just joined', '2021-12-12 15:11:11'),
(97, 13, 79, 'test', '2021-12-13 09:17:20'),
(98, 4, 80, 'this random pic looks awesome!!!!!!!!  ?', '2021-12-13 09:21:44'),
(102, 94, 81, 'hello', '2021-12-14 11:08:52'),
(103, 94, 82, 'still here?', '2021-12-14 11:09:16'),
(104, 94, 17, 'I will be there 30 minutes early, anyone else?', '2021-12-14 11:10:23'),
(111, 94, 14, 'I always loved badminton', '2021-12-14 12:58:37'),
(112, 94, 18, 'Not sure if it''s cold enough for the ice to be frozen. Has anyone been skating yet this year? Would love to hear some comments about this.', '2021-12-14 13:00:43'),
(113, 94, 75, 'I saw next generations electric plane the other day.', '2021-12-14 13:01:56');

-- --------------------------------------------------------

--
-- Table structure for table `participate_in`
--

CREATE TABLE IF NOT EXISTS `participate_in` (
  `participant` int(11) NOT NULL,
  `activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `participate_in`
--

INSERT INTO `participate_in` (`participant`, `activity`) VALUES
(1, 14),
(1, 15),
(1, 17),
(1, 19),
(1, 75),
(1, 80),
(1, 81),
(4, 15),
(4, 17),
(4, 75),
(4, 76),
(94, 15),
(94, 75),
(94, 79),
(94, 81),
(94, 82),
(96, 15),
(105, 14),
(112, 15),
(130, 15),
(130, 17),
(130, 75),
(130, 80),
(130, 81),
(130, 82);

-- --------------------------------------------------------

--
-- Table structure for table `p_user`
--

CREATE TABLE IF NOT EXISTS `p_user` (
  `user_id` int(11) NOT NULL,
  `email` text NOT NULL,
  `name` text NOT NULL,
  `password` text NOT NULL,
  `user_filename` varchar(30) DEFAULT NULL,
  `role` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `p_user`
--

INSERT INTO `p_user` (`user_id`, `email`, `name`, `password`, `user_filename`, `role`) VALUES
(1, 'dieu-test@metropolia.fi', 'Dieu Vu', '$2a$10$rUP0VWwfq2GiuEkMnH3Tf.5pOzc7zJ8JSBgX4Tp2nXbr6dmpO7j7W', '1639486472414.png', 0),
(4, 'xiaoming@metropolia.fi', 'Xiaoming Ma', '$2a$10$bi6CpCvjsLl8kjZ8mkIuOekeyMKPl.64JmlMWQjIvk/YQ/eNX80Sq', '1639487173528.png', 0),
(5, 'mikkel@mail.com', 'Mikkel Soprano', '$2a$10$bi6CpCvjsLl8kjZ8mkIuOekeyMKPl.64JmlMWQjIvk/YQ/eNX80Sq', '', 1),
(6, 'Poornima@yahoo.com', 'Poornima Irja', '$2a$10$bi6CpCvjsLl8kjZ8mkIuOekeyMKPl.64JmlMWQjIvk/YQ/eNX80Sq', '', 1),
(7, 'Khava@gmail.com', 'Khava Gali', '$2a$10$bi6CpCvjsLl8kjZ8mkIuOekeyMKPl.64JmlMWQjIvk/YQ/eNX80Sq', '', 1),
(8, 'Jessica@metropolia.fi', 'Jessica Medrod', '$2a$12$9vXolUEUeUoS3J31nGbc0OK4X.zPgkLHk50TOhSMMKa9IF1uM.tE.', '', 2),
(10, 'michael@gmail.com', 'Michael Karen', '$2a$10$bi6CpCvjsLl8kjZ8mkIuOekeyMKPl.64JmlMWQjIvk/YQ/eNX80Sq', '', 1),
(13, 'lisaSmai@metropolia.fi', 'Lisa Smai', '$2a$12$CG9z0czgS4DkH8iO40t7oulK0BLFfzBo2nvj331isOr72TbCc9EEe', '', 2),
(24, 'stephany@gmail.com', 'Stephany Step', '$2a$12$5EiDdAuDlhsf/BfIV4LoO.jKEltxBYU5ZfDMDG1YsJLCmFvnN.5JK', 'profile.png', 2),
(42, 'maxi@metropolia.fi', 'Maximilian Webster', '$2a$12$bHFotteEl6o9Dwx9ifmyGuOnry31QQrGJGEGnmzCcebMqj3j.xCY2', 'profile.png', 1),
(43, 'sarah@metropolia.fi', 'Sarah Williams', '$2a$12$niqW0RpM3EkzinuC.pe0iuIqYl.BF8zKQbge9S6rHat7xXH.od9PO', 'cat2.webp', 1),
(63, 'lina.mols@gmail.com', 'Lina Mols', '$2a$12$XireoU3aIsGXILIxAyThred39Z5nsXvEADYu2Z5wyiEbf5/m4tGvy', '45d16b0139139b95a62672fac2b1f5', 2),
(94, 'jasmin@metropolia.fi', 'Jasmin Partanen', '$2a$12$PVDhMyrOoUIyf0WF1csPOeub29JsuR8vMH4BpA7iL9fHIt17HR6k2', '1639331935897.jpeg', 0),
(95, 'dasfsadf@metropolia.fi', 'adsfasdf', '$2a$12$I7TlNutIQ7PmykR3IlJlKeY1cPfyfWsAIlNHncAS/ITGATZMpurle', '1639090505464.png', 1),
(96, 'testuser@gmail.com', 'testuser', '$2a$10$bi6CpCvjsLl8kjZ8mkIuOekeyMKPl.64JmlMWQjIvk/YQ/eNX80Sq', '1639125997624.png', 1),
(97, 'Test@gmail.com', 'Test User', '$2a$12$IbevIGau8r9q3xsvf2hwG.Fsp/FF0bK1hbSOJbdOnVEYwXLI45Foq', '1639127408043.png', 1),
(98, 'testuser@mail.com', 'testuser', '$2a$12$t1k5tcBQMsVexsr1pa24keJXC5nvo9.HPzy1qCXibnnICkh3Th7R.', '1639131464996.png', 1),
(99, 'teset@mail.com', 'test', '$2a$12$amtJmek2swp50rdEMcFf1e2nhSGsqapXReNNPxUZ0/AoAGFaSMhsu', '1639132374412.jpeg', 1),
(100, 'test@gmail.com', 'Test user', '$2a$12$e9BOeGrjpky.xyVRy9Ezb.33b1xMXkX8vMg8PjoYzGiyX96M9ZwI2', '1639133860938.png', 1),
(101, 'test@gmail.com', 'Test user', '$2a$12$ogt1xRh6JXnlEvItTccyU.3QnKqXfWCV6D6osLBkShu0gWyxwPJYO', '1639133904973.png', 1),
(105, 'alifah@gmail.com', 'alifah', '$2a$12$Fuk4lPbMw27XPi3J46oQZO0HTdYWBIg8FS8lK8G2AqyLtGQgk.wtO', '1639135361259.jpeg', 1),
(106, 'woopwopp@gmail.com', 'Sirja', '$2a$12$8fAGik5/xynyyBLm0Fw.g.NLZYycvu1w6p0J9B87iwMsQLa00809u', '1639136809447.png', 1),
(107, 'andrasa@metropolia.fi', 'András Ádám', '$2a$12$hDzqgrQjAglXOX2mP/f4ZeFWy.6fZUTqkKkjVoBJ0K..uyeHTtIMm', '1639137435173.jpg', 1),
(108, 'tester@test.com', 'Tester', '$2a$12$21oKCYrBQmOy/l6YKj3s3.e1YAweEtGelqzIbPhezrJUPZoS30S7u', '1639137934427.jpg', 1),
(109, 'mimi@gmail.com', 'mimi', '$2a$12$pm417zc9MFwSljgDnHvWSOdnve1uiQw9gKwGyWCTEftxuIt6rmgnu', '1639138582341.jpeg', 1),
(110, 'testuser@gmail.com', 'test', '$2a$12$XWSP4HXP5K1vphxNfoFt4.Kns.Uh5IrP59e0nCjWQQ3N3jo0rC.DO', '1639138827667.jpeg', 1),
(112, 'techno_viking_666@OGmail.com', 'techno_viking_666', '$2a$12$PDcuQIBn42QsHedccSJst.5sS45XC6BpEKXGxIn/BQaSha/xorWQC', '1639139181795.png', 1),
(113, 'hello@there.com', 'Kenobi', '$2a$12$.lTItOVufe/p2dKU5YrDVOF7xTBoW7LDfsrPBKH8PH58TzRUVw7oW', '1639139904966.jpg', 1),
(115, 'testuser1@mail.com', 'testuser', '$2a$12$ZE2ZsSEfh7tRBJF68K2C4.t3BCSsFjkQEgzl6RDEcM2Tfqk.FvLfi', '', 1),
(116, 'testuser1@mail.com', 'testuser', '$2a$12$65K8qEJVNB3KWhjGEc.ZyO.1vmRjVNujLHWLR8QocXnhNS0kLKNX6', '', 1),
(121, 'test_nullpic@mail.com', 'testuser_nullpic', '$2a$12$iyHrBgNbhPsW4PNuWZ6f0er.8U8Wt8tjLTjO6tb27jhWqUdTfOreW', NULL, 1),
(123, 'testuser1@mail.com', 'Testnew', '$2a$12$1WEbHnljXUO4b4zaiSa0uewWEzou/nSWZmmrKgRKCLdsn21MWrq/y', NULL, 1),
(124, 'testuser1@mail.com', 'Test email validation', '$2a$12$n.9ctX5OUa6i2Us6S4fMtuqG/yyg0Jzo6BP8LJlp0tiy67b5SUBwi', NULL, 1),
(125, 'anewemail@mail.fi', 'new test email validation', '$2a$12$hHVeTkm41NzmPs222tr69u5xzBNQ7GYjgGJRUkOAzO5oe6TJviMHO', NULL, 1),
(126, 'test_valid_email@mail.com', 'Test valid email', '$2a$12$iLiU6v5HV/PE1LuHQxIiiuUK0hc62.Yx7gL8Q0zLniyHrL2HZQQxe', NULL, 1),
(128, 'valid_email_1@mail.com', 'valid email 1', '$2a$12$Vr.RjWnW.CBgoFp.irFWm.K1LMDx0wwLyh0w2ueJG1QLDmePTSqm.', NULL, 1),
(129, 'validemail@mail.com', 'valid email register test', '$2a$12$sUzmqwythRuny0tCMJeNl.NwKncwLPA366x9R6O5zGi.rJT55YJcW', NULL, 1),
(130, 'wop@gmail.com', 'Wopper Salt', '$2a$12$mVkSCt01E0O4DREf/G/w0eFUGbx/vRTpX4f.ShVmWSZ15g6RSk9b.', '1639243449685.jpeg', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`activity_id`,`VST`),
  ADD KEY `owner` (`owner`);

--
-- Indexes for table `comment_in`
--
ALTER TABLE `comment_in`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `participant_id` (`participant_id`),
  ADD KEY `activity_id` (`activity_id`);

--
-- Indexes for table `participate_in`
--
ALTER TABLE `participate_in`
  ADD PRIMARY KEY (`participant`,`activity`),
  ADD KEY `participant` (`participant`),
  ADD KEY `activity` (`activity`);

--
-- Indexes for table `p_user`
--
ALTER TABLE `p_user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=84;
--
-- AUTO_INCREMENT for table `comment_in`
--
ALTER TABLE `comment_in`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=114;
--
-- AUTO_INCREMENT for table `p_user`
--
ALTER TABLE `p_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=132;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `p_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment_in`
--
ALTER TABLE `comment_in`
  ADD CONSTRAINT `comment_in_ibfk_2` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_in_ibfk_1` FOREIGN KEY (`participant_id`) REFERENCES `p_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `participate_in`
--
ALTER TABLE `participate_in`
  ADD CONSTRAINT `participate_in_ibfk_1` FOREIGN KEY (`participant`) REFERENCES `p_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `participate_in_ibfk_2` FOREIGN KEY (`activity`) REFERENCES `activity` (`activity_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
