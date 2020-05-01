// ==UserScript==
// @name         Shiki Fav Star
// @namespace    http://shikimori.org/
// @version      1.0
// @description  Показывает звездочку у имени перса, по нажатию которой открывается окно с редактированием профиля и копируется в буфер обмена ID перса
// @author       Chortowod
// @match        http://shikimori.org/characters/*
// @match        https://shikimori.org/characters/*
// @match        http://shikimori.one/characters/*
// @match        https://shikimori.one/characters/*
// @license      MIT
// @grant        none
// @copyright    2020, Chortowod
// @updateURL	 https://raw.githubusercontent.com/Chortowod/Shikimori/master/MyFavStar.js
// ==/UserScript==

function myFavStar() {
    // скопировать "звездочку"
    var malRate = document.querySelector("a.b-subposter-action.fav-add.b-tooltipped");

    // дублировать "звездочку"
    var newFav = malRate.cloneNode(true);
    newFav.setAttribute('id', 'my-fav');

    // прилепить "звездочку" справа от имени перса
    var rateContainer = document.querySelector("h1");
    rateContainer.appendChild(newFav);

    //функция по нажатию на "звездочку"
    document.getElementById('my-fav').onclick = function() {
        var dummy = document.createElement("textarea"); //элемент для манипулирования с копированием
        document.body.appendChild(dummy);
        var favN = location.href; //скопировать в переменную текущую адресную строку
        favN = favN.substring(33, favN.indexOf('-')); //обрезать строку от 33 символа до "-", т.е. оставить только ID перса
        dummy.value = favN;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);

        window.open('https://shikimori.one/Chortowod/edit/profile', '_blank');
        return false;
    }
}

function addFav() {
    var link = document.getElementById("malRate");
    window.open(
      link.href,
      '_blank'
    );

    link.innerHTML = "translate";
    link.setAttribute('href', "https://translate.google.ru/?hl=ru&tab=wT");

    return false;
}

function ready(fn) {
    document.addEventListener('page:load', fn);
    document.addEventListener('turbolinks:load', fn);

    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(myFavStar);