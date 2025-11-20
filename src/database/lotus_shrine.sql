-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2025 at 05:37 AM
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
-- Table structure for table `ko_na_win_completions`
--

CREATE TABLE `ko_na_win_completions` (
  `completion_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `completed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_days` int(11) NOT NULL DEFAULT 81
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ko_na_win_completions`
--

INSERT INTO `ko_na_win_completions` (`completion_id`, `user_id`, `start_date`, `end_date`, `completed_at`, `total_days`) VALUES
(5, 15, '2025-07-15', '2025-09-17', '2025-09-15 18:59:06', 81),
(6, 15, '2025-09-15', '2025-09-17', '2025-09-15 19:11:14', 81),
(7, 12, '2025-10-12', '2025-10-12', '2025-10-12 02:19:02', 81),
(8, 12, '2025-10-29', '2025-10-29', '2025-10-29 12:40:43', 81),
(9, 12, '2025-11-10', '2025-11-10', '2025-11-10 12:13:11', 81);

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

--
-- Dumping data for table `ko_na_win_daily_log`
--

INSERT INTO `ko_na_win_daily_log` (`log_id`, `tracker_id`, `log_date`, `day_number`, `completion_status`) VALUES
(62, 25, '2025-09-13', 8, 1),
(63, 25, '2025-09-14', 9, 1),
(68, 29, '2025-09-14', 8, 1),
(69, 29, '2025-09-15', 9, 1),
(79, 37, '2025-11-13', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ko_na_win_tracker`
--

CREATE TABLE `ko_na_win_tracker` (
  `tracker_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `current_day_count` int(11) NOT NULL,
  `current_stage` int(11) NOT NULL DEFAULT 1,
  `is_completed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ko_na_win_tracker`
--

INSERT INTO `ko_na_win_tracker` (`tracker_id`, `user_id`, `start_date`, `current_day_count`, `current_stage`, `is_completed`) VALUES
(25, 8, '2025-09-14', 81, 9, 1),
(29, 15, '2025-09-15', 81, 9, 1),
(37, 12, '2025-11-14', 4, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `login_attempts`
--

CREATE TABLE `login_attempts` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `ip` varchar(45) NOT NULL,
  `attempts` int(11) NOT NULL DEFAULT 1,
  `last_attempt` datetime NOT NULL,
  `locked_until` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(1, 'တစ်ခုခုကို အရူးအမူး စွဲပြီဆိုရင် ဘဝသေပြီ လို့မှတ်ပါ။', 'ဆရာတော်ဦးဇောတိက'),
(2, 'တကယ်သိရင် မဟုတ်တာ မလုပ်ပါဘူး။ သိလျက်နဲ့ မဟုတ်တာ လုပ်သေးရင် မသိတဲ့သူထက် ဆိုးသွားပြီပေါ့။', 'ဓမ္မဒူတ-အရှင်ဆေကိန္ဒ'),
(3, 'ဘာပဲ ဖြစ်ခဲ့ဖြစ်ခဲ့၊ ဘယ်သူ့ကြောင့်ပဲ ဖြစ်ဖြစ် အတိတ်က ဖြစ်ခဲ့တာတွေထဲမှာ ထောင်ကျမနေဖို့ လိုတယ်။', 'အရှင်ဆန္ဒာဓိက'),
(4, 'မိမိကိုယ်ကို အမြဲတမ်း ပြုပြင်နေရမည်၊ ဘယ်အချိန်အထိ ပြုပြင်နေရမလဲဆိုလျင်၊ သေသည့်အချိန် အထိ ပြုပြင်ရမည်။', 'မဟာဂန္ဓာရုံဆရာတော်ဘုရားကြီး'),
(5, 'ကံဆိုတာ... ကောင်းကံနဲ့ ဆိုးကံမှာ လက်ဦးတဲ့ကံက အကျိုးပေးသွားတာပါပဲ ကောင်းတာလေးတွေ များများလုပ်ပေးထားကြ-', 'ပါချုပ်ဆရာတော် ဒေါက်တာအရှင်နန္ဒမာလာဘိဝံသ'),
(6, 'မိမိကိုယ်ကို အလေးထားခြင်း မိမိရဲ့ပတ်ဝန်းကျင်ကို အလေးထားခြင်း ဓမ္မကိုအလေးထားခြင်း လို့ဆိုတဲ့ အဲဒီအလေးထားမှု(၃)မျိုးဖြင့် ဘဝမှာနေထိုင်ရမယ်', 'ပါချုပ်ဆရာတော် ဒေါက်တာအရှင်နန္ဒမာလာဘိဝံသ'),
(7, 'ပေးနေကြတဲ့ လက်ဆောင်ထဲမှာ အကောင်းဆုံး လက်ဆောင်ဟာ ဓမ္မလက်ဆောင်ပါပဲ။', 'ပါချုပ်ဆရာတော် ဒေါက်တာအရှင်နန္ဒမာလာဘိဝံသ'),
(8, 'ချီးမွမ်းရင်လည်း ဝမ်းမသာနဲ့ ကဲ့ရဲ့ရှုတ်ခ်ရှရင်လည်း စိတ်မဆိုးနဲ့', 'ပါချုပ်ဆရာတော် ဒေါက်တာအရှင်နန္ဒမာလာဘိဝံသ'),
(9, 'သူများကို ဒုက္ခပေးခြင်းဖြင့် ကိုယ့်ချမ်းသာမှု့ကို ရှာလို့ လောကကြီးမှာ မရနိုင်ဘူး။', 'ပါချုပ်ဆရာတော် ဒေါက်တာအရှင်နန္ဒမာလာဘိဝံသ'),
(10, 'အသိဉာဏ်ရှိလေလေ လူမိုက်ဘဝကလွတ်လေလေ', 'ပါချုပ်ဆရာတော် ဒေါက်တာအရှင်နန္ဒမာလာဘိဝံသ'),
(11, 'လောင်ကျွမ်းခဲ့ရတဲ့ဘဝတွေ များလှပြီမို့ တစ်ဘဝလောက်ဝေလောက် အေးအေးချမ်းချမ်း နေကြည့်စမ်းစေချင်တယ်....', 'မဟာဗောဓိမြိုင်ဆရာတော်ဘုရားကြီး'),
(12, 'စီးပွားလည်းရှာပါ ကိုယ်ကျင့်တရားလည်းထိန်းပါ ဒါမှရလာတဲ့ စည်းစိမ်ဥစ္စာမြဲမယ်', 'ပါချုပ်ဆရာတော် ဒေါက်တာအရှင်နန္ဒမာလာဘိဝံသ'),
(13, 'တရားဆိုတာ နာရတယ်။ နာလို့ရှိရင် ဒီဘဝ အပြည့်အဝ နားမလည်လည်း မျိုးစေ့ကလေးတော့ ဖြစ်သွားတယ်။', 'ပါချုပ်ဆရာတော် ဒေါက်တာအရှင်နန္ဒမာလာဘိဝံသ'),
(14, 'တရားဓမ္မတွေကိုပျံ့နှံ့အောင်ဖြန့်ဝေတဲ့သူဆိုတာ မြတ်စွာဘုရားရဲ့ အလင်းစကားတွေ အလင်းတရားတွေကို ပျံ့နှံ့အောင် ဖြန့်ဝေတဲ့သူကို “အလင်းစေတမန်” လို့ ခေါ်ပါတယ်။', 'ဆရာတော် အရှင်ဆန္ဒာဓိက'),
(15, 'ရင်ထဲမာ အစဉ်အမြဲထိန်းသိမ်းရမှာက သဒ္ဒါဖြစ်သည်', 'ပါချုပ်ဆရာတော် ဒေါက်တာအရှင်နန္ဒမာလာဘိဝံသ'),
(16, 'အကျိုးပြုမည့်စကားသာ ပြောပါ၊ အကျိုးမဲ့စကားကို အားလုံးက မေ့လျော့ကြသည်', 'ဗုဒ္ဓ'),
(17, 'အကျိုးကောင်းကောင်းလိုချင်တဲ့စိတ်နဲ့ ကြိုးစားခဲ့တာမဟုတ်ပါဘူး။ အကြောင်းကောင်းကောင်း လုပ်ချင်တဲ့ စိတ်နဲ့ ကြိုးစားခဲ့တာပါ။', 'အရှင်ဆန္ဒာဓိက (ရွှေပါရမီတောရ)');

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
(23, 'justicforyang@gmail.com', '::1', 3, '2025-10-09 22:38:18'),
(24, 'nini@gmail.com', '::1', 1, '2025-07-07 21:53:03'),
(29, 'ttube5020@gmail.com', '::1', 4, '2025-07-09 10:41:05'),
(34, 'khantsihein2004@gmail.com', '::1', 1, '2025-09-14 21:40:16'),
(36, 'paiminthway13@gmail.com', '::1', 3, '2025-11-10 18:45:50');

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

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_email`, `name`, `dob`, `user_password`, `reset_token`, `reset_token_expiry`) VALUES
(4, 'nini@gmail.com', 'Ni Ni', '0000-00-00', '$2y$10$fmNTFUkPDT7plWyKflAh..ZWylbl0hXb3qXOnfgy5IuQfE7iFUygm', '415825', '2025-07-07 17:28:03'),
(8, 'ttube5020@gmail.com', 'Fatty', '0000-00-00', '$2y$10$9ZJ0muHP0HofyY7yAF6VcOpVgMvqAIHEQywSX6LXtu1sRRHVTYdie', NULL, NULL),
(9, 'paipai@gmail.com', 'ပိုင်မင်းသွေး', '0000-00-00', '$2y$10$f9fOz.EG2ZTQb5ek/4aCmOiZeY9.N3ZWiVOOFk2QEt2trRMnRboIS', NULL, NULL),
(10, 'zilong52811@gmail.com', 'Raven', '0000-00-00', '$2y$10$b7HfaY7jarDTY7eVmKJgJufdf/h435gbaviAnSgs06NY.p8d9tKky', '485899', '2025-07-07 17:29:03'),
(11, 'ravenpai@gmail.com', 'မောင်ပိုင်', '0000-00-00', '$2y$10$q5Tzu9rNA3n3bPszTGEkpuzB2rBZqK.riZIBnVs8XLO61vNHWp2Lq', NULL, NULL),
(12, 'paiminthway13@gmail.com', 'Pai Min Thway', '2005-08-18', '$2y$10$dgkOBaj7EcPZmAnwrRkpRevV6VgtVor2UG8s3.Ry0f5iBNb2T3eaa', NULL, NULL),
(13, 'justicforyang@gmail.com', 'Nyar Nyar', '2005-07-04', '$2y$10$Eau1TtRRm83I0WylAN889.XomXv9PvQTa.CrHeG7cRSdC9/XUWG0K', '786163', '2025-10-09 18:13:18'),
(14, 'bhonemyintmaung272@gmail.com', 'Bhone Gyi', '2005-02-27', '$2y$10$ue5GmdzyA6/o8gWPUXnZYeM6Rdmn9DQ/5XwsNDqq4Y7s5gkfxOFZa', NULL, NULL),
(15, 'khantsihein2004@gmail.com', 'Khant Si Hein', '2004-04-29', '$2y$10$cI8g4C/E5iJ2aGfXlLU0Q.DNi4loGXHOqBgEnhCBRwwHzpVehcCPu', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ko_na_win_completions`
--
ALTER TABLE `ko_na_win_completions`
  ADD PRIMARY KEY (`completion_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `ko_na_win_daily_log`
--
ALTER TABLE `ko_na_win_daily_log`
  ADD PRIMARY KEY (`log_id`),
  ADD UNIQUE KEY `unique_tracker_date` (`tracker_id`,`log_date`),
  ADD KEY `tracker_id` (`tracker_id`);

--
-- Indexes for table `ko_na_win_tracker`
--
ALTER TABLE `ko_na_win_tracker`
  ADD PRIMARY KEY (`tracker_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `login_attempts`
--
ALTER TABLE `login_attempts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email_ip` (`email`,`ip`),
  ADD KEY `email` (`email`),
  ADD KEY `ip` (`ip`),
  ADD KEY `locked_until` (`locked_until`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ko_na_win_completions`
--
ALTER TABLE `ko_na_win_completions`
  MODIFY `completion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `ko_na_win_daily_log`
--
ALTER TABLE `ko_na_win_daily_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `ko_na_win_tracker`
--
ALTER TABLE `ko_na_win_tracker`
  MODIFY `tracker_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `login_attempts`
--
ALTER TABLE `login_attempts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `quote_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `rate_limits`
--
ALTER TABLE `rate_limits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ko_na_win_completions`
--
ALTER TABLE `ko_na_win_completions`
  ADD CONSTRAINT `ko_na_win_completions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

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
