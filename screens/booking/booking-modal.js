import moment from "moment";
import React from "react";

const BookingModal = ({ handleModal, bookingData, bookedCourt, selectedFacility }) => {

  return (
    <div className="booking__modal">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center booking__header">
          <h3 className="ml-3 mt-3 mb-3 secondary">All Bookings</h3>
          <div
            className="mr-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleModal(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
              stroke={"#243358"}
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        {bookingData?.length > 0 &&
          bookingData?.map((item) => (
            <div
              className="pt-5"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "rgba(0,0,0,.1)",
              }}
            >
              <div className="row booking__body pb-3 mb-5 mx-sm-3">
                <div className="col-lg-3 col-xl-2 col-md-3 col-sm-4 col-6 d-flex">
                  <div className="status__icon mr-2" />
                  <div className="booking__content">
                    <h3 className="booking__title fs-20">{moment(item?.updatedAt).format("MMM Do YY")}</h3>
                    <h4 className="booking__label">{`${moment(item?.from).format("h:mm")} - ${moment(item?.to).format("h:mm")}`}</h4>
                  </div>
                </div>
                <div className="col-lg-3 col-xl-2 col-md-3 col-sm-4 col-6">
                  <div className="booking__content">
                    <h4 className="booking__label">Client Name</h4>
                    <h3 className="booking__title">{item?.name}</h3>
                  </div>
                </div>
                <div className="col-lg-3 col-xl-2 col-md-3 col-sm-4 mt-4 mt-sm-0 col-6">
                  <div className="booking__content">
                    <h4 className="booking__label">Email</h4>
                    <h3 className="booking__title">{item?.email}</h3>
                  </div>
                </div>
                <div className="col-lg-3 col-xl-2 col-md-3 col-sm-4 col-6 mt-4 mt-sm-4 mt-md-0">
                  <div className="booking__content">
                    <h4 className="booking__label">Facility Name</h4>
                    <h3 className="booking__title">{selectedFacility?.label}</h3>
                  </div>
                </div>
                <div className="col-lg-3 col-xl-2 col-md-3 col-sm-4 col-6 mt-4 mt-sm-4 mt-xl-0">
                  <div className="booking__content">
                    <h4 className="booking__label">Court Name</h4>
                    <h3 className="booking__title">{bookedCourt?.name}</h3>
                  </div>
                </div>
                <div className="col-lg-3 col-xl-2 col-md-3 col-sm-4 col-6 mt-4 mt-sm-4 mt-xl-0">
                  <div className="booking__content">
                    <h4 className="booking__label">Status</h4>
                    <h3
                      className="booking__title d-flex"
                      style={{ color: "#1D976C" }}
                    >
                      <div className="status__icon mr-2" /> { item?.status?? 'Booked'}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookingModal;
