import { useState } from 'react';
import moment from 'moment';
import CalendarDays from './CalendarDays';
import HeaderAction from './HeaderAction';
// import './Calendar.scss';
import { WEEKDAYS, MONTH_FORMAT, YEAR_FORMAT } from './helpers/constants';
import { getToday, getInitialMonth, getInitialYear } from './helpers/functions';

export default function Calendar({
  month = getInitialMonth(),
  year = getInitialYear(),
  current,
  handleSelectedDate,
  selectedDate,
}) {
  const initialMonthDate = moment(new Date(year, month - 1 + current, 1));
  const [monthSelected, setMonthSelected] = useState({
    date: initialMonthDate
  });

  console.log(monthSelected.date.toString());
  function handleClickPreviousMonth() {
    setMonthSelected((prevState) => ({
      date: prevState.date.clone().subtract(1, 'month')
    }));
  }

  function handleClickToday() {
    setMonthSelected({ date: moment(getToday()) });
  }

  function handleClickNextMonth() {
    setMonthSelected((prevState) => ({
      date: prevState.date.clone().add(1, 'month')
    }));
  }

  return (
    <article className="calendar">
      <div className="calendar-header">
        <HeaderAction
          title="Previous month"
          iconName="left"
          callback={handleClickPreviousMonth}
          cssClass="action-previous"
        />

        <div className="header-selected-month">
          {monthSelected.date.format('MMMM YYYY')}
        </div>

        {/* <HeaderAction
          title="Today"
          iconName="today"
          callback={handleClickToday}
        /> */}

        <HeaderAction
          title="Next month"
          iconName="right"
          callback={handleClickNextMonth}
          cssClass="action-next"
        />
      </div>

      <section className="day-of-week">
        {WEEKDAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </section>

      <CalendarDays
        month={monthSelected.date.format(MONTH_FORMAT)}
        year={monthSelected.date.format(YEAR_FORMAT)}
        handleSelectedDate={handleSelectedDate}
        selectedDate={selectedDate}
      />
    </article>
  );
}
