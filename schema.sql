-- phpMyAdmin SQL Dump
-- version 4.4.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 14, 2015 at 05:38 PM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `kanm_db`
--

-- --------------------------------------------------------

--
-- Stand-in structure for view `active_djs`
--
CREATE TABLE IF NOT EXISTS `active_djs` (
`showid` int(11)
,`pkey` int(11)
,`netid` varchar(255)
,`firstname` varchar(255)
,`lastname` varchar(255)
,`uin` varchar(9)
,`email` varchar(255)
,`phone` varchar(20)
,`shirt` varchar(5)
,`strikes` int(11)
,`points` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `active_show`
--

CREATE TABLE IF NOT EXISTS `active_show` (
  `ShowID` varchar(6) NOT NULL,
  `SetID` varchar(15) NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Stand-in structure for view `active_shows`
--
CREATE TABLE IF NOT EXISTS `active_shows` (
`timeslot` varchar(11)
,`pkey` int(11)
,`ShowName` varchar(255)
,`ShowPicture` varchar(90)
,`ShowDescription` text
,`Specialty` int(11)
,`Strike` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `applicant`
--

CREATE TABLE IF NOT EXISTS `applicant` (
  `pkey` int(11) NOT NULL,
  `firstname` varchar(90) NOT NULL,
  `lastname` varchar(90) NOT NULL,
  `email` varchar(90) NOT NULL,
  `year` int(11) NOT NULL,
  `uin` int(11) NOT NULL,
  `netid` varchar(255) NOT NULL,
  `memberType` varchar(90) NOT NULL,
  `appid` varchar(11) NOT NULL,
  `shirt` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `applicantband`
--

CREATE TABLE IF NOT EXISTS `applicantband` (
  `pkey` int(11) NOT NULL,
  `appid` varchar(11) NOT NULL,
  `band1` varchar(255) NOT NULL,
  `band2` varchar(255) NOT NULL,
  `band3` varchar(255) NOT NULL,
  `band4` varchar(255) NOT NULL,
  `band5` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `applicantshow`
--

CREATE TABLE IF NOT EXISTS `applicantshow` (
  `pkey` int(11) NOT NULL,
  `appid` varchar(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `genre` varchar(90) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'NEW'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `applicanttime`
--

CREATE TABLE IF NOT EXISTS `applicanttime` (
  `pkey` int(11) NOT NULL,
  `appid` varchar(11) NOT NULL,
  `time1` varchar(5) NOT NULL,
  `time2` varchar(5) NOT NULL,
  `time3` varchar(5) NOT NULL,
  `time4` varchar(5) NOT NULL,
  `time5` varchar(5) NOT NULL,
  `time6` varchar(5) NOT NULL,
  `time7` varchar(5) NOT NULL,
  `time8` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Stand-in structure for view `applications`
--
CREATE TABLE IF NOT EXISTS `applications` (
`appid` varchar(11)
,`firstname` varchar(90)
,`lastname` varchar(90)
,`uin` int(11)
,`netid` varchar(255)
,`email` varchar(90)
,`memberType` varchar(90)
,`year` int(11)
,`shirt` varchar(5)
,`name` varchar(255)
,`description` text
,`genre` varchar(90)
,`status` varchar(10)
,`time1` varchar(5)
,`time2` varchar(5)
,`time3` varchar(5)
,`time4` varchar(5)
,`time5` varchar(5)
,`time6` varchar(5)
,`time7` varchar(5)
,`time8` varchar(5)
,`band1` varchar(255)
,`band2` varchar(255)
,`band3` varchar(255)
,`band4` varchar(255)
,`band5` varchar(255)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `authorization`
--
CREATE TABLE IF NOT EXISTS `authorization` (
`netid` varchar(255)
,`officerId` int(11)
,`ShowID` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `calendar`
--

CREATE TABLE IF NOT EXISTS `calendar` (
  `pkey` int(11) NOT NULL,
  `timeslot` varchar(11) NOT NULL,
  `ShowID` int(11) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `djs`
--

CREATE TABLE IF NOT EXISTS `djs` (
  `pkey` int(11) NOT NULL,
  `netid` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `uin` varchar(9) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `shirt` varchar(5) NOT NULL,
  `strikes` int(11) NOT NULL,
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `general_member`
--

CREATE TABLE IF NOT EXISTS `general_member` (
  `pkey` int(11) NOT NULL,
  `DjId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `officer`
--

CREATE TABLE IF NOT EXISTS `officer` (
  `pkey` int(11) NOT NULL,
  `DjId` int(11) NOT NULL,
  `position_title` varchar(150) NOT NULL,
  `contact` varchar(90) NOT NULL,
  `picture` varchar(90) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Stand-in structure for view `officers`
--
CREATE TABLE IF NOT EXISTS `officers` (
`officerid` int(11)
,`position_title` varchar(150)
,`picture` varchar(90)
,`email` varchar(90)
,`firstname` varchar(255)
,`lastname` varchar(255)
,`day` varchar(30)
,`start` varchar(30)
,`end` varchar(30)
);

-- --------------------------------------------------------

--
-- Table structure for table `office_hours`
--

CREATE TABLE IF NOT EXISTS `office_hours` (
  `pkey` int(11) NOT NULL,
  `officerid` int(11) NOT NULL,
  `day` varchar(30) NOT NULL,
  `start` varchar(30) NOT NULL,
  `end` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `playlist`
--

CREATE TABLE IF NOT EXISTS `playlist` (
  `pkey` int(11) NOT NULL,
  `Track` varchar(150) NOT NULL,
  `Artist` varchar(150) NOT NULL,
  `Album` varchar(150) NOT NULL,
  `VirginId` int(11) DEFAULT NULL,
  `PSA` tinyint(1) DEFAULT NULL,
  `Promo` tinyint(1) DEFAULT NULL,
  `StatId` tinyint(4) DEFAULT NULL,
  `TS` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `SetId` varchar(15) NOT NULL,
  `ShowId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `shows`
--

CREATE TABLE IF NOT EXISTS `shows` (
  `pkey` int(11) NOT NULL,
  `ShowName` varchar(255) DEFAULT NULL,
  `ShowPicture` varchar(90) DEFAULT NULL COMMENT 'link to pic',
  `ShowDescription` text NOT NULL,
  `Specialty` int(11) NOT NULL,
  `Strike` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `show_host`
--

CREATE TABLE IF NOT EXISTS `show_host` (
  `pkey` int(11) NOT NULL,
  `ShowID` int(11) NOT NULL,
  `DjID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `virgin`
--

CREATE TABLE IF NOT EXISTS `virgin` (
  `pkey` int(11) NOT NULL,
  `Artist` varchar(150) NOT NULL,
  `Album` varchar(150) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `review` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure for view `active_djs`
--
DROP TABLE IF EXISTS `active_djs`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `active_djs` AS select `show_host`.`ShowID` AS `showid`,`djs`.`pkey` AS `pkey`,`djs`.`netid` AS `netid`,`djs`.`firstname` AS `firstname`,`djs`.`lastname` AS `lastname`,`djs`.`uin` AS `uin`,`djs`.`email` AS `email`,`djs`.`phone` AS `phone`,`djs`.`shirt` AS `shirt`,`djs`.`strikes` AS `strikes`,`djs`.`points` AS `points` from (`show_host` join `djs` on((`show_host`.`DjID` = `djs`.`pkey`))) where ((select `calendar`.`active` from `calendar` where (`calendar`.`ShowID` = `show_host`.`ShowID`) order by `calendar`.`pkey` desc limit 1) = 1);

-- --------------------------------------------------------

--
-- Structure for view `active_shows`
--
DROP TABLE IF EXISTS `active_shows`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `active_shows` AS select `calendar`.`timeslot` AS `timeslot`,`shows`.`pkey` AS `pkey`,`shows`.`ShowName` AS `ShowName`,`shows`.`ShowPicture` AS `ShowPicture`,`shows`.`ShowDescription` AS `ShowDescription`,`shows`.`Specialty` AS `Specialty`,`shows`.`Strike` AS `Strike` from (`calendar` join `shows` on((`calendar`.`ShowID` = `shows`.`pkey`))) where (`calendar`.`active` = 1);

-- --------------------------------------------------------

--
-- Structure for view `applications`
--
DROP TABLE IF EXISTS `applications`;

CREATE ALGORITHM=UNDEFINED DEFINER=`kanmwebadmin`@`localhost` SQL SECURITY DEFINER VIEW `applications` AS select `applicant`.`appid` AS `appid`,`applicant`.`firstname` AS `firstname`,`applicant`.`lastname` AS `lastname`,`applicant`.`uin` AS `uin`,`applicant`.`netid` AS `netid`,`applicant`.`email` AS `email`,`applicant`.`memberType` AS `memberType`,`applicant`.`year` AS `year`,`applicant`.`shirt` AS `shirt`,`applicantshow`.`name` AS `name`,`applicantshow`.`description` AS `description`,`applicantshow`.`genre` AS `genre`,`applicantshow`.`status` AS `status`,`applicanttime`.`time1` AS `time1`,`applicanttime`.`time2` AS `time2`,`applicanttime`.`time3` AS `time3`,`applicanttime`.`time4` AS `time4`,`applicanttime`.`time5` AS `time5`,`applicanttime`.`time6` AS `time6`,`applicanttime`.`time7` AS `time7`,`applicanttime`.`time8` AS `time8`,`applicantband`.`band1` AS `band1`,`applicantband`.`band2` AS `band2`,`applicantband`.`band3` AS `band3`,`applicantband`.`band4` AS `band4`,`applicantband`.`band5` AS `band5` from (((`applicant` join `applicantshow` on((`applicant`.`appid` = `applicantshow`.`appid`))) join `applicanttime` on((`applicant`.`appid` = `applicanttime`.`appid`))) join `applicantband` on((`applicant`.`appid` = `applicantband`.`appid`)));

-- --------------------------------------------------------

--
-- Structure for view `authorization`
--
DROP TABLE IF EXISTS `authorization`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `authorization` AS select `djs`.`netid` AS `netid`,`officer`.`pkey` AS `officerId`,`show_host`.`ShowID` AS `ShowID` from ((`djs` left join `officer` on((`officer`.`DjId` = `djs`.`pkey`))) left join `show_host` on((`show_host`.`DjID` = `djs`.`pkey`)));

-- --------------------------------------------------------

--
-- Structure for view `officers`
--
DROP TABLE IF EXISTS `officers`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `officers` AS select `officer`.`pkey` AS `officerid`,`officer`.`position_title` AS `position_title`,`officer`.`picture` AS `picture`,`officer`.`contact` AS `email`,`djs`.`firstname` AS `firstname`,`djs`.`lastname` AS `lastname`,`office_hours`.`day` AS `day`,`office_hours`.`start` AS `start`,`office_hours`.`end` AS `end` from ((`officer` join `djs` on((`djs`.`pkey` = `officer`.`DjId`))) left join `office_hours` on((`officer`.`pkey` = `office_hours`.`officerid`)));

--
-- Indexes for dumped tables
--

--
-- Indexes for table `active_show`
--
ALTER TABLE `active_show`
  ADD UNIQUE KEY `SetID` (`SetID`);

--
-- Indexes for table `applicant`
--
ALTER TABLE `applicant`
  ADD PRIMARY KEY (`pkey`);

--
-- Indexes for table `applicantband`
--
ALTER TABLE `applicantband`
  ADD PRIMARY KEY (`pkey`);

--
-- Indexes for table `applicantshow`
--
ALTER TABLE `applicantshow`
  ADD PRIMARY KEY (`pkey`);

--
-- Indexes for table `applicanttime`
--
ALTER TABLE `applicanttime`
  ADD PRIMARY KEY (`pkey`);

--
-- Indexes for table `calendar`
--
ALTER TABLE `calendar`
  ADD PRIMARY KEY (`pkey`);

--
-- Indexes for table `djs`
--
ALTER TABLE `djs`
  ADD PRIMARY KEY (`pkey`);

--
-- Indexes for table `general_member`
--
ALTER TABLE `general_member`
  ADD PRIMARY KEY (`pkey`);

--
-- Indexes for table `officer`
--
ALTER TABLE `officer`
  ADD PRIMARY KEY (`pkey`);

--
-- Indexes for table `office_hours`
--
ALTER TABLE `office_hours`
  ADD PRIMARY KEY (`pkey`);

--
-- Indexes for table `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`pkey`);

--
-- Indexes for table `shows`
--
ALTER TABLE `shows`
  ADD PRIMARY KEY (`pkey`);

--
-- Indexes for table `show_host`
--
ALTER TABLE `show_host`
  ADD PRIMARY KEY (`pkey`);

--
-- Indexes for table `virgin`
--
ALTER TABLE `virgin`
  ADD PRIMARY KEY (`pkey`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applicant`
--
ALTER TABLE `applicant`
  MODIFY `pkey` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `applicantband`
--
ALTER TABLE `applicantband`
  MODIFY `pkey` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `applicantshow`
--
ALTER TABLE `applicantshow`
  MODIFY `pkey` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `applicanttime`
--
ALTER TABLE `applicanttime`
  MODIFY `pkey` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `calendar`
--
ALTER TABLE `calendar`
  MODIFY `pkey` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `djs`
--
ALTER TABLE `djs`
  MODIFY `pkey` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `general_member`
--
ALTER TABLE `general_member`
  MODIFY `pkey` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `officer`
--
ALTER TABLE `officer`
  MODIFY `pkey` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `office_hours`
--
ALTER TABLE `office_hours`
  MODIFY `pkey` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `playlist`
--
ALTER TABLE `playlist`
  MODIFY `pkey` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `shows`
--
ALTER TABLE `shows`
  MODIFY `pkey` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `show_host`
--
ALTER TABLE `show_host`
  MODIFY `pkey` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `virgin`
--
ALTER TABLE `virgin`
  MODIFY `pkey` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
