let moment = require('moment')
let dayTemplate = require('../../html/shared/day.nunjucks')
const DATE_FORMAT = 'YYYY-MM-DD'

export default class Calendar {
    constructor(el, data) {
        this.init(el, data)
    }

    init(el, data) {
        this.element = el
        if (data.days) this.createDaysArray(data.days)
    }

    createDaysArray(days) {
        this.days = this.padDays(this.sortDays(days))
        this.drawDayLines(this.days)
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
}
