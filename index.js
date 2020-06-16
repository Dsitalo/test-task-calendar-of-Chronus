//точка отсчета
const currentDate = '24.08.1001';
const currentDay = +currentDate.substr(0, 2);
const currentMonth = +currentDate.substr(3, 2);
const currentYear = +currentDate.substr(6,);

let countDaysInYear = function (day, month, leap) {
    if (month != 1 && leap === false) {
        return day + (month - 1) * 30;
    } else if (month === 1 && leap === false) {
        return day;
    } else if (month > 3 && leap === true) {
        return day + (month - 2) * 30 + 31;
    } else if (month === 3 && leap === true) {
        return day + 30 + 31;
    } else if (month === 2 && leap === true) {
        return day + 30;
    } else if (month === 1 && leap === true) {
        return day;
    } else {
        console.log('exception');
    }
}

const currenDaysInYear = countDaysInYear(currentDay, currentMonth, false);
//вспомогательные значения
let weekDays = ['понедельник', 'воскресенье', 'суббота', 'пятница', 'четверг', 'среда']
let weekDaysFuture = ['среда', 'четверг', 'пятница', 'суббота', 'воскресенье', 'понедельник']
let ordinaryMonth = 30;
let leapMonth = 31;
let ordinaryYearDays = 30 * 12;
let leapYearDays = 30 * 11 + 31;

let getYear = function (date) {
    return +date.substr(date.lastIndexOf('.') + 1, );
}

let getMonth = function (date) {
    let month = +date.substr(date.indexOf('.') + 1, 2);
    if (month < 1 || month > 12) {
       return false;
    }
    else {
        return month;
    }
}

let getDay = function (date) {
    let day = +date.substr(0, date.indexOf('.'));
    if (day < 32 && getMonth(date) === 2 && isLeap(getYear(date)) === true && day > 0) {
        return day;
    } else if (day < 31 && day > 0) {
        return day;
    } else {
        return false;
    }
}
//проверка на высокосный год
let isLeap = function (date) {
    if (date % 5 === 0 && date === 500 || date === 1000) {
        return true;
    } else if (date % 5 === 0 && date % 100 != 0) {
        return true;
    } else {
        return false;
    }
}
//разница между выбранной датой и точкой отсчета
let dateDiff = function (daysInYear, year, totalDaysInYear, month, day) {
    let yearsDiff = countYearsDiff(currentYear, year);
    let totalDays;
    if (yearsDiff === 0 && month > currentMonth || month === currentMonth && day > currentDay) {
        totalDays = daysInYear - currenDaysInYear;
        return totalDays;
    } else if (yearsDiff === 0 && month < currentMonth || month === currentMonth && day < currentDay) {
        totalDays = currenDaysInYear - daysInYear;
        return totalDays;
    } else if (day === currentDay && month === currentMonth && year === currentYear) {
        return 0;
    } else if (year > currentYear) {
        totalDays = countDaysInYear(30, 12, false) - currenDaysInYear + daysInYear;
        return totalDays;
    } else if (year < currentYear) {
        totalDays = countLeapYears(year, currentYear) * leapYearDays + (yearsDiff - countLeapYears(year, currentYear)) * ordinaryYearDays
        + currenDaysInYear + (totalDaysInYear - daysInYear);
        return totalDays;
    } else {
        totalDays = countLeapYears(year, currentYear) * leapYearDays + (yearsDiff - countLeapYears(year, currentYear)) * ordinaryYearDays
        + daysInYear + (countDaysInYear(30, 12, false) - currenDaysInYear);
        return totalDays;
    } 
}

let countYearsDiff = function (currentYear, year) {
    if (currentYear === year) {
        return 0
    } else if (year > currentYear) {
        return (year - currentYear)
    } else {
        return (currentYear - year)
    }
}

let countLeapYears = function (startYear, endYear) {
    let count = 0;
    for (let i = startYear; i < endYear; i++) {
        if (isLeap(i) === true) {
            count += 1;
        }
    }
    return count;
}

function getDayOfWeek (date) {
    let day = getDay(date);
    let month = getMonth(date);
    let year = getYear(date);

    let leap = isLeap(year);
    let daysInYear = countDaysInYear(day, month, leap);
    let totalDaysInYear = countDaysInYear(30, 12, leap);

    let daysDiff = dateDiff(daysInYear, year, totalDaysInYear, month, day);
    if (month === false) {
        console.log('wrong month');
    } else if (day === false) {
        console.log('wrong day');
    } else if (daysDiff % 7 === 0) {
        console.log(`${day}.${month}.${year}, вторник`)
    } else if (year > currentYear || year === currentYear && month > currentMonth) {
        console.log(`${day}.${month}.${year}, ${weekDaysFuture[Math.round((daysDiff / 7 - Math.trunc(daysDiff / 7)) * 7) - 1]}`)
    } else if (year === currentYear && month === currentMonth && day < currentDay) {
        console.log(`${day}.${month}.${year}, ${weekDays[Math.round((daysDiff / 7 - Math.trunc(daysDiff / 7)) * 7) - 1]}`)
    } else if (year === currentYear && month === currentMonth && day > currentDay) {
        console.log(`${day}.${month}.${year}, ${weekDaysFuture[Math.round((daysDiff / 7 - Math.trunc(daysDiff / 7)) * 7) - 1]}`)
    } 
    else {
        console.log(`${day}.${month}.${year}, ${weekDays[Math.round((daysDiff / 7 - Math.trunc(daysDiff / 7)) * 7) - 1]}`)
    } 

}
for (let y = 1; y < 13; y++) {
    for (let i = 1; i < 32; i ++) {
        getDayOfWeek(`${i}.${y}.${600}`);
    }
}

