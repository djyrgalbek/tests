$(document).ready(function() {
  getData("method=default");//Загружает всех сотрудников по умолчанию

  //Загружает сотрудников по дате з/п
  $("#date").on("change", () => {
    let date = $("#date").val();

    getData("method=getDateBydate&date=" + date);
  });

  //Закрывает модальное окно
  $(".shadow__icon-close:eq(0)").on("click", () => {
    display(".shadow:eq(0)", "none");
    display(".photo:eq(0)", "none");
    display(".add-employee:eq(0)", "none");
    $(".photo img").attr("src", "");
    resetInput();
  });

  //Открывает модальное окно для добавления нового сотрудника
  $("#add-employee").on("click", () => {
    display(".shadow:eq(0)", "flex");
    display(".add-employee:eq(0)", "block");
  });

  //Добавляет нового сотрудника
  $("#add_employee").on("click", () => {
    if (checkInput() === true) {
      saveEmployee();
      resetInput();
    }
  });

  //Отображает з/п и премию в выбранной валюте
  $(".currensy").on("change", getCurrency);

  //Сбрасывает и отображает всех сотрудников
  $(".reset").on("click", () => {
    getData("method=default");
  });
});

/* Возвращает текущую дату */
function getCurrentDate() {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  return year + "-" + month + "-" + day;
}

//Получает данные с БД методом API
function getData(data) {
  let promise = fetch("/ajax.php/?" + data);

  promise
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json);

      if (json["employees"] != null) {
        getCard(json);
      } else {
        alert("По текущей дате " + getCurrentDate() + " событий нет.");
        $("#employee").html("");
      }
    });
}

//Отображает сотрудников
function getCard(employees) {
  let out = "";

  for (let i = 0; i < employees["employees"].length; i++) {
    out += '<div class="employee-card">';
    out += '<div class="employee-card__img">';
    out +=
      '<img src="../img/' +
      employees["employees"][i]["link_to_the_photo"] +
      '" alt="Сотрудник">';
    out += "</div>";

    out += '<div class="employee-card_block">';
    out +=
      '<span class="employee-card__name">ID: </span>' +
      employees["employees"][i]["w_id"];
    out += "</div>";

    out += '<div class="employee-card_block">';
    out +=
      '<span class="employee-card__name">Имя: </span>' +
      employees["employees"][i]["name"];
    out += "</div>";

    out += '<div class="employee-card_block">';
    out +=
      '<span class="employee-card__name">Фамилия: </span>' +
      employees["employees"][i]["surname"];
    out += "</div>";

    out += '<div class="employee-card_block">';
    out +=
      '<span class="employee-card__name">Должность: </span>' +
      employees["employees"][i]["position"];
    out += "</div>";

    out += '<div class="employee-card_block">';
    out +=
      '<span class="employee-card__name">Зарплата: </span><span class="salary" data-salary="' +
      employees["employees"][i]["salary"] +
      '">' +
      employees["employees"][i]["salary"] +
      " руб.</span>";
    out += "</div>";

    out += '<div class="employee-card_block">';
    out +=
      '<span class="employee-card__name">Премия: </span><span class="bonus" data-bonus="' +
      employees["employees"][i]["bonus"] +
      '">' +
      employees["employees"][i]["bonus"] +
      " руб.</span>";
    out += "</div>";

    out += "</div>";
  }

  $("#employee").html(out);
  $(".employee-card__img img").on("click", showPhoto);
}

//Показывает фото выбранного сотрудника в модальном окне
function showPhoto() {
  let src = $(this).attr("src");
  display(".shadow:eq(0)", "flex");
  display(".photo:eq(0)", "block");
  $(".photo:eq(0) img").attr("src", src);
}

//Отображение/закрытие элемента
function display(elem, property) {
  $(elem).css("display", property);
}

//Сохраняет нового сотрудника в БД
function saveEmployee() {
  let emp = $(".add-employee__input");
  let name = emp.eq(0).val();
  let surname = emp.eq(1).val();
  let position = emp.eq(2).val();
  console.log(name + surname + position);

  let promise = fetch(
    "/ajax.php/?method=saveEmployee&name=" +
      name +
      "&surname=" +
      surname +
      "&position=" +
      position
  );

  promise
    .then(response => {
      return response.text();
    })
    .then(text => {
      alert(text);
    });
}

//Проверяет поле ввода на корректность (Добавление нового сотрудника)
function checkInput() {
  let inputs = $(".add-employee__input");
  let sum = 0;

  for (let i = 0; i < inputs.length; i++) {
    if (inputs.eq(i).val() == "") {
      inputs.eq(i).css("borderColor", "red");
    } else {
      inputs.eq(i).css("borderColor", "#dfdfdf");
      sum++;
    }
  }

  if (sum == inputs.length) {
    return true;
  }

  return false;
}

//Возвращает в исходное состояние полей ввода
function resetInput() {
  let inputs = $(".add-employee__input");

  for (let i = 0; i < inputs.length - 1; i++) {
    inputs.eq(i).val("");
  }
}

//Возвращает и отображает з/п и премию сотрудника в выбранной валюте
function getCurrency() {
  let currency = $(".currensy").val();

  switch (currency) {
    case "rub":
      getSalaryInRub();
      break;

    case "dollar":
      getSalaryInDollar();
      break;
    default:
      alert("Произошла техническая ошибка.");
      break;
  }
}

//Возвращает з/п и премию в рублях
function getSalaryInRub() {
  let salary = $(".salary");
  let bonus = $(".bonus");

  for (let i = 0; i < salary.length; i++) {
    let dataSalary = salary.eq(i).data("salary");
    let dataBonus = bonus.eq(i).data("bonus");

    salary.eq(i).text(dataSalary + " руб.");
    bonus.eq(i).text(dataBonus + " руб.");
  }
}

//Возвращает з/п и премию в долларах
function getSalaryInDollar() {
  let dollar = $("#USD")
    .text()
    .replace(",", ".");
  let salary = $(".salary");
  let bonus = $(".bonus");

  for (let i = 0; i < salary.length; i++) {
    let dataSalary = salary.eq(i).data("salary");
    let dataBonus = bonus.eq(i).data("bonus");
    let salaryinDollars = (+dataSalary / +dollar).toFixed(2);
    let bonusinDollars = (+dataBonus / +dollar).toFixed(2);

    salary.eq(i).text(salaryinDollars + " $");
    bonus.eq(i).text(bonusinDollars + " $");
  }
}

//Показывает текущую валюту доллара на сегодня
function CBR_XML_Daily_Ru(rates) {
  var USDrate = rates.Valute.USD.Value.toFixed(4).replace(".", ",");
  var USD = (document.getElementById("USD").innerHTML = USDrate);
}
