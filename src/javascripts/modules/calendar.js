let moment = require('moment')
let dayTemplate = require('../../html/shared/day.nunjucks')
let detailsItems = []

const DATE_FORMAT = 'YYYY-MM-DD'
const ACTIVE_CLASS = 'is-active'


export default class Calendar {
    constructor(el, data) {
        this.init(el, data)
    }

    init(el, data) {
        this.element = el
        if (data) {
            this.createDaysArray(data);
            this.drawDayLines(this.days);
            this.activateDetails();
        }
    }

    createDaysArray(days) {
        this.days = this.padDays(this.sortDays(days))
    }

    sortDays(days) {
        return days.sort((a, b) => new Date(a.date) - new Date(b.date))
    }

    padDays(days) {
        return this.padDaysEnd(this.padDaysStart(days))
    }

    padDaysStart(days) {
        let firstDay = moment(days[0].date)
        let firstIndex = Number(firstDay.format('e'))
        if (firstIndex > 0) {
            for(let i=0; i<firstIndex; i++) {
                let day = {
                    date: firstDay.subtract(1, 'days').format(DATE_FORMAT),
                    outOfBounds: true // indicator that this day isn't in the trip
                }
                days.unshift(day)
            }
        }
        return days
    }

    padDaysEnd(days) {
        let lastDay = moment(days[days.length-1].date)
        let lastIndex = Number(lastDay.format('e'))
        if (lastIndex < 6) {
            for(let i=1; i<=6-lastIndex; i++) {
                let day = {
                    date: lastDay.add(1, 'days').format(DATE_FORMAT),
                    outOfBounds: true
                }
                days.push(day)
            }
        }
        return days
    }

    drawDayLines(days) {
        let html = ''
        for(let i=0; i<days.length; i++) {
            let date = moment(days[i].date)
            days[i].dayNumber = date.format('D')
            days[i].dayOfWeek = date.format('dddd')
            html += dayTemplate.render(days[i])
        }
        this.element.innerHTML = html
    }

    activateDetails() {
        let days = this.element.getElementsByTagName('li')
        for(let j=0; j<days.length; j++) {
            let items = days[j].getElementsByTagName('li')
            for(let i=0; i<items.length; i++) {
                let item = items[i]
                let details = item.getElementsByClassName('details')
                if (details.length) {
                    detailsItems.push(details[0])
                    item.addEventListener('click', this.onDetailsClick.bind(this))
                }
            }
        }
    }

    onDetailsClick(e) {
        // if nextElementSibling is '.details', h4 was clicked
        let details = e.target.nextElementSibling
        let classList = null
        if (details) {
            classList = details.classList
        } else {
            classList = e.target.classList
        }
        if (classList.contains(ACTIVE_CLASS)) {
            classList.remove(ACTIVE_CLASS)
        } else {
            this.closeAllDetails()
            classList.add(ACTIVE_CLASS)
        }
    }

    closeAllDetails() {
        for(let i=0; i<detailsItems.length; i++) {
            let classList = detailsItems[i].classList
            if (classList.contains(ACTIVE_CLASS)) {
                classList.remove(ACTIVE_CLASS)
            }
        }
    }
}
