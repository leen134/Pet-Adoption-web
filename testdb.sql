-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 31, 2025 at 12:06 PM
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
-- Database: `testdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `adoption_form`
--

CREATE TABLE `adoption_form` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `pet_type` varchar(50) DEFAULT NULL,
  `experience` varchar(50) DEFAULT NULL,
  `household` varchar(50) DEFAULT NULL,
  `pet_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adoption_form`
--

INSERT INTO `adoption_form` (`id`, `user_id`, `full_name`, `email`, `phone`, `address`, `pet_type`, `experience`, `household`, `pet_id`) VALUES
(1, 1, 'leen aj', 'leenaboujibeen@gmail.com', '70975376', 'hamra street', 'cat', 'beginner', 'family', NULL),
(2, 1, 'leen aj', 'leenaboujibeen@gmail.com', '70975376', 'hamra street', 'dog', 'beginner', 'family', NULL),
(3, 1, 'leen aj', 'leenaboujibeen@gmail.com', '70975376', 'hamra street', 'dog', 'experienced', 'family', 2),
(4, 1, 'leen aj', 'jebeenleen@gmail.com', '76017481', 'hamra street', 'dog', 'beginner', 'alone', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `foods`
--

CREATE TABLE `foods` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `safe` tinyint(1) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `foods`
--

INSERT INTO `foods` (`id`, `name`, `category`, `safe`, `notes`) VALUES
(1, 'Chicken (cooked, plain)', 'Protein', 1, 'Remove bones and skin'),
(2, 'Beef (cooked, lean)', 'Protein', 1, 'Plain, no seasoning'),
(3, 'Salmon (cooked)', 'Protein', 1, 'Rich in omega-3'),
(4, 'Carrots', 'Vegetables', 1, 'Raw or cooked'),
(5, 'Plain Rice', 'Grains', 1, 'Good for upset stomach'),
(6, 'Chocolate', 'Toxic', 0, 'HIGHLY TOXIC'),
(7, 'Grapes / Raisins', 'Toxic', 0, 'Kidney failure risk'),
(8, 'Onions', 'Toxic', 0, 'Damages red blood cells'),
(9, 'Xylitol', 'Toxic', 0, 'DEADLY');

-- --------------------------------------------------------

--
-- Table structure for table `medical`
--

CREATE TABLE `medical` (
  `id` int(11) NOT NULL,
  `pet_id` int(11) NOT NULL,
  `vaccinations` text DEFAULT NULL,
  `medications` text DEFAULT NULL,
  `allergies` text DEFAULT NULL,
  `vet_name` varchar(255) DEFAULT NULL,
  `vet_clinic` varchar(255) DEFAULT NULL,
  `vet_phone` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medical`
--

