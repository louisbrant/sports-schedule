import { useEffect, useState } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import TimeService from "./../../shared/time-service";

const Days = ({ defaultSelectedDays, onDaySelected }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  useEffect(() => {
    const list = defaultSelectedDays.map((ele) => {
      const formatedDate = TimeService.getReverseDateFormat(new Date(ele));
      return new Date(formatedDate);
    });
    setSelectedDays(list);
  }, []);
  const handleDayClick = (day, { selected }) => {
    const list = [...selectedDays];
    if (selected) {
      const selectedIndex = list.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      );
      list.splice(selectedIndex, 1);
    } else {
      list.push(day);
    }
    if (onDaySelected) onDaySelected(list);
    setSelectedDays(list);
  };

  return <DayPicker selectedDays={selectedDays} onDayClick={handleDayClick} />;
};

export default Days;
