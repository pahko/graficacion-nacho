-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 23-11-2011 a las 00:31:58
-- Versión del servidor: 5.5.16
-- Versión de PHP: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `graficacion`
--
CREATE DATABASE `graficacion` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci;
USE `graficacion`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funciones`
--

CREATE TABLE IF NOT EXISTS `funciones` (
  `idfunciones` int(11) NOT NULL AUTO_INCREMENT,
  `funcion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `color` varchar(45) COLLATE utf8_spanish2_ci NOT NULL,
  `grosor` int(11) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`idfunciones`),
  KEY `Usuario` (`idUsuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=49 ;

--
-- Volcado de datos para la tabla `funciones`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) COLLATE utf8_spanish2_ci NOT NULL,
  `pass` varchar(45) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=27 ;

--
-- Volcado de datos para la tabla `usuario`
--

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `funciones`
--
ALTER TABLE `funciones`
  ADD CONSTRAINT `Usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
