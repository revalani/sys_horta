-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 15-Mar-2020 às 23:26
-- Versão do servidor: 10.1.37-MariaDB
-- versão do PHP: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `s_horte`
--
CREATE DATABASE IF NOT EXISTS `s_horte` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `s_horte`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estufa`
--

CREATE TABLE `estufa` (
  `id_estufa` int(11) NOT NULL,
  `cultura` text COLLATE utf8_bin NOT NULL,
  `estatus` text COLLATE utf8_bin NOT NULL,
  `ultima_manutencao` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estufa_dado`
--

CREATE TABLE `estufa_dado` (
  `id_estufa` int(11) NOT NULL,
  `tipo_sensor` text COLLATE utf8_bin NOT NULL,
  `datatime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `dado_sensor` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estufa_sensores`
--

CREATE TABLE `estufa_sensores` (
  `id_estufa` int(11) NOT NULL,
  `tipo_sensor` text COLLATE utf8_bin NOT NULL,
  `valor_padrao` int(11) NOT NULL COMMENT 'valor exelente  para a cultura na estufa ',
  `variacao_padrao` int(11) NOT NULL COMMENT 'range de valor aceitável '
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `sensores`
--

CREATE TABLE `sensores` (
  `tipo_sensor` text COLLATE utf8_bin NOT NULL,
  `unidade_medida` text COLLATE utf8_bin NOT NULL,
  `erro_padrão` float NOT NULL,
  `time_refresh` int(11) NOT NULL COMMENT 'tempo ideal para atualizar medidas do sensor',
  `descrição_sensor` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estrutura da tabela `test`
--

CREATE TABLE `test` (
  `entrada` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `estufa`
--
ALTER TABLE `estufa`
  ADD PRIMARY KEY (`id_estufa`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
