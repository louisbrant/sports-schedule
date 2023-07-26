import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DatePicker, TimePicker, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { message } from "antd";
import Cookies from "js-cookie";
import QRCode from "qrcode";

import { BookingValidation } from "../../helpers/validationModels";
import ValidationService from "../../shared/validation-service";
import TimeService from "../../shared/time-service";
import { addBooking, resetSuccessStatus } from "../../store/booking/actions";
import Layout from "../../components/layout/layout";
import Googlemapcomp from "../../components/Googlemapcomp/Googlemapcomp";
import ImageLightbox from "../../components/ImageLightbox/ImageLightbox";
import { getFacilityById } from "../../store/facility/actions";
import Select from "../../components/common/select";
import { getSports } from "../../store/sport/actions";
import { getCourtsByFacility } from "../../store/court/actions";
import BookingService from "../booking/booking-service";
import ImageGrid from "../../components/common/images-grid";
import Breadcrumb from "../../components/common/breadcrumb";
import DetailForm from "../../components/common/detail-form";
import DetailsFeatures from "../../components/common/details-features";
import DetailModal from "../../components/common/detail-modal";
import ModalButton from '../../components/common/svg_icons/modal_button'
import WideCard from "../../components/common/wide_card";

const FacilityDetail = () => {
  const schema = new BookingValidation().schema;
  const dispatch = useDispatch();
  const router = useRouter();

  //const { search } = router.query;
  //console.log("Passed Data to Details-> ", decodeURIComponent(search))

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchObj, setsearchObj] = useState({});
  const [courtOption, setCourtOptions] = useState([
    {
      key: "Indoor",
      label: "Indoor",
      value: "in",
    },
    {
      key: "Outdoor",
      label: "Outdoor",
      value: "out",
    },
  ]);
  const [bookingStat, setBookingStat] = useState({
    date: null,
    from: null,
    sport: null,
    to: null,
    court: courtOption.find((x) => x.value == "in"),
    price: 0,
    total_fee: 0,
  });
  const [courtId, setCourtId] = useState(null);
  const [qrcodeSrc, setQrCodeSrc] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [disableMinutes, setDisableMinutes] = useState([]);
  const [disableHours, setDisableHours] = useState([]);

  const { facility, sports, courts, bookingSuccess, booking, courtActivities } = useSelector(
    (state) => ({
      facility: state.facility.facility,
      sports: state.sport.sports.map((x) => ({
        key: x.name,
        label: x.name,
        value: x.sports_id,
      })),
      //initial-
      courts: state.court.courts,
      //modified-
      courtActivities: state.court.courts[0]?.activities.map((x) => ({
        key: x,
        label: x,
        value: x,
      })),
      bookingSuccess: state.booking.success,
      booking: state.booking.bookings[0],
    })
  );

  console.log('facility, sports, courts, bookingSuccess, booking, courtActivities=>', facility, sports, courts, bookingSuccess, booking, courtActivities)

  useEffect(() => {
    if (courts.length) {
      const bookingTempStat = { ...bookingStat };
      const court = courts.find((x) => x.type === bookingStat.court?.value);
      bookingTempStat.price = court?.fee || 0;
      setCourtId(court?.id);
      setBookingStat(bookingTempStat);
    }
  }, [bookingStat.sport]);

  useEffect(() => {
    const { searchData } = router.query;
    console.log("QUERY DATA =====", searchData)

    if (searchData) {
      const tempSearch = JSON.parse(searchData);
      const tempSearchObj = {
        ...searchObj,
        sport: tempSearch.selectedSports,
        // tempSearch.sportId.value || tempSearch.sportId,
        latlong: tempSearch.location,
        date: tempSearch.date,
        locationText: tempSearch.locationText,
        fromTime: tempSearch.from,
        toTime: tempSearch.to
        // tempSearch.from ? `${tempSearch.from}-${tempSearch.to}` : null,
      };

      setsearchObj(tempSearchObj);

    }
  }, [])

  useEffect(() => {
    if (bookingSuccess) {
      QRCode.toDataURL(booking.booking_unique_id).then((data) => {
        setQrCodeSrc(data);
      });

      setBookingStat({
        date: null,
        from: null,
        sport: null,
        to: null,
        court: null,
      });

      dispatch(resetSuccessStatus());

      setIsModalVisible(true);
    }
  }, [bookingSuccess]);

  useEffect(() => {
    handleBookedSlots();
  }, [bookedSlots]);

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      const { facilityId } = router.query;
      /**
       * get facility details by id
       */
      dispatch(getFacilityById(facilityId));

      // get sport list
      dispatch(getSports());

      // get courts by facility
      dispatch(getCourtsByFacility(facilityId));
    }
    return () => { };
  }, [router.query]);

  // handle sport options
  const sportOptions = () => {
    return sports.filter((x) =>
      facility.sports ? facility.sports.includes(x.label) : true
    );
  };

  // handle court change
  const handleCourtChange = (court) => {
    const bookingTempStat = { ...bookingStat };
    bookingTempStat.court = court;
    bookingTempStat.price = (
      courts.find((x) => x.type === court.value) || {}
    ).fee;
    setBookingStat(bookingTempStat);
  };

  // handle disable date
  const handleDisableDate = (current) => {
    return current && current < moment().startOf("day");
  };

  // handle disable hours
  const handleDisableHours = (selectedHour = null) => {
    var hours = [];
    if (
      bookingStat.date.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
    ) {
      const currentHours = selectedHour ? selectedHour.hour() : moment().hour();
      for (let i = 0; i < currentHours; i++) {
        hours.push(i);
      }
    }

    return [...hours, ...disableHours];
  };

  // handle disable minutes
  const handleDisableMinutes = (selectedHour) => {
    var minutes = [];
    if (selectedHour === moment().hour()) {
      for (var i = 0; i < moment().minute(); i++) {
        minutes.push(i);
      }
    }

    disableMinutes
      .filter((x) => x.hour === selectedHour)
      .forEach((x) => {
        minutes.push(x.minute);
      });

    return minutes;
  };

  // handle date change
  const handleDateChange = async (date) => {
    const tempBookingObj = { ...bookingStat };
    tempBookingObj.date = date;
    setBookingStat(tempBookingObj);

    const { facilityId } = router.query;
    const bookingsRes = await BookingService.getByFacilityIdAndDate(
      facilityId,
      date.format("YYYY-MM-DD")
    );
    setBookedSlots(bookingsRes.data.bookings);
  };

  // handle time change
  const onTimeChanged = (time, timeString, keyName) => {
    const obj = { ...bookingStat };
    obj[keyName] = time;

    let diffDuration;
    if (keyName === "from") {
      obj.to = time.clone().add(1, "hours");

      diffDuration = time ? moment.duration(obj.to.diff(time)).asHours() : 0;
    } else {
      diffDuration = time ? moment.duration(time.diff(obj.from)).asHours() : 0;
    }

    // check minimum one hour time interval
    if (diffDuration < 1) {
      message.error("Please select atleast 1 hour time difference");

      return false;
    }

    obj.total_fee = bookingStat.price * diffDuration || 0;

    setBookingStat(obj);
  };

  // handle save booking
  const handleSaveBooking = () => {
    let userData = Cookies.get("userData");

    if (!userData) {
      router.push("/login");

      return false;
    }

    userData = JSON.parse(userData);

    const from = moment(bookingStat.from).format("HH:mm");
    const to = moment(bookingStat.to).format("HH:mm");

    const bookingDate = bookingStat.date.format('MM-DD-YYYY')

    const obj = {
      facilityId: facility.id,
      sportId: bookingStat.sport?.value,
      courtId: courtId,
      from: moment(`${bookingDate} ${from}`, 'MM-DD-YYYY HH:mm').format(),
      to: moment(`${bookingDate} ${to}`, 'MM-DD-YYYY HH:mm').format(),
      mobile: userData.phone,
      email: userData.email,
    };

    const errorMessage = ValidationService.validate(schema, obj);
    if (errorMessage) {
      message.error(Object.values(errorMessage)[0]);
      return false;
    }

    // calling booking service
    dispatch(addBooking({ booking: [obj] }));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // handle booked slots
  const handleBookedSlots = () => {
    const disableHours = new Set();
    const disableMinutes = [];

    bookedSlots
      .filter((x) => x.courtId === courtId)
      .forEach((x) => {
        const fromHour = new Date(x.from).getHours();
        const fromMinutes = new Date(x.from).getMinutes();
        const toHour = new Date(x.to).getHours();
        const toMinutes = new Date(x.to).getMinutes();

        if (fromMinutes < 30) {
          disableHours.add(fromHour);
        }

        if (
          fromMinutes >= 30 &&
          disableMinutes.findIndex(
            (x) => x.hour === fromHour && x.minute === 30
          ) === -1
        ) {
          disableMinutes.push({ hour: fromHour, minute: 30 });
        }

        if (toMinutes > 30) {
          disableHours.push(toHour);
        }

        if (
          toMinutes <= 30 &&
          toMinutes > 0 &&
          disableMinutes.findIndex(
            (x) => x.hour === toHour && x.minute === 0
          ) === -1
        ) {
          disableMinutes.push({ hour: toHour, minute: 0 });
        }

        for (let i = fromHour; i <= toHour; i++) {
          if (i !== fromHour && i !== toHour) {
            disableHours.add(i);
          }
        }
      });

    setDisableHours([...disableHours]);
    setDisableMinutes(disableMinutes);
  };

  // return (
  //   <Layout pageTitle={facility.name} isHome={true}>
  //     <div className="ListingDetailsStyles">
  //       <div className="container">
  //         {/* facility name and address */}
  //         <div className="ListingDetails__sec__heading">
  //           <div className="listingDetails_logo">
  //             <img src={facility.logo} alt={facility.name} />
  //           </div>
  //           <div className="head-details">
  //             <h4>{facility.name}</h4>
  //             <div className="ListingDetails__address">
  //               <a>{facility.address}</a>
  //             </div>
  //           </div>
  //         </div>

  //         {/* facility images */}
  //         {facility.images && facility.images.length > 0 && (
  //           <div className="ListingDetails__allimgs__block">
  //             <div className="fullimg__col">
  //               <img src={facility.images[0]} alt="ListImg1" />
  //             </div>

  //             <div className="imglist__col">
  //               {[...facility.images].splice(1, 4).map((x, index) => (
  //                 <div className="img" key={index}>
  //                   <img src={x} alt={x} />
  //                 </div>
  //               ))}
  //               <div className="show__allimg">
  //                 <button
  //                   type="button"
  //                   className="btn btn-danger"
  //                   onClick={() => setOpenLightbox(true)}
  //                 >
  //                   Show all photos
  //                 </button>
  //               </div>
  //               {openLightbox && (
  //                 <ImageLightbox
  //                   ImagesList={facility.images.length ? facility.images : []}
  //                   onCloseRequest={() => setOpenLightbox(false)}
  //                 />
  //               )}
  //             </div>
  //           </div>
  //         )}

  //         <div className="ListingDetails__infoblock">
  //           <div className="ListingDetails__infocol__colleft">
  //             {/* facility overview */}
  //             <div
  //               className="ListingDetails__hightlights"
  //               dangerouslySetInnerHTML={{ __html: facility.overview }}
  //             ></div>

  //             {/* facility features */}
  //             <div className="ListingDetails__placeoffers">
  //               <div className="ListingDetails__sec__heading">
  //                 <h5>What this place offers</h5>
  //               </div>
  //               <div className="placeoffers__lists__block">
  //                 {facility.features &&
  //                   facility.features.map((x, index) => (
  //                     <div className="placeoffers__list" key={index}>
  //                       <div className="placeoffers__text">{x}</div>
  //                     </div>
  //                   ))}
  //               </div>
  //             </div>
  //           </div>

  //           {/* booking model */}
  //           <div className="ListingDetails__infocol__colright">
  //             <div className="availabillty__block">
  //               <div className="form-group availabillty__title__row">
  //                 {bookingStat.price > 0 && (
  //                   <div className="price">
  //                     {`$${bookingStat.price}`} / hour
  //                   </div>
  //                 )}

  //                 <div className="reviews">4.73</div>
  //               </div>
  //               <form className="form__availabillty">
  //                 {/* sport list */}
  //                 <div className="ml-auto select__formcontrol form-group">
  //                   <Select
  //                     optionList={sportOptions()}
  //                     selectedOptions={[bookingStat.sport]}
  //                     onOptionsChanged={(sport) => {
  //                       setBookingStat({ ...bookingStat, sport: sport });
  //                     }}
  //                     placeholder="Select sport"
  //                   ></Select>
  //                 </div>

  //                 {/* court list */}
  //                 <div className="form-group ml-auto select__formcontrol">
  //                   <Select
  //                     optionList={courtOption}
  //                     selectedOptions={[bookingStat.court]}
  //                     onOptionsChanged={(court) => handleCourtChange(court)}
  //                     placeholder="Select court"
  //                   ></Select>
  //                 </div>

  //                 {/* date picker */}
  //                 <div className="select__datepicker__dropdown">
  //                   <DatePicker
  //                     value={bookingStat.date}
  //                     className="form-control search-select"
  //                     name="date"
  //                     placeholder="Select a date"
  //                     onChange={handleDateChange}
  //                     disabledDate={handleDisableDate}
  //                   />
  //                 </div>

  //                 {bookingStat.date && (
  //                   <div className="searchbox__timepicker">
  //                     {/* from timer */}
  //                     <TimePicker
  //                       onChange={(x, y) => onTimeChanged(x, y, "from")}
  //                       className="form-control"
  //                       value={bookingStat.from}
  //                       format="HH:mm"
  //                       minuteStep={30}
  //                       disabledHours={handleDisableHours}
  //                       disabledMinutes={handleDisableMinutes}
  //                     />

  //                     {/* to timer */}
  //                     <TimePicker
  //                       onChange={(x, y) => onTimeChanged(x, y, "to")}
  //                       className="form-control"
  //                       value={bookingStat.to}
  //                       format="HH:mm"
  //                       minuteStep={30}
  //                       disabledHours={() =>
  //                         handleDisableHours(bookingStat.from)
  //                       }
  //                       disabledMinutes={handleDisableMinutes}
  //                     />
  //                   </div>
  //                 )}

  //                 {bookingStat.total_fee > 0 && (
  //                   <div>Total price: {`$${bookingStat.total_fee}`}</div>
  //                 )}

  //                 <div className="form__actionbtn">
  //                   {/* book now btn */}
  //                   <button
  //                     type="button"
  //                     value="Book now"
  //                     className="btn btn-danger w-100"
  //                     onClick={handleSaveBooking}
  //                     disabled={bookingStat.total_fee <= 0}
  //                   >
  //                     Book now
  //                   </button>

  //                   {/* success booking message */}
  //                   <Modal
  //                     className="BookNowThankyouModal"
  //                     title="Thankyou"
  //                     visible={isModalVisible}
  //                     footer={null}
  //                     onCancel={handleCancel}
  //                     width={600}
  //                     okButtonProps={{
  //                       danger: true,
  //                     }}
  //                     cancelButtonProps={{
  //                       danger: true,
  //                       ghost: true,
  //                     }}
  //                   >
  //                     <div className="bookingInfo">
  //                       <p>
  //                         <strong>Booking id:</strong>{" "}
  //                         {booking?.booking_unique_id}
  //                       </p>

  //                       <p>
  //                         <strong>Register Email Address:</strong>{" "}
  //                         {booking?.email}
  //                       </p>
  //                     </div>
  //                     <div className="qr-code-image">
  //                       <img src={qrcodeSrc} alt="qr code" />
  //                     </div>
  //                   </Modal>
  //                 </div>
  //               </form>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="ListingDetails__mapblock">
  //           <div className="ListingDetails__sec__heading">
  //             <h5>Where you’ll be</h5>
  //           </div>
  //           <div className="ListingDetails__Googlemap">
  //             <Googlemapcomp
  //               locations={[{ lat: facility.lat, lng: facility.lng }]}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </Layout>
  // );

  return (
    <Layout footerAtHome={false} pageTitle={facility?.name !== undefined ? facility.name : 'Webroo Facility | Book your facility now'} isHome={true}>
      <div className="container py-4" style={{ marginTop: 72 }}>
        <Breadcrumb facilityName={facility.name} />
        <div className="row">
          <div className="col-12 col-md-12 col-sm-12 col-lg-8 main__details__content">
            <ImageGrid facility={facility} />
            <div className="col-md-12 p-2">
              <DetailsFeatures
                facilityName={facility.name}
                facilityAddress={facility.address}
                facilityFeatures={facility.features} />
            </div>
          </div>
          <div className="col-md-4 side__details__content d-none d-md-none d-sm-none d-lg-block">
            {/* <p> Hello Form </p> */}
            {/* {
              window.innerWidth < 768 ? (<DetailModal/>) : (<DetailForm/>)
            } */}
            <DetailForm availableSports={sports} courtData={courts} facilitySports={facility?.sports} searchObj={searchObj} />
          </div>

          {/* Mobile Detail Form Section */}
          <div className='mobile-detail-form'>
            <DetailModal availableSports={courtActivities} courtData={courts} />
          </div>
          {/* {window.innerWidth < '768px' && <DetailModal/>} */}
        </div>

        <div className="location_map" id="mapLocation">
          <p className='font-weight-bold fs-5 px-3'> Location Map </p>
          <div className="ListingDetails__Googlemap pl-3">
            <Googlemapcomp
              locations={[{ lat: facility?.lat, lng: facility?.lng }]}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FacilityDetail;
