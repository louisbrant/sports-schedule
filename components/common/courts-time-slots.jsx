import { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import TimeService from "../../shared/time-service";
import BookingCustomerDetails from "../../screens/booking/booking-customer-details";
import { addBooking, resetSuccessStatus } from "../../store/booking/actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

const CourtsTimeSlots = ({
  pageSize = 12,
  pageIndex = 0,
  selectedDate,
  courtsTimeList,
  onSave,
  onAddToBookedList,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  console.log("coursts time -========>", courtsTimeList)

  // store selector
  const { bookingSuccess, bookingError } = useSelector((store) => ({
    bookingSuccess: store.booking.success,
    bookingError: store.booking.error,
  }));

  const [selectedDataToBook, setSelectedDataToBook] = useState({});
  const [bookedTimeList, setBookedTimeList] = useState([]);
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [showCustomerData, setShowCustomerData] = useState(false);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [bookingRecord, setBookingRecord] = useState({});
  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    email: "",
  });
  const [tempSlotStorage, setTempSlotStorage] = useState([]);

  useEffect(() => {
    if (bookingSuccess) {
      setBookedTimeList([]);
      setShowCustomerData(false);
      if (onAddToBookedList) onAddToBookedList([]);
      if (onSave) onSave();

      dispatch(resetSuccessStatus());
      router.push("/dashboard");
    }
  }, [bookingSuccess]);

  const displayPage = (data) => {
    console.log("PAGE DATA",data)
    const arr = [...data];
    const list = arr.splice(pageIndex * pageSize, pageSize);
    return list;
  };

  const handleShowCustomerDialog = (bookingRecord) => {
    setBookingRecord(bookingRecord);
    setShowCustomerDialog(true);
  };

  const handleCloseCustomerDialog = () => {
    setShowCustomerDialog(false);
  };

  // when drag starts
  const handleOnMouseDown = (
    courtObj,
    slotTimeObject,
    courtIndex,
    slotIndex
  ) => {
    if (showCustomerData) return;
    if (slotTimeObject.disabled) return;
    if (slotTimeObject.booked) return handleShowCustomerDialog(slotTimeObject);

    if (slotTimeObject.selected) {
      courtsTimeList[courtIndex].timeList[slotIndex].selected = false;
      setIsKeyDown(false);
      return false;
    }

    courtsTimeList[courtIndex].timeList[slotIndex].selected = true;
    setSelectedDataToBook({ from: slotTimeObject.time });

    // update temp storage
    setTempSlotStorage([
      ...tempSlotStorage,
      { court: courtIndex, slot: slotIndex },
    ]);
    setIsKeyDown(true);
  };

  // when mouse drag over
  const handleOnSlotMouseOver = (
    courtObj,
    slotTimeObject,
    courtIndex,
    slotIndex
  ) => {
    if (!isKeyDown) return;
    if (slotTimeObject.selected) return setIsKeyDown(false);
    const selObj = { ...selectedDataToBook };
    selObj.to = slotTimeObject.time;
    setSelectedDataToBook(selObj);

    // update temp storage
    setTempSlotStorage([
      ...tempSlotStorage,
      { court: courtIndex, slot: slotIndex },
    ]);
    courtsTimeList[courtIndex].timeList[slotIndex].selected = true;
  };

  // when drag stop
  const handleOnMouseUp = (courtObj, slotTimeObject, courtIndex, slotIndex) => {
    if (tempSlotStorage.length < 2) {
      tempSlotStorage.forEach((x) => {
        courtsTimeList[x.court].timeList[x.slot].selected = false;
      });
      setTempSlotStorage([]);
      return setIsKeyDown(false);
    }

    updateBookedList(courtObj, slotTimeObject, courtIndex, slotIndex);
    setIsKeyDown(false);
  };

  // remove booked slot
  const removeFromBookedList = (elem, index) => {
    const court = elem.court;
    const from = elem.from;
    const to = elem.to;
    const timeList = bookedTimeList.filter((ele, i) => i != index);

    courtsTimeList.forEach((ele) => {
      if (ele.court == court) {
        ele.timeList.forEach((elem) => {
          const isInRange = TimeService.checkIfASlotTimeInBetween2TimeValues(
            elem.time,
            from,
            to
          );
          if (isInRange) elem.selected = false;
        });
      }
    });

    setBookedTimeList(timeList);
    if (onAddToBookedList) onAddToBookedList(timeList);
  };

  // handle update booked slots
  const updateBookedList = (
    courtObj,
    slotTimeObject,
    courtIndex,
    slotIndex
  ) => {
    let obj = {};
    let arr = [...bookedTimeList];

    obj = {
      from: TimeService.getDateTimeAfterAddingTime(
        selectedDate,
        selectedDataToBook.from
      ),
      to: TimeService.addMinutesToTime(selectedDate, selectedDataToBook.to, 0),
      court: courtObj.court,
    };

    const bookingHours = moment
      .duration(moment(obj.to).diff(moment(obj.from)))
      .asHours();

    if (bookingHours < 1) {
      tempSlotStorage.forEach((x) => {
        courtsTimeList[x.court].timeList[x.slot].selected = false;
      });

      setTempSlotStorage([]);
      return false;
    }

    // calculate total booking price
    obj.total_fee = bookingHours * courtObj.court.fee;

    arr.push(obj);
    setTempSlotStorage([]);
    setBookedTimeList(arr);
    if (onAddToBookedList) onAddToBookedList(arr);
  };

  // save booking
  const saveBooking = async (event) => {
    event.preventDefault();
    //prepare data to booking service to save data
    const list = prepareBookedDataToSave();
    // calling booking service
    dispatch(addBooking({ booking: list }));
  };

  // prepare data for save booking
  const prepareBookedDataToSave = () => {
    const list = bookedTimeList.map((ele) => {
      const obj = {
        courtId: ele.court.id,
        facilityId: ele.court.facilityId,
        from: ele.from,
        to: ele.to,
        mobile: customer.mobile,
        name: customer.name,
        email: customer.email,
      };

      return obj;
    });
    return list;
  };

  const insertCustomerData = () => {
    setShowCustomerData(true);
  };

  const getSlotStyle = (el) => {

    if(el.booked){
      console.log("FIRST TIME", el.time)
    }

    if (el.disabled)
      return "col-1 bg-disabled d-flex justify-content-center align-items-center p-2 time-slot";
    if (el.booked)
      return "col-1 booked-slot d-flex justify-content-center align-items-center p-2 time-slot";
    if (el.selected)
      return "col-1 secondary_bg d-flex justify-content-center align-items-center p-2 time-slot";
    return "col-1 d-flex justify-content-center align-items-center p-2 time-slot";
  };

  const handleInputTextChange = ({ currentTarget: input }) => {
    let obj = { ...customer };
    obj[input.name] = input.value;

    setCustomer(obj);
  };

  return (
    <>
      {/* court slot listing */}
      {/*  */}
      {courtsTimeList.map((ele, index) => (
        <div className="courts-list-row" key={index}>
          <div className="courts__title">
            {ele.court.name} - {ele.court.type} - $ {ele.court.fee} / hour
          </div>
          <div className="courts-details-col">
            <div className="col-12 col-md-10 d-flex flex-wrap m0 p0">
    
              {displayPage(ele.timeList).map((el, i) => (
                <span
                  key={i}
                  onMouseDown={() => handleOnMouseDown(ele, el, index, i)}
                  onMouseOver={() => handleOnSlotMouseOver(ele, el, index, i)}
                  onMouseUp={() => handleOnMouseUp(ele, el, index, i)}
                  className={getSlotStyle(el)}
                >
                  {console.log(el.booked)}
                  {/* <div className="booked-text"> { el?.booked && i ===0 && <span className="secondary" style={{fontSize: 12, fontWeight: 'bold'}}>{`${el.time} - `}</span>} {el?.booked && i === displayPage(ele.timeList).length - 1 && <span className="secondary" style={{fontSize: 12, fontWeight: 'bold'}}>{`${el.time} `}</span>} { el?.booked && i ===0 && <span style={{color: '#1D976C', fontSize: 12, fontWeight: 'bold'}}>Booked</span> } </div> */}
                  { el?.booked && i ===0 && <span style={{color: '#1D976C', fontSize: 12, fontWeight: 'bold'}}>Booked</span> }
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* booked slot list */}
      {bookedTimeList.length > 0 && (
        <>
          {!showCustomerData && (
            <div className="bookedTimeList__block mt-4">
              <h3>Booking details</h3>
              <div className="bookedTimeList__Table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>Court</th>
                      <th>Date</th>
                      <th>Time From</th>
                      <th>Time To</th>
                      <th>Price</th>
                      <th width="100px" className="ml-auto">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookedTimeList.map((elem, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{elem?.court.name}</td>
                        <td>{TimeService.getDateFormat(elem?.from)}</td>
                        <td>{TimeService.getTimeFormat(elem?.from)}</td>
                        <td>{TimeService.getTimeFormat(elem?.to)}</td>
                        <td>${elem.total_fee}</td>
                        <td className="ml-auto">
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => removeFromBookedList(elem, index)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-right">
                <button
                  type="button"
                  className="btn btn-success"
                  value="Next"
                  onClick={insertCustomerData}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* customer information */}
          {showCustomerData && (
            <div className="mt-5">
              <h3>
                Customer Information
              </h3>
              <form className="form" onSubmit={saveBooking}>
                <div className="row m-0">
                  {/* mobile number */}
                  <div className="col-12 col-xs-12 col-md-4 p-2">
                    <div className="form-group">
                      <label>Mobile</label>
                      <input
                        name="mobile"
                        onChange={handleInputTextChange}
                        className="form-control"
                        type="number"
                        required
                      />
                    </div>
                  </div>

                  {/* user name */}
                  <div className="col-12 col-xs-12 col-md-4 p-2">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        name="name"
                        onChange={handleInputTextChange}
                        className="form-control"
                        type="text"
                        required
                      />
                    </div>
                  </div>

                  {/* user email */}
                  <div className="col-12 col-xs-12 col-md-4 p-2">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        onChange={handleInputTextChange}
                        className="form-control"
                        type="email"
                        name="email"
                      />
                    </div>
                  </div>
                </div>

                {/* action btns */}
                <div className="mt-2">
                  {/* save booking */}
                  <button
                    className="btn btn-success mr-2"
                    value="Back to booking"
                    type="submit"
                  >
                    Save booking
                  </button>

                  {/* cancel booking */}
                  <button
                    className="btn btn-secondary"
                    value="Back to booking"
                    type="reset"
                    // onClick={() => {
                    //   this.reset();
                    // }}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}

      {/* booking customer detail */}
      <BookingCustomerDetails
        show={showCustomerDialog}
        onClose={handleCloseCustomerDialog}
        bookingRecord={bookingRecord}
      ></BookingCustomerDetails>
    </>
  );
};

export default CourtsTimeSlots;
