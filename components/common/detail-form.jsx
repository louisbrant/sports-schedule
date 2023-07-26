import React, { useState, useEffect } from 'react';
//import { useRouter } from 'next/router';
import moment from 'moment';
import Select from './select';
import PriceList from './price-list';
import CalenderIcon from './svg_icons/calendar';
import TimeIcon from './svg_icons/time_icon';
import SelectSportIcon from './svg_icons/select_sport_icon';
import ButtonFrom from './button-form';
import { DatePicker, message, TimePicker, Select as Sel } from "antd";
import Tags from './tags';

const times = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
];

const types = [
  'Indoor',
  'Outdoor'
]

const listExtras = [
  {
    id: '1',
    value: 'Refreshments',
    price: '$10'
  },
  {
    id: '2',
    value: 'Pets Allowed',
    price: '$5'
  },
  {
    id: '3',
    value: 'Basket Ball Provided',
    price: '$8'
  },
]

const Separator = ({ flex, top }) => (
  <div
    style={{
      //width: width,
      flex: flex,
      height: 2,
      //left: 934, 
      //top: 369, 
      marginTop: top,
      opacity: 0.6,
      background: 'rgba(152, 181, 255, 0.3)'
    }}
  />
)

const onDateChange = (date, dateString) => {
  console.log(date, dateString);
}

