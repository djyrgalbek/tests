function checkCreditHistory(h_array) {
            var result;
            var valuta = 1;//RUB
            var gift;

            if (h_array.length == 0) {
                result += "Данных по массиву не получено. ";
            } else {
                for (nbki_i = 0; nbki_i < h_array.length; nbki_i++) {
                    var USD_course = getUSD_course();//метод который возвращает необходимое значение курса ЕВРО на сегодня
                    var EUR_course = getEUR_course();//метод, который возвращаеттнеобходимое значение курса Доллара на сегодня
                
                    if ( (h_array[nbki_i].creditType == "24") ) {
                        //Определение валюты для данного вида кредита: 
                        if (h_array[nbki_i].curr == "USD") {
                            valuta = USD_course;
                        }

                        gift = 1500;
                        h_array[nbki_i].summ = h_array[nbki_i].summ * valuta + gift;
                    } if ((h_array[nbki_i].creditType == "05")) {
                        //Определение валюты для данного вида кредита:
                        if (h_array[nbki_i].curr == "USD") {
                            valuta = USD_course;
                        }

                        gift = 5000;
                        h_array[nbki_i].summ = h_array[nbki_i].summ * valuta + gift;
                    } else {
                        //Определение валюты для данного вида кредита:
                        if (h_array[nbki_i].curr == "USD") {
                            valuta = USD_course;
                        }
                        h_array[nbki_i].summ = h_array[nbki_i].summ * valuta;
                    }
                }
            }
        }