INSERT INTO `medical` (`id`, `pet_id`, `vaccinations`, `medications`, `allergies`, `vet_name`, `vet_clinic`, `vet_phone`) VALUES
(1, 1, '[{\"name\":\"Rabies\",\"nextDue\":\"2025-10-15\"},{\"name\":\"DHPP\",\"nextDue\":\"2025-11-20\"}]', '[{\"name\":\"Heartgard Plus\",\"dosage\":\"Monthly\",\"notes\":\"Prevents heartworm\"}]', 'None', 'Dr. Abir', 'Happy Paws Veterinary', '76022333'),
(2, 3, '[{\"name\":\"Rabies\",\"nextDue\":\"2025-10-15\"},{\"name\":\"DHPP\",\"nextDue\":\"2025-11-20\"}]', '[{\"name\":\"Heartgard Plus\",\"dosage\":\"Monthly\",\"notes\":\"Prevents heartworm\"}]', 'None', 'Dr. Abir', 'Happy Paws Veterinary', '76022333'),
(3, 4, '[{\"name\":\"Rabies\",\"nextDue\":\"2025-10-15\"},{\"name\":\"DHPP\",\"nextDue\":\"2025-11-20\"}]', '[{\"name\":\"Heartgard Plus\",\"dosage\":\"Monthly\",\"notes\":\"Prevents heartworm\"}]', 'None', 'Dr. Abir', 'Happy Paws Veterinary', '76022333'),
(4, 5, '[{\"name\":\"Rabies\",\"nextDue\":\"2025-10-15\"},{\"name\":\"DHPP\",\"nextDue\":\"2025-11-20\"}]', '[{\"name\":\"Heartgard Plus\",\"dosage\":\"Monthly\",\"notes\":\"Prevents heartworm\"}]', 'None', 'Dr. Abir', 'Happy Paws Veterinary', '76022333'),
(5, 2, '[{\"name\":\"Rabies\",\"nextDue\":\"2025-10-15\"},{\"name\":\"DHPP\",\"nextDue\":\"2025-11-20\"}]', '[{\"name\":\"Heartgard Plus\",\"dosage\":\"Monthly\",\"notes\":\"Prevents heartworm\"}]', 'None', 'Dr. Abir', 'Happy Paws Veterinary', '76022333'),
(6, 6, '[{\"name\":\"Rabies\",\"nextDue\":\"2025-10-15\"},{\"name\":\"DHPP\",\"nextDue\":\"2025-11-20\"}]', '[{\"name\":\"Heartgard Plus\",\"dosage\":\"Monthly\",\"notes\":\"Prevents heartworm\"}]', 'None', 'Dr. Abir', 'Happy Paws Veterinary', '76022333');

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

CREATE TABLE `pets` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `breed` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `personality` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pets`
--

INSERT INTO `pets` (`id`, `name`, `breed`, `age`, `image`, `location`, `personality`, `description`, `type`) VALUES
(1, 'Charlie', 'Hamster', 1, 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&auto=format&fit=crop', 'Austin, TX', 'Small,Cute,Low-maintenance', 'Charlie is an adorable hamster who loves to run on his wheel and munch on seeds.', 'small pets'),
(2, 'Max', 'Golden Retriever', 3, 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop', 'San Francisco, CA', 'Friendly,Energetic,Playful', 'Max is a loving and energetic dog who loves to play fetch and go for long walks.', 'dog'),
(3, 'Bella', 'Dutch Dwarf Rabbit', 2, 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&auto=format&fit=crop', 'Seattle, WA', 'Gentle,Quiet,Curious', 'Bella is a gentle rabbit who enjoys exploring and munching on fresh vegetables.', 'small pets'),
(4, 'Mittens', 'Persian Cat', 3, 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&auto=format&fit=crop', 'Boston, MA', 'Calm,Affectionate,Fluffy', 'Mittens is a fluffy Persian cat who loves to be pampered and cuddled.', 'cat'),
(5, 'Rocky', 'Beagle', 4, 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop', 'Chicago, IL', 'Friendly,Curious,Energetic', 'Rocky is a friendly beagle who loves to sniff around and explore new places.', 'dog'),
(6, 'Luna', 'Ginger Cat', 2, 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&auto=format&fit=crop', 'New York, NY', 'Calm,Affectionate,Independent', 'Luna is a sweet and independent cat who enjoys quiet afternoons and gentle pets.', 'cat');

-- --------------------------------------------------------

--
-- Table structure for table `pet_match_form`
--

CREATE TABLE `pet_match_form` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `time` varchar(3) DEFAULT NULL,
  `finances` varchar(3) DEFAULT NULL,
  `commitment` varchar(3) DEFAULT NULL,
  `stability` varchar(3) DEFAULT NULL,
  `responsibility` varchar(3) DEFAULT NULL,
  `support` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pet_match_form`
--

