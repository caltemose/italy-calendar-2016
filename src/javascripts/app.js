import './modules'
let moment = require('moment')

// setup/testing crap
console.log(`app.js has loaded!`)
// var tpl = require('../html/shared/test.nunj')
// var html = tpl.render({ title: 'Rendered Nunjuck fragment' })
var $days = document.getElementById('days')



function displayCalendar (data) {
    const Calendar = require('./modules/calendar').default
    let calendar = new Calendar($days, data)
}

const Ajax = require('./modules/ajax').default
let ajax = new Ajax();
ajax.getJSON('/calendar.json').then(displayCalendar);