const DetailForm = ({ formInModal, availableSports, courtData, facilitySports, searchObj }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [bookTime, setBookTime] = useState('');
  const [total, setTotal] = useState();

  // const router = useRouter();
  // const { detailFormData } = router.query;
  // const passedData=detailFormData && JSON.parse(detailFormData);
  // //const {selectedSports, startTime, endTime, date} = router.query;
  // console.log("Passed Data ==>", passedData);

  let paymentList = [
    {
      id: '1',
      value: 'Price per hour',
      //price: `${courtData[0]?.fee !==undefined ? `$${courtData[0]?.fee} / hour` : 'Loading...' }`
      price: `${selectedCourt !== '' ? `$${courtData[selectedCourt]?.fee} / hour` : '$100-200 / hour'}`
    },
    {
      id: '2',
      value: 'Booked For',
      price: `${bookTime !== '' ? bookTime : '2'} hours`
    },
    // {
    //   id: '3',
    //   value: 'Extras',
    //   price: '$10'
    // },
    // {
    //   id: '4',
    //   value: 'Discount',
    //   price: '20%'
    // },
    {
      id: '5',
      value: 'Tax',
      price: '10%'
    },
  ]

  const [courtPrice, setCourtPrice] = useState('');
  const [paymentSummary, setPaymentSummary] = useState(paymentList);
  //const [facilityPrice, setFacilityPrice] = useState('$100-200 / hr');
  //const [initialFee, setInitialFee] = useState(paymentList[0]?.price);

  useEffect(() => {
    console.log('formInModal, availableSports, courtData, facilitySports, searchObj', formInModal, availableSports, courtData, facilitySports, searchObj);
    //setCourtPrice(courtData[0]?.fee);
    console.log("===> Courts", courtData);
    //console.log(initialFee);
    //setInitialFee(`$${courtData[0]?.fee} / hour`);
    //paymentList[0].price.replace('$1000 / hour', `$${courtData[0]?.fee} / hour`);
  }, []);

  const handleDateChange = (dateString) => {
    console.log(dateString);
    setSelectedDate(dateString);
  }

  const handleTimeChange = (timeString) => {
    // const timeParts = timeString.split(',');
    const startTime = moment(selectedTime, 'HH:mm');
    const endTime = moment(timeString, 'HH:mm');
    const timeDiff = moment.duration(endTime.diff(startTime));
    const hours = timeDiff.asHours();
    console.log("Time Logs", startTime, endTime, timeDiff, hours);
    setBookTime(hours);
    // let temp_state = [...paymentSummary];
    // let temp_element = {...temp_state[1]};
    // temp_element.price = temp_element.price.replace('2 hours', `${hours} hours`);
    // temp_state[1] = temp_element;
    // setPaymentSummary(temp_state);

    //setSelectedTime(hours);

    //console.log(courtPrice)
    //const courtCost = courtPrice * 
    //setCourtPrice(courtPrice*)
  }

  const { Option } = Sel;

  // const currentSports = availableSports?.map(i=> ({
  //     key: i.name,
  //     label: i.name,
  //     value: i.sports_id,
  // }))

  // console.log(currentSports);

  const datePick = {
    marginTop: -16,
    background: 'transparent',
    width: '100%',
  }

  return (
    <div
      className={formInModal ? 'p-md-3 p-sm-2 p-2' : 'form-container ml-n4 p-4'}
      style={{
        background: '#F9FBFF',
        // paddingLeft: 24,
        // paddingRight: 24,
        // paddingTop: 20,
        // paddingBottom: 20,
        borderRadius: 12,
      }}
    >
      <div>
        <div
          className={formInModal ? 'px-md-2 px-sm-2 px-2 pt-4 mt-3 justify-content-between d-flex align-items-center'
            : 'px-1 pt-2 d-flex justify-content-between align-items-center'}
        //style={{justifyContent: 'space-between'}}
        >
          <p className='text-black font-weight-bold align-self-center h3'>
            {/* {courtData[0]?.fee!==undefined ? `$${courtData[0]?.fee} / hr` : 'Loading...'}  */}
            ${(bookTime !== '' && selectedCourt !== '') ? courtData[selectedCourt]?.fee * bookTime : '100-200'} / hr
          </p>
          {/* <ButtonFrom
            isDisabled={true}
            notForSubmit={true}
            className={formInModal ? `rounded-pill px-md-3 px-sm-3 px-3 py-md-3 py-2 text-white align-self-start mt-md-0 mt-sm-2 book_btn`
              : `rounded-pill ml-lg-2 px-lg-4 px-md-3 px-sm-2 px-2 py-lg-3 py-md-2
                             py-2 text-white align-self-start mt-md-0 mt-sm-2 book_btn` }
            label="20% Discount"
          btnStyle={{background: '#EE2E2A'}}
          /> */}
          <Tags
            isDisabled={true}
            notForSubmit
            className="rounded-pill p-3 my-lg-0 my-md-0 my-sm-0 my-0 
    text-center justify-content-center ml-0"
            label="20% Discount"
            btnStyle={{
              background: '#EE2E2A',
              alignSelf: 'center',
              fontSize: 14,
              fontWeight: 600,
              //margin: 'auto', 
              color: '#fff'
            }}
          />
        </div>
        {/* separator line */}
        <Separator flex={1} top={20} />
      </div>

      {/* Date & Time Picker Section */}
      <div className='date_section'>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }} className='px-2 px-sm-3'>
          <p className='form_heading' style={{ fontWeight: 'bold' }}> Pick Your Time </p>
          <Separator flex={0.95} top={12} />
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='d-flex align-items-center' style={{ borderWidth: 2, borderColor: 'rgba(152, 181, 255, 0.3)', borderStyle: 'solid', borderRadius: 60, paddingLeft: 24, paddingTop: 4, paddingBottom: 4 }}>
              <CalenderIcon />
              <div className='w-100'>
                <label className='mb-0' style={{ fontSize: 12, marginLeft: 12 }}>Select Date</label>
                <DatePicker className="datePicker" style={datePick} value={moment(searchObj?.date)} onChange={(value, dateString) => handleDateChange(dateString)} />
              </div>
            </div>
            <div className='d-flex w-100'>
              <div className='d-flex align-items-center mt-3' style={{ borderWidth: 2, borderColor: 'rgba(152, 181, 255, 0.3)', width: '98%', borderStyle: 'solid', borderRadius: 60, paddingLeft: 18, paddingTop: 4, paddingBottom: 4 }}>
                <TimeIcon />
                <div className='w-100 d-flex flex-column'>
                  <label className='mb-0' style={{ fontSize: 12, marginLeft: 12 }}>Select Start Time</label>
                  <Sel
                    defaultValue={"disabled"}
                    value={searchObj?.fromTime}
                    className="timeSelect1"
                    suffixIcon={""}
                    // onChange={(value) => setsearchModal({ ...searchModal, fromTime: value })}
                    onChange={(value) => setSelectedTime(value)}
                  >
                    <Option value="disabled" disabled>
                      Start
                    </Option>
                    {times.map((time, indx) => (
                      <Option value={time} key={indx}>
                        {time}
                      </Option>
                    ))}
                  </Sel>
                </div>
              </div>
              <div className='d-flex align-items-center mt-3 ml-3' style={{ borderWidth: 2, borderColor: 'rgba(152, 181, 255, 0.3)', width: '98%', borderStyle: 'solid', borderRadius: 60, paddingLeft: 18, paddingTop: 4, paddingBottom: 4 }}>
                <TimeIcon />
                <div className='w-100 d-flex flex-column'>
                  <label className='mb-0' style={{ fontSize: 12, marginLeft: 12 }}>Select End Time</label>
                  <Sel
                    defaultValue={"disabled"}
                    className="timeSelect1"
                    value={searchObj?.toTime}
                    suffixIcon={""}
                    style={{ zIndex: 999999 }}
                    dropdownStyle={{ zIndex: 99999 }}
                    onChange={(value) => handleTimeChange(value)}
                    onMouseLeave={() => setTotal(courtData[selectedCourt]?.fee * bookTime)}
                  // onChange={(value) => setsearchModal({ ...searchModal, fromTime: value })}
                  >
                    <Option value="disabled" disabled>
                      End
                    </Option>
                    {times.map((time, indx) => (
                      <Option value={time} key={indx}>
                        {time}
                      </Option>
                    ))}
                  </Sel>
                </div>
              </div>
            </div>
            <div className='d-flex align-items-center mt-3 ml-0' style={{ borderWidth: 2, borderColor: 'rgba(152, 181, 255, 0.3)', borderStyle: 'solid', borderRadius: 60, paddingLeft: 22, paddingTop: 4, paddingBottom: 4 }}>
              <SelectSportIcon />
              <div className='w-100 d-flex flex-column'>
                <label className='mb-0' style={{ fontSize: 12, marginLeft: 12 }} onClick={() => console.log(selectedSport)}>Select Category</label>
                <Sel
                  defaultValue={"disabled"}
                  value={searchObj?.sport}
                  className="timeSelect1"
                  suffixIcon={""}
                  onChange={(value) => setSelectedSport(value)}
                // onChange={(value) => setsearchModal({ ...searchModal, fromTime: value })}
                >
                  <Option value="disabled" disabled>
                    Select Sports
                  </Option>
                  {facilitySports?.map((sport, indx) => (
                    <Option value={sport} key={indx}>
                      {sport}
                    </Option>
                  ))}
                </Sel>
              </div>
            </div>

            <div className='d-flex align-items-center mt-3 ml-0' style={{ borderWidth: 2, borderColor: 'rgba(152, 181, 255, 0.3)', borderStyle: 'solid', borderRadius: 60, paddingLeft: 22, paddingTop: 4, paddingBottom: 4 }}>
              <SelectSportIcon />
              <div className='w-100 d-flex flex-column'>
                <label className='mb-0' style={{ fontSize: 12, marginLeft: 12 }} onClick={() => console.log(selectedType)}>Type of sport</label>
                <Sel
                  defaultValue={"disabled"}
                  className="timeSelect1"
                  suffixIcon={""}
                  onChange={(value) => setSelectedType(value)}
                // onChange={(value) => setsearchModal({ ...searchModal, fromTime: value })}
                >
                  <Option value="disabled" disabled>
                    Select Type
                  </Option>
                  {types.map((type, indx) => (
                    <Option value={type} key={indx}>
                      {type}
                    </Option>
                  ))}
                </Sel>
              </div>
            </div>

            {(selectedDate && selectedTime && selectedSport && selectedType) && (
              <div className='d-flex align-items-center mt-3 ml-0' style={{ borderWidth: 2, borderColor: 'rgba(152, 181, 255, 0.3)', borderStyle: 'solid', borderRadius: 60, paddingLeft: 22, paddingTop: 4, paddingBottom: 4 }}>
                <SelectSportIcon />
                <div className='w-100 d-flex flex-column'>
                  <label className='mb-0' style={{ fontSize: 12, marginLeft: 12 }}
                    onClick={() => console.log(selectedCourt)}
                  >Select Court</label>
                  <Sel
                    defaultValue={"disabled"}
                    className="timeSelect1"
                    suffixIcon={""}
                    onChange={(value) => setSelectedCourt(value)}
                    onMouseLeave={() => setTotal(courtData[selectedCourt]?.fee * bookTime)}
                  // onChange={(value) => setsearchModal({ ...searchModal, fromTime: value })}
                  >
                    <Option value="disabled" disabled>
                      Select Court
                    </Option>
                    {courtData?.map((court, indx) => (
                      <Option value={indx} key={indx}>
                        {court.name}
                      </Option>
                    ))}
                  </Sel>
                </div>
              </div>
            )}

          </div>
        </div>
        {/* <div className='py-4 px-2'>
          <div className='row justify-content-center'>
            <div className='d-flex rounded-pill mx-2 mb-md-2 px-4 py-2 align-self-start align-items-center bg-transparent'
              style={{ border: '2px solid rgba(152, 181, 255, 0.3)' }}
            >
              <CalenderIcon />
              <div className='d-md-block align-items-center'>
                <p className='h6 ml-2 pl-1 font-weight-bold mb-0' style={{ color: '#A6A6A6' }}> Date </p>
                <DatePicker
                  picker='date'
                  bordered={false}
                  dropdownClassName='date_dropdown'
                  className='rounded-pill align-self-end border-0 text-black datepicker'
                  //style={{border: '2px solid rgba(152, 181, 255, 0.3)'}}
                  onChange={onDateChange}
                  placeholder='Select Date'
                  suffixIcon={null}
                />
              </div>
            </div>
            <div className='time_picker d-flex rounded-pill mx-2 mt-sm-0 mt-md-0 px-4 py-2 align-self-start align-items-center bg-transparent'
              style={{ border: '2px solid rgba(152, 181, 255, 0.3)' }}
            >
              <TimeIcon />
              <div className='d-md-block align-items-center'>
                <p className='h6 ml-2 pl-1 font-weight-bold mb-0' style={{ color: '#A6A6A6' }}> Time </p>
                <TimePicker
                  format={'HH:mm'}
                  bordered={false}
                  dropdownClassName='date_dropdown'
                  className='rounded-pill align-self-end border-0 text-black'
                  style={{ border: '2px solid rgba(152, 181, 255, 0.3)' }}
                  placeholder='Select Time'
                  suffixIcon={null}
                />
              </div>
            </div>
          </div>

          <div className='align-items-center'>
            <label className='h6 font-weight-bold'
              id='select-title'
            > Type </label>
            <SelectSportIcon />
            <div>
              <Select
                optionList={availableSports}
                isDetails
                isAddCourt={false}
                className='rounded-pill sport_selector mx-lg-4 mx-md-3 mx-sm-2 px-lg-2 px-md-4 px-sm-4 mt-lg-0 mt-md-3 flex'
                isSportSelector={true}
                onOptionsChanged={(sport) => setSelectedSport(sport)}
                selectedOptions={selectedSport}
                placeholder="Choose a Sport"
              />
            </div>
          </div>
        </div> */}
      </div>

      {/* <div>
          <div className='mx-md-3 mx-sm-3 mx-2' style={{display: 'flex', justifyContent: 'space-between', marginTop: 64}}>
            <p className='form_heading' style={{fontWeight: 'bold'}}> Select Extras </p>
            <Separator flex={0.95} top={12}/>
          </div>
          <div className='d-flex p-2 flex-column justify-content-center'>
            <PriceList listData={listExtras}/>
          </div> 
        </div> */}

      {/* Payment Summary Section */}
      <div>
        <div className='mx-md-3 mx-sm-3 mx-2' style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
          <p className='form_heading' style={{ fontWeight: 'bold' }}> Payment Summary </p>
          <Separator flex={0.95} top={12} />
        </div>
        {/* Payment Summary List */}
        <div className='d-flex p-2 flex-column justify-content-center'>
          <PriceList listData={paymentList} noCheckBox={true} />
        </div>
        <Separator flex={1} top={20} />
      </div>
      {console.log("CD", courtData)}
      {/* Booking Action Section */}
      <div className='align-items-center justify-content-center p-4 '>
        <div className='row px-lg-3 px-md-4 px-sm-3 px-2 aligns-items-center justify-content-between'>
          <p style={{ fontSize: 18, fontWeight: 'bold', color: '#D81C67' }}> Total </p>
          {(!isNaN(courtData[0]?.fee) || courtData?.length < 0) ?
            <p style={{ fontSize: 18, fontWeight: 'bold', color: '#D81C67' }}>
              ${bookTime !== '' && selectedCourt !== ''
                ? total + 0.1 * total
                : courtData[0]?.fee * 2
              }
              /hr
            </p>
            : <p style={{ fontSize: 18, fontWeight: 'bold', color: '#D81C67' }}>No Courts</p>
          }
        </div>
      </div>
      <button
        type={"button"}
        className='border-0 bg-transparent text-white mt-lg-3 mt-md-2 
                       text-center justify-content-center w-100 pb-5'
      >
        <ButtonFrom
          isDisabled={false}
          notForSubmit={false}
          className="text-white h5 text-center justify-content-center book_btn shadow-lg"
          label="Book Now"
          // btnStyle={{
          //   background: '#EE2E2A', 
          //   alignSelf: 'center', 
          //   borderRadius: 16,
          // }}
          doSubmit={() => console.log("Place Booked")}
        />
      </button>
    </div>
  )
}

export default DetailForm