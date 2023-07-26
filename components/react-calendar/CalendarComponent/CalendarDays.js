import { Fragment, useEffect, useState } from 'react';
// import './CalendarDays.scss';

import { initialFormData } from './helpers/constants';
import AddEventModal from './AddEventModal';
import CalendarDay from './CalendarDay';
import useLocalStorage from './helpers/useLocalStorage';
import {
  getMonthYear,
  getCurrentMonthDays,
  getPreviousMonthDays,
  getNextMonthDays
} from './helpers/functions';

const confirmationMessage = 'Are you sure you want to delete the event?';

export default function CalendarDays({ month, year, handleSelectedDate, selectedDate }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDateOpen, setModalDateOpen] = useState('');
  const [eventsData, setEventsData] = useLocalStorage('Calendar::events', {});
  const [initialModalData, setInitialModalData] = useState(initialFormData);

  const currentMonthYear = getMonthYear(month, year);
  const currentMonthDays = getCurrentMonthDays(month, year);
  const previousMonthDays = getPreviousMonthDays(
    currentMonthYear.clone(),
    currentMonthDays[0].date
  );
  const nextMonthDays = getNextMonthDays(
    currentMonthYear.clone(),
    currentMonthDays.slice(-1)[0].date
  );
  const calendarDays = [
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays
  ];
  console.log('eventsData', eventsData);

  const hasModalData = !!(initialModalData && initialModalData.title);

  useEffect(() => {
    if (modalVisible) return;

    setInitialModalData(initialFormData);
  }, [modalVisible]);

  function handleModalSave(formData) {
    setEventsData((prevState) => ({
      ...prevState,
      // [modalDateOpen]: [...(prevState[modalDateOpen] || ''), formData]
      [modalDateOpen]: {
        ...prevState[modalDateOpen],
        [formData.time]: formData
      }
    }));

    setModalVisible(false);
  }

  function handleModalDelete(formData) {
    const confirmation = window.confirm(confirmationMessage);

    if (!confirmation) return;

    setEventsData((prevState) => {
      const { [formData.time]: deletedKey, ...restItems } = prevState[
        modalDateOpen
      ];

      return {
        ...prevState,
        [modalDateOpen]: {
          ...restItems
        }
      };
    });

    setModalVisible(false);
  }

  function handleModalOpen(day, eventData = null) {
    handleSelectedDate(day)
    // setModalDateOpen(day.date);
    // setInitialModalData(eventData);
    // setModalVisible(true);
  }

  function handleModalClose() {
    setModalVisible(false);
  }

  return (
    <Fragment>
      <section className="calendar-days">
        {calendarDays.map((day) => (
          <CalendarDay
            key={day.date}
            day={day}
            handleModalOpen={handleModalOpen}
            eventData={eventsData[day.date]}
            selectedDate={selectedDate}
          />
        ))}
      </section>

      {/* <AddEventModal
        modalVisible={modalVisible}
        handleModalClose={handleModalClose}
        handleModalSave={handleModalSave}
        handleModalDelete={handleModalDelete}
        initialModalData={initialModalData}
        isEditingEvent={hasModalData}
        dateSelected={modalDateOpen}
      /> */}
    </Fragment>
  );
}
