import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Pagination } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import DashboardLayout from "../components/layout/dashboard-layout";
import { deleteBooking, getBookings } from "../store/booking/actions";
import moment from "moment";

const bookingdetails = () => {
  const dispatch = useDispatch();
  const { confirm } = Modal;

  // page number
  const [page, setPage] = useState(1);

  const { bookings, totalResults } = useSelector((store) => ({
    bookings: store.booking.bookings,
    totalResults: store.booking.totalBookings,
  }));

  useEffect(() => {
    // get booking list
    dispatch(getBookings(page, 10));
  }, []);

  /**
   * delete booking confirmation
   */
  const handleDeleteBookingConfirmation = (id) => {
    confirm({
      title: "Do you Want to delete these booking?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDeleteBooking(id);
      },
    });
  };

  /**
   * handle delete booking
   */
  const handleDeleteBooking = (id) => {
    dispatch(deleteBooking(id));
  };

  /**
   * handle page change
   */
  const handlePageChange = (page) => {
    setPage(page);
    // get booking list
    dispatch(getBookings(page, 10));
  };

  return (
    <DashboardLayout  footerInMng={false} pageTitle="Bookingdetails">
      <div className="d-flex flex-column block-items">
        {/* page title */}
        <div className="block-items-header d-flex align-items-center">
          <h3>Booking List</h3>
        </div>

        {/* booking list */}
        <div className="d-flex flex-column list-setting">
          {bookings?.map((booking, index) => (
            <div
              key={index}
              className="booking-details-row d-flex justify-content-between flex-sm-row flex-column col-12 align-items-center"
            >
              {/* booked user name and email */}
              <div className="d-flex col-item">
                <div className="d-flex flex-column justify-content-center align-items-start booking-info-col">
                  <span className="facility__address">{booking.email}</span>
                </div>
              </div>

              {/* booking unique ids */}
              <div className="d-flex col-item">
                <span>{booking.booking_unique_id}</span>
              </div>

              {/* booking time */}
              <div className="d-flex col-item">
                <span>
                  {moment(booking.from).format("YYYY-MM-DD HH:mm") +
                    " - " +
                    moment(booking.to).format("YYYY-MM-DD HH:mm")}
                </span>
              </div>

              {/* actions */}
              <div className="action__btns d-flex align-items-center col-item">
                {/* delete booking */}
                <button
                  className="btn btn-danger no-wrap-btn"
                  onClick={() => handleDeleteBookingConfirmation(booking.id)}
                >
                  <i className="fa fa-trash"></i>Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* pagination */}
        {totalResults > 10 && (
          <Pagination
            current={page}
            size="small"
            onChange={handlePageChange}
            total={totalResults}
          />
        )}
      </div>
    </DashboardLayout>
  );
};
export default bookingdetails;
