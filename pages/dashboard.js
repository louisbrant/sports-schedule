import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import DashboardLayout from "../components/layout/dashboard-layout";
import { deleteBooking, getBookings } from "../store/booking/actions";
import moment from "moment";

const Dashboard = () => {
  // const dispatch = useDispatch();
  // const { confirm } = Modal;

  // const { bookings } = useSelector((store) => ({
  //   bookings: store.booking.bookings,
  // }));

  // useEffect(() => {
  //   // get booking list
  //   dispatch(getBookings(1, 10));
  // }, []);

  // /**
  //  * delete booking confirmation
  //  */
  // const handleDeleteBookingConfirmation = (id) => {
  //   confirm({
  //     title: "Do you Want to delete these booking?",
  //     icon: <ExclamationCircleOutlined />,
  //     onOk() {
  //       handleDeleteBooking(id);
  //     },
  //   });
  // };

  // /**
  //  * handle delete booking
  //  */
  // const handleDeleteBooking = (id) => {
  //   dispatch(deleteBooking(id));
  // };

  return (
    // <DashboardLayout pageTitle="Dashboard">
    //   <div className="d-flex flex-column block-items">
    //     {/* page title */}
    //     <div className="block-items-header d-flex align-items-center">
    //       <h3>Booking List</h3>
    //     </div>

    //     {/* booking list */}
    //     <div className="d-flex flex-column list-setting">
    //       {bookings?.map((booking, index) => (
    //         <div
    //           key={index}
    //           className="d-flex justify-content-between flex-sm-row flex-column col-12 align-items-center"
    //         >
    //           {/* booked user name and email */}
    //           <div className="d-flex">
    //             <div className="d-flex flex-column justify-content-center align-items-start">
    //               <h4>{booking.name}</h4>
    //               <span className="facility__address">{booking.email}</span>
    //             </div>
    //           </div>

    //           {/* booking unique ids */}
    //           <div className="d-flex">
    //             <span>{booking.booking_unique_id}</span>
    //           </div>

    //           {/* booking time */}
    //           <div className="d-flex">
    //             <span>
    //               {moment(booking.from).format("YYYY-MM-DD HH:mm") +
    //                 " - " +
    //                 moment(booking.to).format("YYYY-MM-DD HH:mm")}
    //             </span>
    //           </div>

    //           {/* actions */}
    //           <div className="action__btns d-flex align-items-center">
    //             {/* delete booking */}
    //             <button
    //               className="btn btn-danger"
    //               onClick={() => handleDeleteBookingConfirmation(booking.id)}
    //             >
    //               <i className="fa fa-trash"></i>Delete
    //             </button>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </DashboardLayout>
    <DashboardLayout pageTitle="Dashboard">
      <div className="d-flex flex-column block-items">
        <h1>Coming Soon...</h1>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
