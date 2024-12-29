-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 29, 2024 at 06:20 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pharmatrack`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `CustomerID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expense`
--

CREATE TABLE `expense` (
  `ExpenseID` int(11) NOT NULL,
  `Category` enum('Rent','Utilities','Salaries','Maintenance') NOT NULL,
  `Description` varchar(200) DEFAULT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expense`
--

INSERT INTO `expense` (`ExpenseID`, `Category`, `Description`, `Amount`, `Date`) VALUES
(3, 'Rent', 'Shop rent for December', 20000.00, '2024-12-25'),
(5, 'Salaries', 'Salary of December', 25000.00, '2024-12-24');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `ItemID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` varchar(100) DEFAULT NULL,
  `Category` varchar(50) NOT NULL,
  `BatchNumber` varchar(50) NOT NULL,
  `AddedDate` date NOT NULL,
  `ExpiryDate` date DEFAULT NULL,
  `Quantity` int(11) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `SupplierID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`ItemID`, `Name`, `Description`, `Category`, `BatchNumber`, `AddedDate`, `ExpiryDate`, `Quantity`, `Price`, `SupplierID`) VALUES
(2, 'Amoxicillin 500mg', 'Broad-spectrum antibiotic', 'Antibiotic', 'AX20240115', '2024-01-15', '2026-01-15', 500, 12.00, 1),
(3, 'Ibuprofen 200mg', 'Pain reliever and anti-inflammatory', 'Pain Relief', 'IB20231120', '2023-11-20', '2025-11-20', 1000, 5.75, 2),
(4, 'Lisinopril 10mg', 'ACE inhibitor for blood pressure', 'Cardiovascular', 'LS20240201', '2024-02-01', '2026-02-01', 750, 8.00, 3),
(5, 'Amoxicillin 500mg', 'Broad-spectrum antibiotic', 'Antibiotic', 'AX20240115', '2024-01-15', '2026-01-15', 500, 12.50, 1),
(6, 'Ibuprofen 200mg', 'Pain reliever and anti-inflammatory', 'Pain Relief', 'IB20231120', '2023-11-20', '2025-11-20', 1000, 5.75, 2),
(8, 'Amoxicillin 500mg', 'Broad-spectrum antibiotic', 'Antibiotic', 'AX20240115', '2024-01-15', '2026-01-15', 45, 12.50, 1),
(9, 'Ibuprofen 200mg', 'Pain reliever and anti-inflammatory', 'Pain Relief', 'IB20231120', '2023-11-20', '2024-11-20', 1000, 5.75, 2),
(11, 'Vitamin C 1000mg', 'Immune system booster', 'Vitamins', 'VC20240310', '2024-03-10', '2026-03-10', 2000, 3.25, 5),
(12, 'Paracetamol 500mg', 'Fever reducer and pain reliever', 'Pain Relief', 'PC20240405', '2024-04-05', '2026-04-05', 1500, 4.50, 1),
(22, 'Test Medicine', 'Test Description', 'Category1', 'Batch123', '2024-12-28', '2025-01-01', 10, 100.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `InvoiceID` int(11) NOT NULL,
  `SalesID` int(11) NOT NULL,
  `DateIssued` date NOT NULL,
  `TotalAmount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`InvoiceID`, `SalesID`, `DateIssued`, `TotalAmount`) VALUES
(1, 10, '2024-12-28', 11.50),
(7, 16, '2024-12-28', 8.00),
(8, 17, '2024-12-28', 11.50),
(9, 18, '2024-12-29', 8.00),
(10, 19, '2024-12-29', 9.00),
(11, 20, '2024-12-29', 9.75);

-- --------------------------------------------------------

--
-- Table structure for table `prescription`
--

CREATE TABLE `prescription` (
  `PrescriptionID` int(11) NOT NULL,
  `DateIssued` date NOT NULL,
  `MedicationDetails` varchar(200) NOT NULL,
  `Instructions` varchar(200) NOT NULL,
  `UserID` int(11) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prescription`
--

INSERT INTO `prescription` (`PrescriptionID`, `DateIssued`, `MedicationDetails`, `Instructions`, `UserID`, `status`) VALUES
(4, '2024-12-27', 'Painkillers', 'Take after meals', 6, 'Pending'),
(9, '2024-12-28', 'Napa | 500 mg', 'Serious headache', 33, 'Pending'),
(12, '2024-12-29', 'Napa Extra', 'Extream fever', 6, 'Delivered');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `SalesID` int(11) NOT NULL,
  `InventoryID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `TotalPrice` decimal(10,2) NOT NULL,
  `Date` date NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`SalesID`, `InventoryID`, `Quantity`, `TotalPrice`, `Date`, `UserID`) VALUES
