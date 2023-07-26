import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
// import './DayOfMonth.scss';

export default function DayOfMonth({ day, handleModalOpen, selectedDate }) {

  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  return (
    <button
      className="day-of-month-wrapper"
      onClick={() => handleModalOpen(day)}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      title="Add a new event"
    >
      <span
        className={classNames(
          'day-of-month day-of-month-text',
          hovered ? 'invisible' : 'visible',
          selectedDate?.map(item => item.dayOfMonth === day.dayOfMonth && "selected__day")
        )}
      >
        {day.dayOfMonth}
      </span>
      <span
        className={classNames(
          'day-of-month day-of-month-icon',
          hovered ? 'visible' : 'invisible'
        )}
      >
        <FontAwesomeIcon icon={faCalendarPlus} />
      </span>
    </button>
  );
}
