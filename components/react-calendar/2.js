import { Fragment, useEffect, useState } from 'react';
import './CalendarDays.scss';

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

export default function CalendarDays({ month, year }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDateOpen, setModalDateOpen] = useState('');
  const [initialModalData, setInitialModalData] = useState();
  const [eventsData, setEventsData] = useLocalStorage('Calendar::events', {});

  const calendarDays = [];

  const hasModalData = function handleModalOpen() {
    setModalVisible(true);
  };
  function handleModalClose() {}
  function handleModalSave() {}
  function handleModalDelete() {}

  return (
    <Fragment>
      <section className="calendar-days">
        {calendarDays.map((day) => (
          <CalendarDay
            key={day.date}
            day={day}
            handleModalOpen={handleModalOpen}
            eventData={eventsData[day.date]}
          />
        ))}
      </section>

      <AddEventModal
        modalVisible={modalVisible}
        handleModalClose={handleModalClose}
        handleModalSave={handleModalSave}
        handleModalDelete={handleModalDelete}
        initialModalData={initialModalData}
        isEditingEvent={hasModalData}
        dateSelected={modalDateOpen}
      />
    </Fragment>
  );
}
