import moment from "moment";
import { useState, useEffect } from "react";

const HorizontalTimeSlots = ({ timeList, pageSize = 12, onPageChanged }) => {
  const [originalDates, setOriginalDates] = useState(timeList ? timeList : []);
  const [dates, setDates] = useState([]);
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
    onPageChanged(newPage);
    getPageDates(originalDates, newPage);
  };

  const getPrevPage = () => {
    const newPage = page - 1;
    if (newPage == -1) return;
    setPage(newPage);
    onPageChanged(newPage);
    getPageDates(timeList, newPage);
  };

  return (
    <>
      <i
        className="col-1 fa fa-angle-left booking-arrow"
        onClick={getPrevPage}
      ></i>
      <div className="col-10 col-md-10 d-flex flex-wrap m0 p0">
        {dates.map((t, index) => (
          <span
            key={index}
            className="col-12 secondary col-md-1 d-flex justify-content-start align-items-start p-2 pl-3 time-slot"
            style={{height: 60, opacity: .6}}
          >
            {t}
          </span>
        ))}
      </div>
      <i
        className="col-1 fa fa-angle-right booking-arrow"
        onClick={getNextPage}
      ></i>
    </>
  );
};

export default HorizontalTimeSlots;
