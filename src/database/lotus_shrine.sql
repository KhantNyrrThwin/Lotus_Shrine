-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2025 at 10:05 AM
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`quote_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `quote_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
