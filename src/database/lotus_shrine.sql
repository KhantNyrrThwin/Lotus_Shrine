-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2025 at 04:58 PM
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
(4, 'တရားလေ့လာခြင်းသည် ဗုဒ္ဓဘာသာ၏ နှလုံးသားဖြစ်သည်', 'ဆရာတော် မင်္ဂလာသီလာနန္ဒ');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int(20) NOT NULL,
  `user_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_email`, `name`, `age`, `user_password`) VALUES
(2, 'paiminthway13@gmail.com', 'Pai Min Thway', 20, '$2y$10$tr2XSd0UVRiFT0c4dI/r3.GM4WvnIZi0TZhU2uaE0awDhYTurcL3y'),
(3, 'nyarnyar@gmail.com', 'Nyar Nyar', 20, '$2y$10$WJBJbwe0xYwUwL3pBZBmSuA82Pw1uuWpuRk88EFj7jmHN2Kp66bKC'),
(4, 'nini@gmail.com', 'Ni Ni', 10, '$2y$10$fmNTFUkPDT7plWyKflAh..ZWylbl0hXb3qXOnfgy5IuQfE7iFUygm'),
(8, 'ttube5020@gmail.com', 'Fatty', 20, '$2y$10$SegnM3b53NTzYB.AfGt7au3OdqSV.b2ZImDEtKvqzFFAbxjoN5VIu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`quote_ID`);

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
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