INSERT INTO `pet_match_form` (`id`, `user_id`, `time`, `finances`, `commitment`, `stability`, `responsibility`, `support`) VALUES
(1, 1, 'yes', 'yes', 'yes', 'yes', 'yes', 'yes'),
(2, 29, 'yes', 'yes', 'yes', 'no', 'yes', 'yes'),
(3, 25, 'no', 'no', 'no', 'yes', 'no', 'no'),
(4, 30, 'no', 'no', 'no', 'no', 'no', 'no'),
(5, 32, 'no', 'no', 'no', 'no', 'yes', 'no');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `age`, `email`, `password`, `phone`) VALUES
(1, 'leen', 20, 'leenaboujibeen@gmail.com', '$2b$10$IXur00XHN9t7XqJ8pACsZe.w.AxThGr0sTuaz1RpLG9ZCmwm0ErI6', NULL),
(21, 'leen', 20, 'ajleen55@gmail.com', '$2b$10$wbPt2m2EQ8sPndeFq0z1XeujynFeu0Ubg4D54XDJ9A6C8dCsy.EKW', NULL),
(22, 'Leen Abou Al Jibeen ', 30, 'lynn@gmail.com', '$2b$10$N4y6pJnahXi4DXVDv/Z09OuqJ33TasFr2QKGVd9kkrGSd57KouUfG', NULL),
(23, 'Mila AJ', 23, 'Mila@gmail.com', '$2b$10$.zF69XnuYhvogwzeBNG3Lus6hi92dxLaiNS/NPW3sWwLEWuS32Wl6', NULL),
(24, 'Afifa Jaroudi', 58, 'Afifajaroudi@hotmail.com', '$2b$10$dsqSQLqoDrZ.niNIsyEPtuZh9JRCaBA9.FtaC9T47DglV5pLIzptq', NULL),
(25, 'Hassan AJ', 32, 'Hassanj@hotmail.com', '$2b$10$hzeDF9wZYupoPoyG3OI9VOiezyQByMugA.poVwUnn7FYNkQwfRfxS', NULL),
(26, 'Jad Jibeen ', 24, 'Jadaboujebeen@gmail.com', '$2b$10$Gcc1wr3fSHb6r1cULaYT3uOO4NNWpUieGUPApMPpG0GtTbVEGG9US', NULL),
(28, 'Mila Jibeen', 28, 'Mila.aj@gmail.com', '$2b$10$mggdBKXQn3UA03n31PxQz.OySdd8j9xiOYPXVpti3b2W4WWUJmzKm', NULL),
(29, 'Rana Mohammad', 50, 'rana.ahmad@gmail.com', '$2b$10$ONz3ugYdD6VcKb7IsaNLPOdU.8tXb4N0me7hKZUxtkX4gsqmOoe6e', NULL),
(30, 'Salam Eid', 38, 'salameid2@gmail.com', '$2b$10$8BYJf5mSnml2mkKrP9FVKed.h8rTO7EnqZzx9AekUcrbfE0Zy8Sn6', NULL),
(31, 'Mila A', 18, 'mila1@gmail.com', '$2b$10$ni7opyANY/Urd/o2ZqDCwepIT4sxmhFIHXlB9TZSWrFK6bzDij5gS', NULL),
(32, 'Alice Reda', 27, 'Alice123@gmail.com', '$2b$10$.pXmviRSO0LI2SuAaHMAputZeWMO9bOpqHk9U1d/LAzpAOzuM3QH2', NULL),
(33, 'Ali ', 22, 'ali23@gmail.com', '$2b$10$4.dG9LQN6ewoL9ajyuukd.FVdYSJVyAvHf1TJPcXOkve3vmPZWmxu', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adoption_form`
--
ALTER TABLE `adoption_form`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medical`
--
ALTER TABLE `medical`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pet_id` (`pet_id`);

--
-- Indexes for table `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pet_match_form`
--
ALTER TABLE `pet_match_form`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adoption_form`
--
ALTER TABLE `adoption_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `medical`
--
ALTER TABLE `medical`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pets`
--
ALTER TABLE `pets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pet_match_form`
--
ALTER TABLE `pet_match_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adoption_form`
--
ALTER TABLE `adoption_form`
  ADD CONSTRAINT `adoption_form_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `medical`
--
ALTER TABLE `medical`
  ADD CONSTRAINT `medical_ibfk_1` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pet_match_form`
--
ALTER TABLE `pet_match_form`
  ADD CONSTRAINT `pet_match_form_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
