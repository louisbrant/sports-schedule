import moment from "moment";
import { useState, useEffect } from "react";
import TimeService from "../../shared/time-service";

const HorizontalDates = ({ datesList, pageSize = 6, onDateSelected }) => {
  const [originalDates, setOriginalDates] = useState(
    datesList ? datesList : []
  );
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(datesList[0]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getPageDates(originalDates, page);
  }, []);

  const getPageDates = (dates, page) => {
    const arr = [...dates];
    const list = arr.splice(page * pageSize, pageSize);
    setDates(list);
  };

  const getNextPage = () => {
    const newPage = page + 1;
    if (originalDates.length / pageSize <= newPage) return;
    setPage(newPage);
    getPageDates(originalDates, newPage);
  };

  const getPrevPage = () => {
    const newPage = page - 1;
    if (newPage == -1) return;
    setPage(newPage);
    getPageDates(datesList, newPage);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    onDateSelected(date);
  };

  // const dateFormat = (d) => {
  //   const newD = moment(d).format('ddd, DD')
  //   const dateSplit = newD.split(',')
  //   const finalDate = `${dateSplit[0]} ${dateSplit[1]}`
  //   return finalDate;
  // };

  return (
    <>
      <i
        className="col-1 fa fa-angle-left booking-arrow"
        onClick={getPrevPage}
      ></i>
      <div className="col-10 col-md-10 d-flex flex-wrap m0 p0">
        {dates.map((date, index) => (
          <div
            onClick={() => handleSelectDate(date)}
            key={index}
            className={
              date == selectedDate
                ? "selected col-12 col-md-2 d-flex justify-content-start align-items-start p-2 pl-3 date-slot"
                : "col-12 col-md-2 d-flex justify-content-start align-items-start p-2 pl-3 date-slot"
            }
            style={{height: 80}}
          >
            <span>{moment(date).format('ddd')}<br />
            <span style={{fontSize: 24, lineHeight: 1.2}}>{moment(date).format('DD')}</span></span> 
            {/* {dateFormat(date)} */}
          </div>
        ))}
      </div>
      <i
        className="col-1 fa fa-angle-right booking-arrow"
        onClick={getNextPage}
      ></i>
    </>
  );
};

export default HorizontalDates;
