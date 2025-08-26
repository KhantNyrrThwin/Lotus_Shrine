-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2025 at 04:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lotus_shrine`
--

-- --------------------------------------------------------

--
-- Table structure for table `ko_na_win_daily_log`
--

CREATE TABLE `ko_na_win_daily_log` (
  `log_id` int(11) NOT NULL,
  `tracker_id` int(11) NOT NULL,
  `log_date` date NOT NULL,
  `day_number` int(11) NOT NULL,
  `completion_status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ko_na_win_tracker`
--

CREATE TABLE `ko_na_win_tracker` (
  `tracker_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `current_day_count` int(11) NOT NULL,
  `is_completed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

CREATE TABLE `quotes` (
  `quote_ID` int(11) NOT NULL,
  `quote_name` varchar(255) NOT NULL,
  `quote_author` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `quotes`
--

INSERT INTO `quotes` (`quote_ID`, `quote_name`, `quote_author`) VALUES
(1, 'ရင်ထဲမာ အစဉ်အမြဲထိန်းသိမ်းရမှာက သဒ္ဒါဖြစ်သည်', 'ဒေါက်တာ နန္ဒမာလာဘိဝံသ'),
(2, 'တည်တံ့သော ပျော်ရွှင်မှုကို ရရှိလိုလျှင် ဗုဒ္ဓဓမ္မကို မိတ်ဖက်အဖြစ်ယူဖို့ လိုပါတယ်', 'ဒေါက်တာ နန္ဒမာလာဘိဝံသ'),
(3, 'ဤလောကတွင် မိမိကိုယ်ကို မသိသူသည် တကယ်မရှိပါ', 'မောလိဉ္စရိ ဆရာတော်'),
(4, 'တရားလေ့လာခြင်းသည် ဗုဒ္ဓဘာသာ၏ နှလုံးသားဖြစ်သည်', 'ဆရာတော် မင်္ဂလာသီလာနန္ဒ');

-- --------------------------------------------------------

--
-- Table structure for table `rate_limits`
--

CREATE TABLE `rate_limits` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `ip` varchar(45) NOT NULL,
  `attempts` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rate_limits`
--

INSERT INTO `rate_limits` (`id`, `email`, `ip`, `attempts`, `created_at`) VALUES
(23, 'justicforyang@gmail.com', '::1', 2, '2025-07-08 14:05:49'),
(24, 'nini@gmail.com', '::1', 1, '2025-07-07 21:53:03'),
(29, 'ttube5020@gmail.com', '::1', 4, '2025-07-09 10:41:05');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `reset_token` varchar(6) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `koenawin_progress`
--

CREATE TABLE `koenawin_progress` (
  `user_email` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `completed_dates` longtext DEFAULT NULL CHECK (json_valid(`completed_dates`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_email`, `name`, `dob`, `user_password`, `reset_token`, `reset_token_expiry`) VALUES
(4, 'nini@gmail.com', 'Ni Ni', '0000-00-00', '$2y$10$fmNTFUkPDT7plWyKflAh..ZWylbl0hXb3qXOnfgy5IuQfE7iFUygm', '415825', '2025-07-07 17:28:03'),
(8, 'ttube5020@gmail.com', 'Fatty', '0000-00-00', '$2y$10$9ZJ0muHP0HofyY7yAF6VcOpVgMvqAIHEQywSX6LXtu1sRRHVTYdie', NULL, NULL),
(9, 'paipai@gmail.com', 'ပိုင်မင်းသွေး', '0000-00-00', '$2y$10$f9fOz.EG2ZTQb5ek/4aCmOiZeY9.N3ZWiVOOFk2QEt2trRMnRboIS', NULL, NULL),
(10, 'zilong52811@gmail.com', 'Raven', '0000-00-00', '$2y$10$b7HfaY7jarDTY7eVmKJgJufdf/h435gbaviAnSgs06NY.p8d9tKky', '485899', '2025-07-07 17:29:03'),
(11, 'ravenpai@gmail.com', 'မောင်ပိုင်', '0000-00-00', '$2y$10$q5Tzu9rNA3n3bPszTGEkpuzB2rBZqK.riZIBnVs8XLO61vNHWp2Lq', NULL, NULL),
(12, 'paiminthway13@gmail.com', 'Raven', '2005-08-18', '$2y$10$ryjyIfTQ5jAmEgFu3mBU6..C5fm9zR0PD6rvipNymve9uAAszbbaW', NULL, NULL),
(13, 'justicforyang@gmail.com', 'Nyar Nyar', '2005-07-04', '$2y$10$Eau1TtRRm83I0WylAN889.XomXv9PvQTa.CrHeG7cRSdC9/XUWG0K', NULL, NULL),
(14, 'bhonemyintmaung272@gmail.com', 'Bhone Gyi', '2005-02-27', '$2y$10$ue5GmdzyA6/o8gWPUXnZYeM6Rdmn9DQ/5XwsNDqq4Y7s5gkfxOFZa', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ko_na_win_daily_log`
--
ALTER TABLE `ko_na_win_daily_log`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `tracker_id` (`tracker_id`);

--
-- Indexes for table `ko_na_win_tracker`
--
ALTER TABLE `ko_na_win_tracker`
  ADD PRIMARY KEY (`tracker_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`quote_ID`);

--
-- Indexes for table `rate_limits`
--
ALTER TABLE `rate_limits`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email_ip` (`email`,`ip`),
  ADD KEY `email` (`email`),
  ADD KEY `ip` (`ip`),
  ADD KEY `created_at` (`created_at`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `koenawin_progress`
--
ALTER TABLE `koenawin_progress`
  ADD UNIQUE KEY `uniq_user_email` (`user_email`),
  ADD KEY `start_date` (`start_date`);

--
-- Constraints for table `koenawin_progress`
--
ALTER TABLE `koenawin_progress`
  ADD CONSTRAINT `fk_koenawin_user_email` FOREIGN KEY (`user_email`) REFERENCES `users` (`user_email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ko_na_win_daily_log`
--
ALTER TABLE `ko_na_win_daily_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ko_na_win_tracker`
--
ALTER TABLE `ko_na_win_tracker`
  MODIFY `tracker_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `quote_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `rate_limits`
--
ALTER TABLE `rate_limits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ko_na_win_daily_log`
--
ALTER TABLE `ko_na_win_daily_log`
  ADD CONSTRAINT `ko_na_win_daily_log_ibfk_1` FOREIGN KEY (`tracker_id`) REFERENCES `ko_na_win_tracker` (`tracker_id`) ON DELETE CASCADE;

--
-- Constraints for table `ko_na_win_tracker`
--
ALTER TABLE `ko_na_win_tracker`
  ADD CONSTRAINT `ko_na_win_tracker_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
