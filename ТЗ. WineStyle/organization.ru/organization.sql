-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Ноя 01 2019 г., 13:24
-- Версия сервера: 5.5.25
-- Версия PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `organization`
--

-- --------------------------------------------------------

--
-- Структура таблицы `paymant`
--

CREATE TABLE IF NOT EXISTS `paymant` (
  `pm_id` int(11) NOT NULL AUTO_INCREMENT,
  `w_id` int(11) NOT NULL,
  `salary` decimal(11,2) DEFAULT NULL,
  `bonus` decimal(11,2) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`pm_id`),
  KEY `FK2` (`w_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Дамп данных таблицы `paymant`
--

INSERT INTO `paymant` (`pm_id`, `w_id`, `salary`, `bonus`, `date`) VALUES
(1, 32, '10000.00', '2000.00', '2019-10-08'),
(2, 33, '20000.00', '0.00', '2019-08-08'),
(3, 34, '30000.00', '3000.00', '2019-10-08'),
(4, 35, '40000.00', '4000.00', '2019-08-08'),
(5, 36, '50000.00', '0.00', '2019-10-08'),
(6, 37, '60000.00', '20000.00', '2019-10-08'),
(7, 38, '70000.00', '5000.00', '2019-10-08'),
(8, 39, '80000.00', '0.00', '2019-10-08'),
(9, 40, '90000.00', '1000.00', '2019-10-08'),
(10, 41, '100000.00', '2000.00', '2019-09-08'),
(11, 42, '10000.00', '4000.00', '2019-10-08'),
(12, 43, '20000.00', '9000.00', '2019-09-08'),
(13, 44, '30000.00', '5000.00', '2019-10-08'),
(14, 45, '40000.00', '5000.00', '2019-09-08'),
(15, 46, '50000.00', '0.00', '2019-10-08');

-- --------------------------------------------------------

--
-- Структура таблицы `professions`
--

CREATE TABLE IF NOT EXISTS `professions` (
  `p_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `professions`
--

INSERT INTO `professions` (`p_id`, `name`) VALUES
(1, 'Бухгалтер'),
(2, 'Курьер'),
(3, 'Менеджер');

-- --------------------------------------------------------

--
-- Структура таблицы `workers`
--

CREATE TABLE IF NOT EXISTS `workers` (
  `w_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `link_to_the_photo` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`w_id`),
  KEY `FK1` (`position`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=69 ;

--
-- Дамп данных таблицы `workers`
--

INSERT INTO `workers` (`w_id`, `name`, `surname`, `position`, `link_to_the_photo`) VALUES
(32, 'Иван', 'Иванов', 1, 'img3.png'),
(33, 'Василий', 'Васильев', 3, 'img3.png'),
(34, 'Сергей', 'Сергеев', 2, 'img3.png'),
(35, 'Анатасия', 'Антонова', 1, 'img2.png'),
(36, 'Светлана', 'Светлакова', 2, 'img1.jpg'),
(37, 'Дарья', 'Дуброва', 1, 'img2.png'),
(38, 'Денис', 'Денисов', 3, 'img3.png'),
(39, 'Максим', 'Максимов', 1, 'img3.png'),
(40, 'Николай', 'Николаев', 1, 'img3.png'),
(41, 'Наталья', 'Нежинских', 1, 'img2.png'),
(42, 'Марья', 'Марьина', 2, 'img1.jpg'),
(43, 'Дмитрий', 'Дмитриев', 3, 'img3.png'),
(44, 'Георгий', 'Георгиев', 1, 'img3.png'),
(45, 'Зарина', 'Зверьева', 1, 'img1.jpg'),
(46, 'Петр', 'Петров', 1, 'img3.png');

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `paymant`
--
ALTER TABLE `paymant`
  ADD CONSTRAINT `FK2` FOREIGN KEY (`w_id`) REFERENCES `workers` (`w_id`);

--
-- Ограничения внешнего ключа таблицы `workers`
--
ALTER TABLE `workers`
  ADD CONSTRAINT `FK1` FOREIGN KEY (`position`) REFERENCES `professions` (`p_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
