-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-10-2023 a las 23:13:50
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lab2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_orden`
--

CREATE TABLE `detalles_orden` (
  `codigo` int(11) NOT NULL,
  `codigoOrden` varchar(20) NOT NULL,
  `codigoExamen` int(11) NOT NULL,
  `cod-determ` int(11) NOT NULL,
  `resultado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles_orden`
--

INSERT INTO `detalles_orden` (`codigo`, `codigoOrden`, `codigoExamen`, `cod-determ`, `resultado`) VALUES
(1, '40123456-2023-10-10', 1, 0, '13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `determinaciones`
--

CREATE TABLE `determinaciones` (
  `codigo` int(11) NOT NULL,
  `cod_examen` int(11) NOT NULL,
  `nombre-determ` varchar(20) NOT NULL,
  `unidad_medida` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `determinaciones`
--

INSERT INTO `determinaciones` (`codigo`, `cod_examen`, `nombre-determ`, `unidad_medida`) VALUES
(0, 1, 'hemoglobina', 'g)DL');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examens`
--

CREATE TABLE `examens` (
  `codigo` int(11) NOT NULL,
  `nombre_analisis` varchar(30) NOT NULL,
  `tipo_muestra` varchar(11) NOT NULL,
  `dias_demora` int(3) NOT NULL,
  `nota` varchar(50) NOT NULL,
  `createAt` date DEFAULT NULL,
  `updateAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `examens`
--

INSERT INTO `examens` (`codigo`, `nombre_analisis`, `tipo_muestra`, `dias_demora`, `nota`, `createAt`, `updateAt`) VALUES
(1, 'HEMOGRAMA', 'SANGRE', 2, '', NULL, NULL),
(2, 'HEPATOGRAMA', 'SANGRE', 2, '', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes`
--

CREATE TABLE `ordenes` (
  `codigo` varchar(20) NOT NULL,
  `idPaciente` varchar(20) NOT NULL,
  `fechaIngreso` date NOT NULL,
  `fechaEntrega` date NOT NULL,
  `estado` varchar(20) NOT NULL,
  `tpoMuestras` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ordenes`
--

INSERT INTO `ordenes` (`codigo`, `idPaciente`, `fechaIngreso`, `fechaEntrega`, `estado`, `tpoMuestras`) VALUES
('40123456-2023-10-10', '40123456', '2023-10-10', '2023-10-18', 'ANALITICA', 'SANGRE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `dni` varchar(20) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `fecha_nac` date NOT NULL,
  `ciudad_nac` varchar(15) NOT NULL,
  `pais_nac` varchar(15) NOT NULL,
  `embarazada` tinyint(4) NOT NULL,
  `pre_diagnostico` varchar(50) NOT NULL,
  `patolog_prev` varchar(50) NOT NULL,
  `tipo_usuario` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telefono` int(20) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`dni`, `apellido`, `nombre`, `sexo`, `fecha_nac`, `ciudad_nac`, `pais_nac`, `embarazada`, `pre_diagnostico`, `patolog_prev`, `tipo_usuario`, `email`, `telefono`, `createdAt`, `updatedAt`) VALUES
('315428913', 'SOAZO', 'NATALIA', 'f', '1985-11-18', 'Sa', 'Argentina', 0, 'Control anual', 'No', 'paciente', 'natalia@gmail.com', 2147483647, '2023-10-19', '2023-10-19'),
('31542898', 'Sosa', 'Javier', 'm', '1982-07-18', 'San Luis', 'Argentina', 0, 'Problemas digestivos', 'No', 'paciente', 'diego@gmail.com', 2147483647, '2023-10-19', '2023-10-19'),
('34877193', 'Cubillos', 'Pablo', 'm', '1989-02-11', 'San Luis', 'Argentina', 0, 'Dolor de rodillas', 'ninguna', 'paciente', '', 2147483647, '2023-10-17', '2023-10-19'),
('40123456', 'Sosa', 'Sofia', 'F', '1995-10-10', 'San Luis', 'Uruguay', 0, 'Aparente embarazo', 'no', 'Paciente', 'sofi@gmail.com', 2147483647, NULL, '2023-10-18'),
('54159878', 'GOMEZ', 'VICTORIA', 'f', '2017-06-18', 'SANLUIS', 'ARGENTINA', 0, 'MOLESTIAS', 'NO', 'paciente', 'no@gmail.com', 2147483647, '2023-10-20', '2023-10-20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_usuario`
--

CREATE TABLE `tipos_usuario` (
  `tipo` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos_usuario`
--

INSERT INTO `tipos_usuario` (`tipo`) VALUES
('Bioquimico'),
('Paciente'),
('Recepcionista'),
('Técnico químico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valor_ref`
--

CREATE TABLE `valor_ref` (
  `codigo` int(11) NOT NULL,
  `cod_determ` int(11) NOT NULL,
  `nombreRef` varchar(20) NOT NULL,
  `valorMin` varchar(12) NOT NULL,
  `ValorMax` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `valor_ref`
--

INSERT INTO `valor_ref` (`codigo`, `cod_determ`, `nombreRef`, `valorMin`, `ValorMax`) VALUES
(1, 0, 'hombres', '2,0', '15,00'),
(2, 0, 'mujeres', '1,5', '13,5');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalles_orden`
--
ALTER TABLE `detalles_orden`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codigoExamen` (`codigoExamen`),
  ADD KEY `codigoOrden` (`codigoOrden`),
  ADD KEY `cod-determ` (`cod-determ`);

--
-- Indices de la tabla `determinaciones`
--
ALTER TABLE `determinaciones`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `cod_examen` (`cod_examen`);

--
-- Indices de la tabla `examens`
--
ALTER TABLE `examens`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `idPaciente` (`idPaciente`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`dni`),
  ADD KEY `tipo_usuario` (`tipo_usuario`);

--
-- Indices de la tabla `tipos_usuario`
--
ALTER TABLE `tipos_usuario`
  ADD KEY `tipo` (`tipo`);

--
-- Indices de la tabla `valor_ref`
--
ALTER TABLE `valor_ref`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `cod_determ` (`cod_determ`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalles_orden`
--
ALTER TABLE `detalles_orden`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `examens`
--
ALTER TABLE `examens`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `valor_ref`
--
ALTER TABLE `valor_ref`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalles_orden`
--
ALTER TABLE `detalles_orden`
  ADD CONSTRAINT `detalles_orden_ibfk_1` FOREIGN KEY (`codigoExamen`) REFERENCES `examens` (`codigo`),
  ADD CONSTRAINT `detalles_orden_ibfk_2` FOREIGN KEY (`cod-determ`) REFERENCES `determinaciones` (`codigo`),
  ADD CONSTRAINT `detalles_orden_ibfk_3` FOREIGN KEY (`codigoOrden`) REFERENCES `ordenes` (`codigo`);

--
-- Filtros para la tabla `determinaciones`
--
ALTER TABLE `determinaciones`
  ADD CONSTRAINT `determinaciones_ibfk_1` FOREIGN KEY (`cod_examen`) REFERENCES `examens` (`codigo`);

--
-- Filtros para la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD CONSTRAINT `ordenes_ibfk_1` FOREIGN KEY (`idPaciente`) REFERENCES `personas` (`dni`);

--
-- Filtros para la tabla `personas`
--
ALTER TABLE `personas`
  ADD CONSTRAINT `personas_ibfk_1` FOREIGN KEY (`tipo_usuario`) REFERENCES `tipos_usuario` (`tipo`);

--
-- Filtros para la tabla `valor_ref`
--
ALTER TABLE `valor_ref`
  ADD CONSTRAINT `valor_ref_ibfk_1` FOREIGN KEY (`cod_determ`) REFERENCES `determinaciones` (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
