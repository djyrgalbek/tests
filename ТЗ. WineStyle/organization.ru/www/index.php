<?php
    header('content-type: text/html; charset=utf-8');
    include 'db.php';//БД
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/main.css">
    <title>PHP + HTML + CSS + JS – вывод зарплат сотрудников.</title>
</head>

<body>
    <div class="shadow">
        <!-- Кнопка закрыть -->
        <span class="shadow__icon-close"></span>

        <!-- Модальное окно для просмотра фото сотрудника -->
        <div class="photo">
            <img src="" alt="">
        </div>
        <!-- /Модальное окно для просмотра фото сотрудника -->

        <!-- Модальное окно для добавления нового сотрудника -->
        <div class="add-employee">
            <h3 class="add-employee__title">добавить нового сотрудника</h3>
            <input type="text" class="add-employee__input" placeholder="Имя*">
            <input type="text" class="add-employee__input" placeholder="Фамилия*">
            <?php echo $listProf; ?><!-- Генерация списка профессий -->
            <input type="button" value="Добавить" id="add_employee">
        </div>
        <!-- /Модальное окно для добавления нового сотрудника -->
    </div>

    <div class="page">
        <div class="wrapper">
            <!-- header -->
            <header class="header">
            <div class="USD">Доллар США $ — <span id="USD">00,0000</span> руб.</div><!-- Курс доллара на сегодня -->

                <!-- Календарь -->
                <input type="date" value="" id="date" autocomplete="off">
                <button class="reset">Сброс</button>
                <!-- /Календарь -->

                <!-- Список валют -->
                <select name="" class="currensy" autocomplete="off">
                    <option value="rub">Рубль</option>
                    <option value="dollar">Доллар</option>
                </select>
                <!-- /Список валют -->

                <button id="add-employee">Добавить</button><!-- Добавить нового сотрудгика -->
            </header>
            <!-- /header -->

            <div id="employee" class="employee"><!-- Содержимое генерируется скриптом --></div><!-- Список сотрудников -->
        </div>
    </div>

    <!-- JQuery.js -->
    <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
    <!--main.js -->
    <script src="js/main.js"></script>
    <!-- Скрипт для получения курса доллара на сегодня -->
    <script src="//www.cbr-xml-daily.ru/daily_jsonp.js" async></script>
</body>

</html>