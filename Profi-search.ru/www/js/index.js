$(document).ready(function() {
  $(".answer").on("input", sumAnswers);
  $(".lack-of").on("click", disabledAnswers);
  $(".form-questions__store_answers:eq(0)").on("input", choose_the_answers_through_input);
  choose_the_answers();
});

//Очистка checkbox'ов
function restart () {
    $('.form-questions__store_answers:eq(0)').val("");
    $(".form-questions__answer").prop("checked", false);
}

//Выбор вариантов ответов в ручную через поле ввода
function choose_the_answers_through_input() {
  let sumAnswers = $(".form-questions__store_answers:eq(0)").val();
    
    if (+sumAnswers === 0 && sumAnswers != "") {
        $(".lack-of").prop("checked", true);
        disabledAnswers();
      } else {
        $(".lack-of").prop("checked", false);
        $('.answer').removeAttr("disabled");
        choose_the_answers();
      }
}

//Проверка на корректный ввод поля ввода
function to_check_the_remaining_amount_of_answers (rest) {
    let answers = $(".answer");
    let sumAnswers = $(".form-questions__store_answers:eq(0)").val();
    let sum = 0;

    for (let i = 0; i < answers.length; i++) {
        sum += +answers.eq(i).val();
    }

    if (+sumAnswers > sum || rest != 0) {
        $('.warning:eq(0)').css("display", "block");
        restart();
    } else {
        $('.warning:eq(0)').css("display", "none");
    }
}

//Выборка варианта ответа
function choose_the_answers() {
  let sumAnswers = $(".form-questions__store_answers:eq(0)").val();
  let answers = $(".answer");

  if (sumAnswers !== 0) {
    for (let i = answers.length - 1; i >= 0; i--) {
      if (sumAnswers >= +answers.eq(i).val()) {
        answers.eq(i).prop("checked", true);
        sumAnswers -= +answers.eq(i).val();
      } else {
        answers.eq(i).prop("checked", false);
      }
    }
  }

  to_check_the_remaining_amount_of_answers(sumAnswers);
  console.log("Остаток " + sumAnswers);
}

//Показ сумму ответов при выборке checkbox'а
function sumAnswers() {
  let valAnswers = $(".answer:checked");
  let sum = 0;

  for (let i = 0; i < valAnswers.length; i++) {
    sum += +valAnswers.eq(i).val();
  }

  sum = sum != 0 ? sum : "";
  $(".form-questions__store_answers:eq(0)").val(sum);
}

//При выбора ответа "Отсутвтвуют животные" функция делает все остальные checkbox'ы не доступными
function disabledAnswers() {
  let answers = $(".answer");

  if ($(".lack-of:eq(0)").prop("checked") == true) {
    answers.prop("checked", false);
    answers.prop("disabled", "disabled");
    $(".form-questions__store_answers:eq(0)").val(0);
  } else {
    answers.removeAttr("disabled");
    $(".form-questions__store_answers:eq(0)").val("");
  }
}
