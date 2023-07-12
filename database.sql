-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 
-- Généré le : mer. 12 juil. 2023 à 20:44
-- Version du serveur : 10.9.6-MariaDB-1:10.9.6+maria~deb11
-- Version de PHP : 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ilo4`
--

-- --------------------------------------------------------

--
-- Structure de la table `power_capabilities`
--

CREATE TABLE `power_capabilities` (
  `ID` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `fwver` varchar(50) NOT NULL,
  `has_prmode_high` int(11) NOT NULL,
  `has_prmode_dynamic` int(11) NOT NULL,
  `has_prmode_low` int(11) NOT NULL,
  `has_prmode_os` int(11) NOT NULL,
  `has_advcap` int(11) NOT NULL,
  `cap_available` int(11) NOT NULL,
  `has_power_metering` int(11) NOT NULL,
  `has_configured_ps` int(11) NOT NULL,
  `cap_calib` varchar(50) NOT NULL,
  `has_thermcap` int(11) NOT NULL,
  `has_ambtemp` int(11) NOT NULL,
  `has_cpu_reporting` int(11) NOT NULL,
  `max_cap` int(11) NOT NULL,
  `_100_pct_cap` int(11) NOT NULL,
  `msac` int(11) NOT NULL,
  `msac_valid` int(11) NOT NULL,
  `_0_pct_cap` int(11) NOT NULL,
  `history_interval_seconds` int(11) NOT NULL,
  `history_max_samples` int(11) NOT NULL,
  `history_fast_interval_seconds` int(11) NOT NULL,
  `history_fast_max_samples` int(11) NOT NULL,
  `powerreg` int(11) NOT NULL,
  `disable_hem` int(11) NOT NULL,
  `calibrations` varchar(50) NOT NULL,
  `has_bbu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `power_readings`
--

CREATE TABLE `power_readings` (
  `ID` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `hostpwr_state` varchar(50) NOT NULL,
  `fwver` varchar(50) NOT NULL,
  `present_power_reading` int(11) NOT NULL,
  `average_power_reading` int(11) NOT NULL,
  `maximum_power_reading` int(11) NOT NULL,
  `minimum_power_reading` int(11) NOT NULL,
  `power_unit` varchar(50) NOT NULL,
  `hem_mode` varchar(50) NOT NULL,
  `enable_spsm` int(11) NOT NULL,
  `has_power_metering` int(11) NOT NULL,
  `power_supplies_redundant` varchar(50) NOT NULL,
  `ipdu_present` varchar(50) NOT NULL,
  `ipdu_redundant` varchar(50) NOT NULL,
  `batteries` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `power_summary`
--

CREATE TABLE `power_summary` (
  `ID` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `hostpwr_state` varchar(30) NOT NULL,
  `last_avg_pwr_accum` int(11) NOT NULL,
  `last_5min_avg` int(11) NOT NULL,
  `last_5min_peak` int(11) NOT NULL,
  `_24hr_average` int(11) NOT NULL,
  `_24hr_peak` int(11) NOT NULL,
  `_24hr_min` int(11) NOT NULL,
  `_24hr_max_cap` int(11) NOT NULL,
  `_24hr_max_temp` int(11) NOT NULL,
  `_20min_average` int(11) NOT NULL,
  `_20min_peak` int(11) NOT NULL,
  `_20min_min` int(11) NOT NULL,
  `_20min_max_cap` int(11) NOT NULL,
  `max_measured_wattage` int(11) NOT NULL,
  `min_measured_wattage` int(11) NOT NULL,
  `volts` int(11) NOT NULL,
  `power_cap` int(11) NOT NULL,
  `power_cap_mode` varchar(30) NOT NULL,
  `power_regulator_mode` varchar(30) NOT NULL,
  `power_supply_capacity` int(11) NOT NULL,
  `power_supply_input_power` int(11) NOT NULL,
  `num_valid_history_samples` int(11) NOT NULL,
  `num_valid_fast_history_samples` int(11) NOT NULL,
  `powerreg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `power_capabilities`
--
ALTER TABLE `power_capabilities`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `power_readings`
--
ALTER TABLE `power_readings`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `power_summary`
--
ALTER TABLE `power_summary`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `power_capabilities`
--
ALTER TABLE `power_capabilities`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `power_readings`
--
ALTER TABLE `power_readings`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `power_summary`
--
ALTER TABLE `power_summary`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
