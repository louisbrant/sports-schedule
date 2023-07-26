import classNames from 'classnames';

// import './CalendarDay.scss';
import DayOfMonth from './DayOfMonth';
import { getToday } from './helpers/functions';

export default function CalendarDay({ day, eventData, handleModalOpen,selectedDate }) {
  const cssClass = classNames('calendar-day', {
    'is-current': day.isCurrentMonth,
    'is-today': day.date === getToday()
  });

  return (
    <div className={cssClass}>
      <DayOfMonth day={day} handleModalOpen={handleModalOpen} selectedDate={selectedDate} />

      {eventData && (
        <ul className="day-events">
          {Object.keys(eventData)
            .sort((a, b) => a.localeCompare(b))
            .map((eventKey) => {
              const timeEvent = eventData[eventKey];

              return (
                <li
                  key={`${day.date}_${timeEvent.time}`}
                  className="day-event"
                  onClick={() => handleModalOpen(day, timeEvent)}
                  title="Edit event"
                >
                  <div>{timeEvent.title}</div>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}
