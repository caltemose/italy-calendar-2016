let moment = require('moment')

function displayCalendar (data) {
    const Calendar = require('./modules/calendar').default
    let $days = document.getElementById('days')
    let calendar = new Calendar($days, data)
}

const Ajax = require('./modules/ajax').default
let ajax = new Ajax();
ajax.getJSON('calendar.json').then(displayCalendar);
