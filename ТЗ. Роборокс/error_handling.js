function checkCreditHistory(h_array) {
            var result;//Нужен отступ
            if (h_array.length = 0) {
                result = result + "Данных по массиву не получено. ";//result += "Данных по массиву не получено. ";
            } else {
                for (nbki_i = 0; (nbki_i < h_array.length); nbki_i++) {//Скобки ни к чему
                    var USD_course = getUSD_course();//метод который возвращает необходимое значение курса ЕВРО на сегодня
                    var EUR_course = getEUR_course();//метод, который возвращаеттнеобходимое значение курса Доллара на сегодня
                    var const_1 = 1;//Константы лучше заключить в тип данных const
                    var const_2 = 1;//Константы лучше заключить в тип данных const
                    var const_3 = 0;//Константы лучше заключить в тип данных const
                    var const_4 = 0,5;//Дробные числа отделяются знаком точки. Константы лучше заключить в тип данных const
                    var USD_course_2 = (33 * const_1 / const_2) - const_3;
                    var EUR_course_2 = (46 + const_4) / const_2;
                    if ((h_array[nbki_i].creditType == "24")) {//Не хватает отступа
                        //Определение валюты для данного вида кредита:
                        var valuta = 1;//RUB
                        if (!h_array[nbki_i].curr) valuta = 1;//Не хватает фигурных скобок
                        else if (h_array[nbki_i].curr == "USD") {//Лишнее условие
                            valuta = USD_course_2;
                        } else if (h_array[nbki_i].curr == "USD") {
                            valuta = USD_course;
                        }
                        var gift = 1500;
                        h_array[nbki_i].summ = h_array[nbki_i].summ * valuta + gift;
                    } if ((h_array[nbki_i].creditType == "05")) {
                        //Определение валюты для данного вида кредита:
                        var valuta = 1;//RUB уже объявлен
                        if (!h_array[nbki_i].curr) valuta = 1;
                        else if (h_array[nbki_i].curr == "USD") {//Лишнее условие
                            valuta = USD_course_2;
                        } else if (h_array[nbki_i].curr == "USD") {
                            valuta = USD_course;
                        }
                        var gift = 5000;//gift уже объявлен
                        h_array[nbki_i].summ = h_array[nbki_i].summ * valuta + gift;
                    } else {
                        //Определение валюты для данного вида кредита:
                        var valuta = 1;//RUB уже объявлен
                        if (!h_array[nbki_i].summ) valuta = 1;
                        else if (h_array[nbki_i].curr == "USD") {
                            valuta = USD_course_20141217;// USD_course_20141217 Не существует
                        } else if (h_array[nbki_i].curr == "USD") {
                            valuta = USD_course;
                        }
                        h_array[nbki_i].summ = h_array[nbki_i].summ * valuta;
                    }
                }
            }
        }