import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HorizontalDates from "../../components/common/horizontal-dates";
import HorizontalTimeSlots from "../../components/common/horizontal-time-slots";
import CourtsTimeSlots from "../../components/common/courts-time-slots";
import DashboardLayout from "../../components/layout/dashboard-layout";
import TimeService from "../../shared/time-service";
import ConfigService from "../../shared/config-service";
import Select from "../../components/common/select";
import CourtService from "../court/court-service";
import BookingService from "./booking-service";

import {
  getAddedFacilities,
  getFacilitiesBySportId,
} from "../../store/facility/actions";
import { getSports } from "../../store/sport/actions";
import Button from '../../components/common/button'
import BookingModal from "./booking-modal";

const BookingMng = () => {
  const dispatch = useDispatch();

  const { facilities, sports } = useSelector((store) => ({
    facilities: store.facility.facilities.map((e) => ({
      key: e.id,
      value: e.name,
      label: e.name,
    })),
    sports: store.sport.sports.map((x) => ({
      key: x.name,
      label: x.name,
      value: x.sports_id,
    })),
  }));

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPage, setSelectedPage] = useState(0);
  const [datesList, setDatesList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [courtsTimeList, setCourtsTimeList] = useState([]);
  const [selectedSport, setSelectedSport] = useState({});
  const [selectedFacility, setSelectedFacility] = useState({});
  const [selectedFacilityCourts, setSelectedFacilityCourts] = useState([]);
  const [bookedList, setBookedList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookin, setBookin] = useState([]);
  const [bookedCourt, setBookedCourt] = useState({})

  useEffect(() => {
    if (selectedSport.value) {
      dispatch(getFacilitiesBySportId(selectedSport.value));
    }
  }, [selectedSport]);

  useEffect(() => {
    dispatch(getSports()); // get sports
    dispatch(getAddedFacilities()); // get added facilities

    const d = TimeService.getReverseDateFormat(new Date());
    setSelectedDate(d);
    setDatesList(ConfigService.getDefaultDateList());
    setTimeList(ConfigService.getDefaultTimeList());
  }, []);

  const handleSelectDate = (date) => {
    const d = TimeService.getReverseDateFormat(new Date(date));
    setSelectedDate(d);
    prepareTimeList(selectedFacilityCourts, d, selectedFacility.key);
  };

  const handleChangePage = (page) => {
    setSelectedPage(page);
  };

  /**
   * handle change sport
   * update facilities when sport changed
   */
  const handleChangeFacility = (facility) => {
    setSelectedFacility(facility);
    getCourtsByFacility(facility.key);
  };

  const onAddToBookedList = (list) => {
    setBookedList(list);
  };

  const getCourtsByFacility = async (facilityId) => {
    const res = await CourtService.getByFacilityId(facilityId);
    const { courts } = res.data;
    console.log("COURTS==", courts)
    setSelectedFacilityCourts(courts);
    prepareTimeList(courts, selectedDate, facilityId);
  };

  const prepareTimeList = async (courts, date, facilityId) => {
    const d = TimeService.getReverseDateFormat(new Date());
    let bookingsList = [];
    if (courts && courts.length) {
      const bookingsRes = await BookingService.getByFacilityIdAndDate(
        facilityId,
        date != "" ? date : d
      );
      const { bookings } = bookingsRes.data;
      setBookin(bookings)
      bookingsList = bookings;
    }
    const courtsTList = courts.map((court) => {
      return {
        court: court,
        timeList: prepareEachCourtTimeSlots(court, bookingsList, date),
      };
    });

    console.log("courts time", courtsTList)
    setCourtsTimeList(courtsTList);
  };

  const prepareEachCourtTimeSlots = (court, bookingsList, date) => {
    console.log("BOOKING DATA ====", court);
    const defTimeList = ConfigService.getDefaultTimeList();
    const list = defTimeList.map((deftime) => {
      const obj = {
        time: deftime,
        selected: checkIfCellTimeIsActive(court, deftime, date),
        booked: checkIfCourtBookedInATime(court, deftime, bookingsList),
        disabled: checkIfSelectedDateIsInOffDays(court.offDays, date),
        customer: getBookingCustomerDetails(court, deftime, bookingsList),
      };
      return obj;
    });
    return list;
  };

  const getBookingCustomerDetails = (court, time, bookingsList) => {
    let customerDetails = {};
    if (!bookingsList.length) return customerDetails;
    for (let booking of bookingsList) {
      if (court.id == booking.courtId) {
        const isInRange = checkIfASlotTimeInBetween2TimeValues(
          time,
          booking.from,
          booking.to
        );
        if (isInRange) {
          customerDetails = {
            name: booking.name,
            mobile: booking.mobile,
            email: booking.email,
          };
          return customerDetails;
        }
      }
    }

    return customerDetails;
  };

  const checkIfCourtBookedInATime = (court, time, bookingsList) => {
    let isBooked = false;
    if (!bookingsList.length) return isBooked;
    //check if time in any of bookingsList AND the court == booking court
    for (let booking of bookingsList) {
      if (court.id == booking.courtId) {
        setBookedCourt(court)
        const isInRange = checkIfASlotTimeInBetween2TimeValues(
          time,
          booking.from,
          booking.to
        );
        if (isInRange) {
          isBooked = true;
          return isBooked;
        }
      }
    }

    return isBooked;
  };

  const checkIfSelectedDateIsInOffDays = (offDays, selectedD) => {
    const d = TimeService.getReverseDateFormat(new Date());
    const selDate = selectedD != "" ? selectedD : d;
    let isOff = false;
    if (!offDays || !offDays.length) return isOff;
    offDays.forEach((element) => {
      const elementDate = TimeService.getReverseDateFormat(new Date(element));
      if (elementDate === selDate) {
        isOff = true;
        return isOff;
      }
    });

    return isOff;
  };

  const checkIfCellTimeIsActive = (court, time, date) => {
    let isActive = false;
    if (!bookedList || !bookedList.length) return isActive;
    bookedList.forEach((element) => {
      const d = TimeService.getReverseDateFormat(new Date(element.from));
      const isTimeBetween = checkIfASlotTimeInBetween2TimeValues(
        time,
        element.from,
        element.to
      );
      if (element.court.id === court.id && isTimeBetween && d === date) {
        isActive = true;
        return isActive;
      }
    });
    return isActive;
  };

  const checkIfASlotTimeInBetween2TimeValues = (time, fromTime, toTime) => {
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
  };

  const handleOnBookingSave = () => {
    prepareTimeList(selectedFacilityCourts, selectedDate, selectedFacility.key);
  };

  const handleModal = (value) => {
    setShowModal(value)
  }

  return (
    <DashboardLayout pageTitle="Booking Managment">
       <div className="d-flex justify-content-between align-items-center">
          <h3 className="ml-3 mt-3 mb-3 secondary mobile__title">
            Booking Management
          </h3>
          <div className="mr-3">
          <Button label="All Bookings" onClick={() => setShowModal(!showModal)} />
          </div>
       </div>
       { showModal && <div>
        <BookingModal handleModal={handleModal} bookingData={bookin} bookedCourt={bookedCourt} selectedFacility={selectedFacility} />
       </div>}
      <div className="d-flex flex-column block-items ">
       
        {/* sport section */}
        <div className="dropdown-section">
          <div className="booking-filter-item">
            <div className="block-items-header">
              <label>Select a sport</label>
              <div
                className={
                  selectedSport.value === null ||
                  selectedSport.value === undefined
                    ? "ml-auto select__formcontrol"
                    : "select__formcontrol"
                }
              >
                <Select
                  optionList={sports}
                  onOptionsChanged={(sport) => setSelectedSport(sport)}
                  selectedOptions={selectedSport}
                  placeholder="Select sport"
                  multi={false}
                ></Select>
              </div>
            </div>
          </div>

          {/* facility section */}
          {selectedSport.value && facilities.length > 0 && (
            <div className="booking-filter-item">
              <div className="block-items-header">
                <label>Select a facility</label>
                <div className="select__formcontrol">
                  <Select
                    optionList={facilities}
                    onOptionsChanged={handleChangeFacility}
                    selectedOptions={selectedFacility}
                    placeholder="Select facility"
                    multi={false}
                  ></Select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* date and time slots section */}
        <div className="list-booking">
          <div className="courts-list-row">
            <div className="courts__title secondary">Available Courts</div>
            <div className="courts-details-col">
              {/* dates */}
              <div className="d-flex bookingdate__list">
                <HorizontalDates
                  datesList={datesList}
                  onDateSelected={handleSelectDate}
                ></HorizontalDates>
              </div>

              {/* times */}
              <div className="d-flex bookingtime__list">
                <HorizontalTimeSlots
                  timeList={timeList}
                  onPageChanged={handleChangePage}
                ></HorizontalTimeSlots>
              </div>
            </div>
          </div>

          {/* cort list */}
          <CourtsTimeSlots
            onAddToBookedList={onAddToBookedList}
            onSave={handleOnBookingSave}
            courtsTimeList={courtsTimeList}
            pageIndex={selectedPage}
            selectedDate={selectedDate}
          ></CourtsTimeSlots>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BookingMng;
