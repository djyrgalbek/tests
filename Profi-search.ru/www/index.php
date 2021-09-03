<?php header('Content-Type: text/html; charset=utf-8'); ?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <title>Test task</title>
</head>

<body>
    <div class="page">
        <div class="wrapper">
            <form action="" method="post" class="form-questions">
                <p class="form-questions__text" style="margin-bottom: 10px;">
                    Вопрос «КАКИЕ ЖИВОТНЫЕ У ВАС ЕСТЬ»?
                </p>

                <p class="form-questions__text warning" style="margin-bottom: 10px;">
                    Введите корректные данные!
                </p>

                <!-- Варианты ответов -->
                <label>
                    <input type="checkbox" name="animal" value="1" autocomplete="off" class="form-questions__answer answer">Кошка
                </label>

                <label>
                    <input type="checkbox" name="animal" value="2" autocomplete="off" class="form-questions__answer answer">Собака
                </label>

                <label>
                    <input type="checkbox" name="animal" value="4" autocomplete="off" class="form-questions__answer answer">Попугай
                </label>

                <label>
                    <input type="checkbox" name="animal" value="8" autocomplete="off" class="form-questions__answer answer">Рыбки
                </label>

                <label>
                    <input type="checkbox" name="animal" value="16" autocomplete="off" class="form-questions__answer answer">Рептилии
                </label>

                <label>
                    <input type="checkbox" name="animal" value="0" autocomplete="off" class="form-questions__answer lack-of">ЖИВОТНЫЕ ОТСУТСТВУЮТ
                </label>

                <!-- Хранилище ответов -->
                <input type="text" value="19" autocomplete="off" autocomplete="off" class="form-questions__store_answers">
            </form>
        </div>
    </div>

    <!-- Подключение внешних скриптов -->
    <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
    <script src="js/index.js"></script>
</body>

</html>