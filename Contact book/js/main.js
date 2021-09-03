var contacts = [];
var buferContacts = [];
var start = 0;
var finish = 0;

$(document).ready(function () {

    fetchDataFromServer();
    setTimeout( function () {
        readFromLocaleStorage('contacts');
       
    }, 2500);

    setTimeout ( function () {
        checkObjectForEmptiness();
        getSavedSettings();
        showContacts();
    }, 3000)

    $('.show-more').on('click', showContacts);
    $('.search-button').on('click', search);
    $('#abc').on('change', sortContactsByName);
});

/*
    initialization of stored data
*/
function getSavedSettings () {
    let buferJSON = localStorage.getItem('bufer');
    let networksJSON = localStorage.getItem('networks');
    if (buferJSON != null && buferJSON != '') {
        readFromLocaleStorage('bufer');
    }

    if (networksJSON != null && networksJSON != '') {
        networksJSON = JSON.parse(networksJSON)
        $('#abc').val(networksJSON.abc);
        sortContactsByName();
    }
}

/*  
    receiving data from the server
*/
function fetchDataFromServer() {
    fetch('http://demo.sibers.com/users')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                response.json().then(function (data) {
                    saveInLocaleStorage('contacts', data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

/*   
    show contact list
*/
function showContacts() {
    let out = '';
    more();

    for (let i = start; i < finish; i++) {

        out += '<div class="contact__list" data-id-contact="' + contacts[i].id + '">';
        out += '<div class="contact__box">';
        out += '<span class="contact__name">' + contacts[i].name + '</span>';
        out += '<div class="contact__company">';
        out += '<span class="contact__title">Company</span><br>';
        out += '<span>' + contacts[i].company.name + '</span>';
        out += '</div>';
        out += '</div>';

        out += '<div class="contact__box">';
        out += '<span class="conact__number">' + contacts[i].phone + '</span>';
        out += '</div>';

        out += '<div class="contact__box">';
        out += '<span class="conact__mail">' + contacts[i].email + '</span>';
        out += '</div>';
        out += '</div>';
    }

    $('.contact__item').append(out);
    $('.contact__list').on('click', showContactInformation);
}

/*   
    only 20 items loaded
*/
function more() {
    let length = Object.keys(contacts).length;

    if (finish + 20 < length) {
        start = finish;
        finish += 20;
        $('.show-more').css('display', 'block')
    }
    else {
        start = finish;
        finish = length;
        $('.show-more').css('display', 'none')
    }
}

/*   
    saving to localeStorage
*/
function saveInLocaleStorage(name, obj) {
    let json = JSON.stringify(obj);
    localStorage.setItem(name, json);
}

/*   
    reading to localeStorage
*/
function readFromLocaleStorage(name) {
    let json = localStorage.getItem(name);
    contacts = JSON.parse(json);
    buferContacts = contacts;
    console.log(contacts);
}

/*   
    removal to localeStorage
*/
function removeFromLocaleStorage(name) {
    localStorage.removeItem(name);
}

/*     
    search by contact name
*/
function search() {
    readFromLocaleStorage('contacts');
    let bufer = [];
    let searchWord = $('.search-input').val();
    searchWord = searchWord.replace(/[^a-zA-ZА-Яа-я/s]/g, '');
    re = new RegExp(searchWord, 'gi');

    if (searchWord != '') {
        for (let i = 0; i < contacts.length; i++) {
            let name = contacts[i].name;
            name = name.replace(/[^a-zA-ZА-Яа-я/s]/g, '');
            result = name.match(re);

            if (result) {
                bufer.push(contacts[i]);
            }
        }

        resetToZero();
        contacts = bufer;
        buferContacts = bufer;

        if (contacts.length != 0) {
            hiddenFound();
            sortContactsByName();
            showContacts();
            showFoundElem();
        }
        else {
            showFound();
            hiddenFoundElem();
        }

        $('.search-input').css('border', '1px solid #dfdfdf');
    }
    else {
        $('.search-input').css('border', '1px solid red');
    }

    console.log(contacts.length);
}

/*     
    data reset
*/
function resetToZero() {
    contacts = [];
    start = 0;
    finish = 0;

    $('.contact__list').remove();
}

/*     
    show text that nothing was found
*/
function showFound() {
    $('.contact__list').remove();
    $('.show-more').css('display', 'none');
    $('.not-found').css('display', 'block');
    $('.not-found').html('Oops ... Nothing was found. <span class="home">Come back home.</span>');

    $('.home').on('click', backHome);
    $('.home').on('click', deleteSettings);
}

/*     
    hidden text that nothing was found
*/
function hiddenFound() {
    $('.not-found').css('display', 'none');
}

/*     
    hide the panel of found items
*/
function hiddenFoundElem () {
    $('.found').css('display', 'none');
    $('.count').html(0);
}

/*     
    show the panel of found items
*/
function showFoundElem () {
    $('.found').css('display', 'block');
    $('.count').html(contacts.length);
}

/*     
    sort items alphabetically
*/
function sortContactsByName() {
    let val = $('#abc').val();
    let names = [];
    let sort = [];

    if (contacts.length != 0) {
        for (let i = 0; i < contacts.length; i++) {
            names.push(contacts[i].name);
        }

        names.sort();

        for (let k = 0; k < names.length; k++) {
            for (let n = 0; n < names.length; n++) {
                if (names[k] == contacts[n].name) {
                    sort.push(contacts[n]);
                }
            }
        }

        saveSettings();
        resetToZero();
        contacts = sort;

        if (val == 'down') {
            contacts.reverse();
        }
        else if (val == 'default') {
            contacts = buferContacts;
        }

        showContacts();
        
    }
}

/*     
    check data for void
*/
function checkObjectForEmptiness () {
    if(contacts.length == 0) {
        $('.not-found').css('display', 'block');
        $('.not-found').html('Empty contact list.');
    }
}

/*     
    back home
*/
function backHome () {
    setTimeout( readFromLocaleStorage('contacts'), 50 );
    hiddenFound();
    showContacts();
}

/*     
    save settings
*/
function saveSettings () {
    saveInLocaleStorage('bufer', contacts);
    console.log(contacts);
    let abc = $('#abc').val();
    let param = {
        abc: abc
    }

    saveInLocaleStorage('networks', param);
}

/*     
    delete settings
*/
function deleteSettings () {
    removeFromLocaleStorage('bufer');
    removeFromLocaleStorage('networks');
}

/*     
    show contact information
*/
function showContactInformation () {
    let id = $(this).data('id-contact');
    let out = '';
    let contact = {};

    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
            contact = contacts[i];
            break;
        }
    }
    
    out += '<button class="comeBack">Вернуться к контактам</button>';
    out += '<div class="info-contact__wrapper">';
        out += '<div class="info-contact__container">';
            out += '<div class="info-contact__data">';
            out += '<span class="info-contact__name">Name: </span>';
            out += '<input type="text" disabled id="contact-name" class="info-contact__value" value="' + contact.name + '">';
            out += '</div>';
            
            out += '<div class="info-contact__data">';
            out += '<span class="info-contact__name">Username: </span>';
            out += '<input type="text" disabled id="contact-username" class="info-contact__value" value="' + contact.username + '">';
            out += '</div>';

            out += '<div class="info-contact__data">';
            out += '<span class="info-contact__name">Email: </span>';
            out += '<input type="text" disabled id="contact-email" class="info-contact__value" value="' + contact.email + '">';
            // out += '<a href="mailto:' + contact.email + '" target="_blank" class="info-contact__link">Написать</a>';
            out += '</div>';

            out += '<div class="info-contact__data">';
            out += '<span class="info-contact__name">Phone: </span>';
            out += '<input type="text" disabled id="contact-phone" class="info-contact__value" value="' + contact.phone + '">';
            // out += '<a href="tel:' + contact.phone + '" target="_blank" class="info-contact__link">Позвонить</a>';
            out += '</div>';

            out += '<div class="info-contact__data">';
            out += '<span class="info-contact__name">Website: </span>';
            out += '<input type="text" disabled id="contact-website" class="info-contact__value" value="' + contact.website + '">';
            // out += '<a href="' + contact.website + '" target="_blank" class="info-contact__link">Посетить</a>';
            out += '</div>';

        out += '</div>';

        out += '<div class="info-contact__container">';
            out += '<div class="info-contact__title">Address</div>';

            out += '<div class="info-contact__data">';
            out += '<span class="info-contact__name">street A: </span>';
            out += '<input type="text" disabled id="contact-address-streetA" class="info-contact__value" value="' + contact.address.streetA + '">';
            out += '</div>';

            out += '<div class="info-contact__data">';
            out += '<span class="info-contact__name">street B: </span>';
            out += '<input type="text" disabled id="contact-address=streetB" class="info-contact__value" value="' + contact.address.streetB + '">';
            out += '</div>';

            out += '<div class="info-contact__data">';
            out += '<span class="info-contact__name">street C: </span>';
            out += '<input type="text" disabled id="contact-address-streetC" class="info-contact__value" value="' + contact.address.streetC + '">';
            out += '</div>';

            out += '<div class="info-contact__data">';
            out += '<span class="info-contact__name">street D: </span>';
            out += '<input type="text" disabled id="contact-address-streetD" class="info-contact__value" value="' + contact.address.streetD + '">';
            out += '</div>';

            out += '<div class="info-contact__data">';
            out += '<span class="info-contact__name">City: </span>';
            out += '<input type="text" disabled id="contact-address-city" class="info-contact__value" value="' + contact.address.city + '">';
            out += '</div>';

            out += '<div class="info-contact__data">';
            out += '<span class="info-contact__name">State: </span>';
            out += '<input type="text" disabled id="contact-address-state" class="info-contact__value" value="' + contact.address.state + '">';
            out += '</div>';

            out += '<div class="info-contact__data">';
            out += '<span class="info-contact__name">Country: </span>';
            
            out += '<input type="text" disabled id="contact-address-country" class="info-contact__value" value="' + contact.address.country + '">';
            out += '</div>';

            out += '<div class="info-contact__data">';
            out += '<span class="info-contact__name">Zip code: </span>';
            out += '<input type="text" disabled id="contact-address-zipcode" class="info-contact__value" value="' + contact.address.zipcode + '">';
            out += '</div>';

        out += '</div>';

        out += '<div class="info-contact__container">';
            out += '<div class="info-contact__title">Company</div>';

            out += '<div class="info-contact__data">';
            out += '<span class="info-contact__name">Name: </span>';
            out += '<input type="text" disabled id="contact-company-name" class="info-contact__value" value="' + contact.company.name + '">';
            out += '</div>';

            out += '<div class="info-contact__data">';
            out += '<span class="info-contact__name">Catch phrase: </span>';
            out += '<input type="text" disabled id="contact-company-catchPhrase" class="info-contact__value" value="' + contact.company.catchPhrase + '">';
            out += '</div>';

            out += '<div class="info-contact__data">';
            out += '<span class="info-contact__name">Best supply: </span>';
            out += '<input type="text" disabled id="contact-company-bs" class="info-contact__value" value="' + contact.company.bs + '">';
            out += '</div>';
            
        out += '</div>';

        out += '<div class="editor-contact">';
            out += '<span class="editor-contact__icon"></span>';
            out += '<span class="editor-contact__name">Редактировать</span>';
        out += '</div>';

        out += '<div class="save-contact">';
        out += '<span class="save-contact__icon"></span>';
        out += '<span onclick="saveContact(' + id + ')" class="save-contact__name">Сохранить</span>';
    out += '</div>';

    out += '</div>';

    $('.content__box').css('display', 'none');
    $('.info-contact').html(out);
    $('.info-contact').css('display', 'block');

    $('.comeBack').on('click', showListContacts);
    $('.editor-contact').on('click', editorContact);
    // $('.save-contact__name').on('click', saveContact);
}

/*     
    save list element
*/
function showListContacts () {
    $('.content__box').css('display', 'block');
    $('.info-contact').css('display', 'none');

    setTimeout( sortContactsByName, 1000) ;
}

/*     
    editor element
*/
function editorContact () {
    $('.info-contact__value').prop('disabled', false);
    $('.info-contact__value').css('border-bottom', '1px solid #dfdfdf');

    $(this).css('display', 'none');
    $('.save-contact').css('display', 'flex');
}

/*     
    save element
*/
function saveContact (id) {
    $('.save-contact').css('display', 'none');
    $('.editor-contact').css('display', 'flex');
    $('.info-contact__value').prop('disabled', true);
    $('.info-contact__value').css('border-bottom', 'none');

    let cName = $('#contact-name').val();
    let cUsername = $('#contact-username').val();
    let cEmail = $('#contact-email').val();
    let cPhone = $('#contact-phone').val();
    let Website = $('#contact-website').val();

    let cAddressStreetA = $('#contact-address-streetA').val();
    let cAddressStreetB = $('#contact-address-streetB').val();
    let cAddressStreetC = $('#contact-address-streetC').val();
    let cAddressStreetD = $('#contact-address-streetD').val();
    let cAddressCity = $('#contact-address-city').val();
    let cAddressState = $('#contact-address-state').val();
    let cAddressCountry = $('#contact-address-country').val();
    let cAddressZipcode = $('#contact-address-zipcode').val();

    let cCompanyName = $('#contact-company-name').val();
    let cCompanyCatchPhrase = $('#contact-company-catchPhrase').val();
    let cCompanyBs = $('#contact-company-bs').val();

    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === id) {
            contacts[i].name = cName;
            contacts[i].username = cUsername;
            contacts[i].email = cEmail;
            contacts[i].phone = cPhone;
            contacts[i].website = Website;

            contacts[i].address.streetA = cAddressStreetA;
            contacts[i].address.streetB = cAddressStreetB;
            contacts[i].address.streetC = cAddressStreetC;
            contacts[i].address.streetD = cAddressStreetD;

            contacts[i].address.city = cAddressCity;
            contacts[i].address.state = cAddressState;
            contacts[i].address.country = cAddressCountry;
            contacts[i].address.zipcode = cAddressZipcode;

            contacts[i].company.name = cCompanyName;
            contacts[i].company.catchPhrase = cCompanyCatchPhrase;
            contacts[i].company.bs = cCompanyBs;

            saveInLocaleStorage('bufer', contacts);
            readFromLocaleStorage('bufer');
            break;
        }
    }
}
