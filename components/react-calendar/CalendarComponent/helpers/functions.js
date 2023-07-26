import moment from 'moment';
import { DATE_FORMAT, YEAR_FORMAT, MONTH_FORMAT } from './constants';

function getToday() {
  return moment().format(DATE_FORMAT);
}

function getInitialYear() {
  return moment().format(YEAR_FORMAT);
}
function getInitialMonth() {
  return moment().format(MONTH_FORMAT);
}

function getMonthYear(month, year) {
  return moment(`${year}-${month}-01`, DATE_FORMAT);
}

function countDaysInMonth(month, year) {
  return getMonthYear(month, year).daysInMonth();
}

function getCurrentMonthDays(month, year) {
  const monthDaysList = Array.from(
    Array(countDaysInMonth(month, year)),
    (num, k) => k + 1
  );

  return monthDaysList.map((day) => {
    return {
      dayOfMonth: day,
      date: moment(`${year}-${month}-${day}`, DATE_FORMAT).format(DATE_FORMAT),
      isCurrentMonth: true
    };
  });
}

function getPreviousMonthDays(currentMonthYearDate, currentMonthFirstDate) {
  const firstDayOfTheMonthWeekday = moment(currentMonthFirstDate).weekday();

  const previousMonth = currentMonthYearDate.subtract(1, 'month');

  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
    ? firstDayOfTheMonthWeekday - 1
    : 6;

  let previousMonthLastMondayDayOfMonth = moment(currentMonthFirstDate)
    .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
    .date();

  const monthDaysList = Array.from(
    Array(visibleNumberOfDaysFromPreviousMonth),
    () => previousMonthLastMondayDayOfMonth++
  );

  return monthDaysList.map((day) => {
    return {
      date: moment(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${day}`,
        DATE_FORMAT
      ).format(DATE_FORMAT),
      dayOfMonth: day,
      isCurrentMonth: false
    };
  });
}

function getNextMonthDays(currentMonthYearDate, currentMonthLastDate) {
  const lastDayOfTheMonthWeekday = moment(currentMonthLastDate).weekday();

  const nextMonth = currentMonthYearDate.add(1, 'month');

  const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
    ? 7 - lastDayOfTheMonthWeekday
    : lastDayOfTheMonthWeekday;

  const monthDaysList = Array.from(
    Array(visibleNumberOfDaysFromNextMonth),
    (num, k) => k + 1
  );

  return monthDaysList.map((day) => {
    return {
      date: moment(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${day}`,
        DATE_FORMAT
      ).format(DATE_FORMAT),
      dayOfMonth: day,
      isCurrentMonth: false
    };
  });
}

export {
  getToday,
  getInitialYear,
  getInitialMonth,
  getMonthYear,
  getCurrentMonthDays,
  getPreviousMonthDays,
  getNextMonthDays
};
