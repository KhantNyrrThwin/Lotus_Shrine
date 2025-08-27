-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 07, 2025 at 06:14 PM
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
(4, 'တရားလေ့လာခြင်းသည် ဗုဒ္ဓဘာသာ၏ နှလုံးသားဖြစ်သည်', 'ဆရာတော် မင်္ဂလာသီလာနန္ဒ'),
(5, 'တရားမဲ့သော ဥစ္စာသည် တရားရှိသော ဥစ္စာထက် တန်ဖိုးမရှိပါ', 'ဆရာတော် ဦးပညာသာရ'),
(6, 'စိတ်ကို အစိုးရနိုင်သူသည် လောကကို အစိုးရနိုင်သည်', 'ဂေါတမ ဗုဒ္ဓ'),
(7, 'ကမ္မအကျိုးသည် မလွတ်နိုင်သော အမှန်တရားတစ်ခု ဖြစ်သည်', 'မင်းတရား အရှင်'),
(8, 'စိတ်ငြိမ်းချမ်းမှသာ တကယ့်ပျော်ရွှင်မှုကို ရနိုင်သည်', 'အရှင် သာရနန္ဒ'),
(9, 'သန့်ရှင်းသောစိတ်သည် ကံအကျိုးအားလုံးထက် တန်ဖိုးကြီးသည်', 'ဆရာတော် ဦးဇောတိကာ'),
(10, 'တရားနာခြင်းသည် သမိုင်းတလျှောက် တန်ဖိုးအမြဲတည်မည့် ဥစ္စာဖြစ်သည်', 'ဆရာတော် ဦးအာနန္ဒ'),
(11, 'မိမိကိုယ်ကို အမြဲလေ့လာခြင်းက အခြားသူကို နားလည်စေသည်', 'ဆရာတော် ဦးဝိပဿနာ'),
(12, 'အကျိုးပြုမည့်စကားသာ ပြောပါ၊ အကျိုးမဲ့စကားကို အားလုံးက မေ့လျော့ကြသည်', 'ဗုဒ္ဓ'),
(13, 'မိမိစိတ်ကို မသိရင် လောကကို သိတတ်မည်မဟုတ်ပါ', 'ဆရာတော် ဦးအရဟံ'),
(14, 'ကမ္မသည် မိမိကိုယ်ပိုင်အမွေအဖြစ် အမြဲလိုက်ပါမည်', 'ပိဋကတ်'),
(15, 'နတ်ကမ္ဘာ၊ လူ့ကမ္ဘာကို အကျိုးရှိအောင် ဖက်ဆောင်နိုင်ရန် သန့်စင်စိတ်လိုအပ်သည်', 'ဆရာတော် ဦးစိတိသာရ');

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
(23, 'justicforyang@gmail.com', '::1', 1, '2025-07-07 21:52:36'),
(24, 'nini@gmail.com', '::1', 1, '2025-07-07 21:53:03'),
(29, 'ttube5020@gmail.com', '::1', 2, '2025-07-07 22:43:01');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int(20) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `reset_token` varchar(6) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_email`, `name`, `age`, `user_password`, `reset_token`, `reset_token_expiry`) VALUES
(2, 'paiminthway13@gmail.com', 'Pai Min Thway', 20, '$2y$10$tr2XSd0UVRiFT0c4dI/r3.GM4WvnIZi0TZhU2uaE0awDhYTurcL3y', NULL, NULL),
(3, 'justicforyang@gmail.com', 'Nyar Nyar', 20, '$2y$10$WJBJbwe0xYwUwL3pBZBmSuA82Pw1uuWpuRk88EFj7jmHN2Kp66bKC', '041212', '2025-07-07 17:27:36'),
(4, 'nini@gmail.com', 'Ni Ni', 10, '$2y$10$fmNTFUkPDT7plWyKflAh..ZWylbl0hXb3qXOnfgy5IuQfE7iFUygm', '415825', '2025-07-07 17:28:03'),
(8, 'ttube5020@gmail.com', 'Fatty', 20, '$2y$10$hT5fUooSAR9Gzx7cEXVi3uxybcBjR3NvtZEfIl.QKCyMN5tEMxjvq', NULL, NULL),
(9, 'paipai@gmail.com', 'ပိုင်မင်းသွေး', 20, '$2y$10$f9fOz.EG2ZTQb5ek/4aCmOiZeY9.N3ZWiVOOFk2QEt2trRMnRboIS', NULL, NULL),
(10, 'zilong52811@gmail.com', 'Raven', 20, '$2y$10$b7HfaY7jarDTY7eVmKJgJufdf/h435gbaviAnSgs06NY.p8d9tKky', '485899', '2025-07-07 17:29:03');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `quote_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `rate_limits`
--
ALTER TABLE `rate_limits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
