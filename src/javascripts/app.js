let moment = require('moment')
let Firebase = require('firebase')

function displayCalendar (data) {
    const Calendar = require('./modules/calendar').default
    let $days = document.getElementById('days')
    let calendar = new Calendar($days, data.days)
}

function displayErrors (msg) {
    $days.innerHTML = msg;
}

let init = {
    displayCalendar: displayCalendar,
    diplayErrors: displayErrors
}


const Ajax = require('./modules/ajax').default
let ajax = new Ajax();
ajax.getJSON('calendar.json').then(displayCalendar);

// let firebaseUrl = 'https://sizzling-torch-6298.firebaseio.com/'
//
// let firebase = new Firebase(firebaseUrl)
// firebase.on("value", function parseData (snapshot) {
//     if (snapshot.val().days.length) {
//         let days = snapshot.val().days
//         let goodDays = [];
//         for(let i=0; i<days.length; i++) {
//             goodDays.push(days[i]);
//         }
//         init.displayCalendar(goodDays)
//     } else {
//         init.displayError("There are no days in the calendar loaded from:\n" + firebaseUrl)
//     }
// }, function (errorObject) {
//     init.displayError("The read failed: " + errorObject.code);
// });