(3, 4, 1, 8.00, '2024-12-28', 6),
(4, 3, 1, 5.75, '2024-12-28', 6),
(5, 4, 2, 16.00, '2024-12-28', 6),
(6, 8, 1, 12.50, '2024-12-28', 6),
(7, 11, 2, 6.50, '2024-12-28', 6),
(8, 6, 2, 11.50, '2024-12-28', 6),
(9, 5, 1, 12.50, '2024-12-28', 6),
(10, 6, 2, 11.50, '2024-12-28', 6),
(16, 4, 1, 8.00, '2024-12-28', 6),
(17, 3, 2, 11.50, '2024-12-28', 6),
(18, 4, 1, 8.00, '2024-12-29', 33),
(19, 12, 2, 9.00, '2024-12-29', 33),
(20, 11, 3, 9.75, '2024-12-29', 6);

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `SupplierID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `ContactInfo` varchar(100) NOT NULL,
  `ProductCatalog` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`SupplierID`, `Name`, `ContactInfo`, `ProductCatalog`) VALUES
(1, 'MediLink Distributors Ltd.', 'House 12, Road 4, Dhanmondi, Dhaka-1205, Phone: +88029123456, Email: info@medilinkbd.com', 'Wide range of pharmaceuticals, medical supplies, and equipment.'),
(2, 'Bengal Pharma Industries', 'Plot 7-8, BSCIC Industrial Area, Tongi, Gazipur, Phone: +8801711223344, Email: sales@bengalpharma.co', 'Generic medicines, tablets, capsules, syrups.'),
(3, 'Global Medical Equipment BD', 'Level 5, Concord Center, Gulshan Avenue, Dhaka-1212, Phone: +8801911556677, Email: import@globalmedb', 'Medical devices, diagnostic equipment, surgical instruments.'),
(4, 'Surgical Solutions Ltd.', '10/B, Segun Bagicha, Dhaka-1000, Phone: +88029557788, Email: surgical@solutionsbd.com', 'Surgical sutures, dressings, bandages, other surgical supplies.'),
(5, 'Grameen Health Supply', 'Village: Joypur, Post: Mirzapur, Tangail, Phone: +8801811990011, Email: grameenhealth@gmail.com', 'Essential medicines, first aid kits, basic medical supplies for rural areas.'),
(7, 'Ayurvedic Herbal Products', '25/A, New Eskaton Road, Dhaka-1000, Phone: +88028312345, Email: ayurveda@herbalbd.com', 'Ayurvedic medicines, herbal remedies, natural health products.');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Role` enum('Admin','Pharmacist','Customer') NOT NULL,
  `ContactInfo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `Name`, `Email`, `Password`, `Role`, `ContactInfo`) VALUES
(4, 'Emon Hossain', 'emon@mail.com', '$2y$10$ixJceOiMsR75hlVkxgbziOi73eVz8DRWOBPoB6KmtmoJrUWaLHuBu', 'Admin', '01610201201'),
(5, 'Rakib Hossain', 'rakib@mail.com', '$2y$10$t5iWg0SyA4d.vwV2oSHO0eJ5WRZD9xBWQp295fMd5c9HefFD6Ga1W', 'Pharmacist', '01510201201'),
(6, 'Siam Ahmed', 'siam@mail.com', '$2y$10$oLBcs372ubwq0ajABXKiyOyv68.7oy1N5n77LAOsWojzDERcZsXZW', 'Customer', '01883347938'),
(33, 'Fazle Rabbi', 'rabbi@mail.com', '$2y$10$OawQWpFRTbeyMXx9/omWheQ4caYliz2IVshBfbqWob3RPxBnZ7lyK', 'Customer', '0179384029');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`CustomerID`),
  ADD UNIQUE KEY `UserID` (`UserID`);

--
-- Indexes for table `expense`
--
ALTER TABLE `expense`
  ADD PRIMARY KEY (`ExpenseID`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`ItemID`),
  ADD KEY `SupplierID` (`SupplierID`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`InvoiceID`),
  ADD KEY `SalesID` (`SalesID`);

--
-- Indexes for table `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`PrescriptionID`),
  ADD KEY `prescription_fk_user` (`UserID`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`SalesID`),
  ADD KEY `InventoryID` (`InventoryID`),
  ADD KEY `sales_ibfk_user` (`UserID`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`SupplierID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `CustomerID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expense`
--
ALTER TABLE `expense`
  MODIFY `ExpenseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `ItemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `InvoiceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `prescription`
--
ALTER TABLE `prescription`
  MODIFY `PrescriptionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `SalesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `SupplierID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE SET NULL;

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`SupplierID`) REFERENCES `supplier` (`SupplierID`) ON DELETE CASCADE;

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`SalesID`) REFERENCES `sales` (`SalesID`) ON DELETE CASCADE;

--
-- Constraints for table `prescription`
--
ALTER TABLE `prescription`
  ADD CONSTRAINT `prescription_fk_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE;

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`InventoryID`) REFERENCES `inventory` (`ItemID`) ON DELETE CASCADE,
  ADD CONSTRAINT `sales_ibfk_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
