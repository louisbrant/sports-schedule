import moment from "moment";

const TimeService = {
  getDateTimeAfterAddingTime: (d, t) => {
    const today = new Date(d);
    const formatedDate = TimeService.getReverseDateFormat(today);
    const fullDateTime = new Date(`${formatedDate}T${t}:00.000`);
    return fullDateTime;
  },
  addMinutesToTime: (d, t, minutes) => {
    const fullDataTime = TimeService.getDateTimeAfterAddingTime(d, t);
    const newFullDataTime = new Date(fullDataTime.getTime() + minutes * 60000);
    return newFullDataTime;
  },
  subMinutesToTime: (d, t, minutes) => {
    const fullDataTime = TimeService.getDateTimeAfterAddingTime(d, t);
    const newFullDataTime = new Date(fullDataTime.getTime() - minutes * 60000);
    return newFullDataTime;
  },
  addDaysToADate: (d, numOfDays) => {
    const newDate = new Date(d.getTime() + numOfDays * 24 * 60 * 60000);
    return newDate;
  },
  getDateTimeFormat: (t) => {
    const dd = String(t.getDate()).padStart(2, "0");
    const MM = String(t.getMonth() + 1).padStart(2, "0");
    const yyyy = t.getFullYear();
    const hh = String(t.getHours()).padStart(2, "0");
    const mm = String(t.getMinutes()).padStart(2, "0");
    return `${dd}-${MM}-${yyyy} ${hh}:${mm}`;
  },
  getTimeFormat: (t) => {
    const hh = String(t.getHours()).padStart(2, "0");
    const mm = String(t.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  },
  getDateFormat: (t) => {
    const dd = String(t.getDate()).padStart(2, "0");
    const MM = String(t.getMonth() + 1).padStart(2, "0");
    const yyyy = t.getFullYear();
    return `${dd}-${MM}-${yyyy}`;
  },
  getReverseDateFormat: (t) => {
    const dd = String(t.getDate()).padStart(2, "0");
    const MM = String(t.getMonth() + 1).padStart(2, "0");
    const yyyy = t.getFullYear();
    return `${yyyy}-${MM}-${dd}`;
  },
  getDateWzTz: (d) => {
    const newDateWzTZ = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return newDateWzTZ;
  },
  checkIfASlotTimeInBetween2TimeValues: (time, fromTime, toTime) => {
    const from = new Date(fromTime).getTime();
    const to = new Date(toTime).getTime();
    const timeDate = TimeService.getReverseDateFormat(new Date(from));
    const timeFullDateTime = TimeService.getDateTimeAfterAddingTime(
      timeDate,
      time
    );
    const comparedTime = new Date(timeFullDateTime).getTime();
    if (comparedTime >= from && comparedTime <= to) return true;
    else return false;
  },
};

export default TimeService;
