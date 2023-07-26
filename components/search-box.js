import { useState } from "react";
import Router from "next/router";
import { getLatLng } from "react-places-autocomplete";
import Input from "./common/input";
import Select from "./common/select";
import Time from "./common/time";
import MapSearchAddress from "./map/map-address-search";
import { SearchModel, SearchValidation } from "../helpers/validationModels";
import ValidationService from "../shared/validation-service";
import moment from "moment";
import { DatePicker, message, TimePicker, Select as Sel } from "antd";
import { useSelector } from "react-redux";

const times = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "1:00",
  "1:30",
  "2:00",
  "2:30",
  "3:00",
  "3:30",
  "4:00",
  "4:30",
  "5:00",
  "5:30",
  "6:00",
  "6:30",
  "7:00",
];

const SearchBox = ({ isHorizontal = true, isDate = true }) => {
  const { Option } = Sel;

  const schema = new SearchValidation().schema;
  const [errors, setErrors] = useState({});
  const [searchModal, setsearchModal] = useState(new SearchModel());

  // state selectors
  const { sports } = useSelector((state) => ({
    sports: state.sport.sports.map((x) => ({
      key: x.name,
      label: x.name,
      value: x.sports_id,
    })),
  }));

  // handle option change
  const onOptionsChanged = (list) => {
    if (list) {
      const obj = { ...searchModal };
      obj.selectedSports = list.label;
      obj.sportId = list;
      setsearchModal(obj);
    }
  };

  // handle input changes
  const handleChange = ({ currentTarget: input }) => {
    const errorsList = { ...errors };
    const searchData = Object.assign(new SearchModel(), searchModal);
    searchData[input.name] = input.value;

    const errorMessage = ValidationService.validateProperty(
      input,
      schema,
      searchData
    );

    if (errorMessage) errorsList[input.name] = errorMessage;
    else delete errorsList[input.name];

    setErrors(errorsList);
    setsearchModal(searchData);
  };

  // handle time change
  const onTimeChanged = (time, timeString, keyName) => {
    const obj = { ...searchModal };
    obj[keyName] = time;

    let diffDuration;
    if (keyName === "fromTime") {
      obj.toTime = time.clone().add(1, "hours");

      diffDuration = time
        ? moment.duration(obj.toTime.diff(time)).asHours()
        : 0;
    } else {
      diffDuration = time
        ? moment.duration(time.diff(obj.fromTime)).asHours()
        : 0;
    }

    // check minimum one hour time interval
    if (diffDuration < 1) {
      message.error("Please select atleast 1 hour time difference");

      return false;
    }

    setsearchModal(obj);
  };

  // get lat lang
  const handleLocationChange = async (data) => {
    const obj = { ...searchModal };
    const latLng = await getLatLng(data);
    obj["locationText"] = data.formatted_address;
    obj["location"] = `${latLng.lat}-${latLng.lng}`;
    setsearchModal(obj);
  };

  // validate search box
  const validate = () => {
    const tempSearchModal = {
      ...searchModal,
      from: searchModal.fromTime
        ? searchModal.fromTime.format("HH:mm").toString()
        : "",
      to: searchModal.toTime
        ? searchModal.toTime.format("HH:mm").toString()
        : "",
    };

    setsearchModal((prevVal) => ({ ...prevVal, ...tempSearchModal }));

    const err = ValidationService.validate(schema, tempSearchModal);
    if (err) {
      setErrors(err);

      message.error(Object.values(err)[0]);
      return false;
    }

    setErrors({});
    return true;
  };

  // handle search
  const handleSearch = () => {

    const tempSearchModal = {
      ...searchModal,
      from: searchModal.fromTime
        ? searchModal.fromTime
        :
        "",
      to: searchModal.toTime
        ? searchModal.toTime
        :
        "",
    };

    const err = ValidationService.validate(schema, tempSearchModal);
    console.log(err);
    if (err) {
      setErrors(err);

      message.error(Object.values(err)[0]);
      return false;
    }

    setErrors({});

    Router.push(
      `/listing/${encodeURIComponent(JSON.stringify(tempSearchModal))}`
    );
  };

  return (
    <>
      <div className="index-search-box-no-padding d-flex">
        <div
          className={`search-form-row d-flex ${isHorizontal ? "" : ""
            } align-items-center ${isHorizontal ? "w-100" : ""}`}
        >
          <div
            className={`search-form-item sport-form-item ${isHorizontal ? (isDate ? "select__sports__dropdown" : "") : ""
              } ${errors.selectedSports ? "invalid-form-item" : ""}`}
          >
            {isDate && (
              <div className="d-flex align-items-center">
                <img src={"/assets/icons/category.svg"} className="label-img" />
                <div className="w-100">
                  <p className="label grey mb-0">Category</p>
                  <Select
                    name="sports"
                    className={
                      isHorizontal && isDate ? "search-select ipt" : "ipt"
                    }
                    optionList={sports}
                    selectedOptions={searchModal.sportId}
                    onOptionsChanged={onOptionsChanged}
                    placeholder="Select your sport"
                  ></Select>
                </div>
              </div>
            )}

            {!isDate && (
              <>
                <Input
                  type="text"
                  onChange={handleChange}
                  value={searchModal.location}
                  className={`form-control ${isHorizontal && isDate ? "search-select" : "bg-white"
                    }`}
                  name="location"
                  placeholder="What are you looking for ?"
                  error={errors.location}
                />
              </>
            )}
          </div>
          <div
            className={`search-form-item ${isHorizontal
              ? isDate
                ? "d-flex justify-content-start align-items-center select__location"
                : "d-flex justify-content-start align-items-center"
              : "d-flex justify-content-start align-items-center"
              } ${errors.location ? "invalid-form-item" : ""}`}
          >
            <div className="d-flex align-items-center w-100">
              <img src={"/assets/icons/location.svg"} className="label-img" />
              <div className="w-100">
                <p className="label grey mb-0">Location</p>
                <MapSearchAddress getAddressLatLng={handleLocationChange} />
              </div>
            </div>
          </div>
          {isDate && (
            <div
              // style={{ height: "88%" }}
              className={`search-form-item ${isHorizontal
                ? isDate
                  ? "d-flex justify-content-start align-items-center select__datepicker__dropdown"
                  : ""
                : ""
                } ${errors.date ? "invalid-form-item" : ""}`}
            >
              <div className="d-flex align-items-center w-100 h-100">
                <img src={"/assets/icons/date.svg"} className="label-img" />
                <div className="w-100">
                  <p className="label grey mb-0" style={{ marginTop: -14 }}>
                    Date
                  </p>
                  <DatePicker className="datePicker" onChange={(value, dateString) => setsearchModal({ ...searchModal, date: dateString })} />
                  {/* <Input
                    type="date"
                    className={`form-control ${
                      isHorizontal ? "search-select ipt pl-4" : "ipt pl-4"
                    }`}
                    name="date"
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    value={searchModal.date}
                    placeholder="Select a date"
                  /> */}
                </div>
              </div>
            </div>
          )}
          {isDate && (
            <div
              className={`search-time-picker ${isHorizontal
                ? isDate
                  ? "d-flex justify-content-start align-items-center searchbox__timepicker"
                  : ""
                : ""
                } ${errors.from || errors.to ? "invalid-form-item" : ""}`}
            >
              <div className="d-flex align-items-center w-100">
                <img src={"/assets/icons/time.svg"} className="label-img" />
                <div className="w-100">
                  <p className="label grey mb-2" style={{ marginTop: -10 }}>
                    Time
                  </p>
                  {/* <TimePicker.RangePicker className="timePicker" format={'HH:mm'} allowClear={false} /> */}
                  <div className="d-flex justify-content-evenly align-items-center ml-4 mt-2">
                    <Sel
                      defaultValue={"disabled"}
                      className="timeSelect w-75"
                      suffixIcon={""}
                      onChange={(value) => setsearchModal({ ...searchModal, fromTime: value })}
                    >
                      <Option value="disabled" disabled>
                        Start
                      </Option>
                      {times.map((time, indx) => (
                        <Option value={time} key={indx} style={{ padding: 10 }}>
                          {time}
                        </Option>
                      ))}
                    </Sel>
                    <div style={{ marginLeft: -22, marginBottom: 3, zIndex: 9999 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={16}
                        viewBox="0 0 20 20"
                        fill={'#cecece'}
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <Sel
                      defaultValue={"disabled"}
                      className="timeSelect w-75"
                      style={{ marginLeft: 8 }}
                      suffixIcon={""}
                      onChange={(value) => setsearchModal({ ...searchModal, toTime: value })}
                    >
                      <Option value="disabled" disabled>
                        End
                      </Option>
                      {times.map((time, indx) => (
                        <Option value={time} key={indx} style={{ padding: 10 }}>
                          {time}
                        </Option>
                      ))}
                    </Sel>
                  </div>
                  {/* <Input
                    type="datetime"
                    className={`form-control ${
                      isHorizontal ? "search-select ipt pl-4" : "ipt pl-4"
                    }`}
                    name="datetime"
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    value={searchModal.date}
                    placeholder="Select a time"
                  /> */}
                </div>
              </div>

              {/*  */}
            </div>
          )}
          {isDate && (
            <div
              className={
                isHorizontal
                  ? isDate
                    ? "ml-lg-auto search__container"
                    : "searchicon"
                  : ""
              }
            >
              <div onClick={handleSearch}>
                <a
                  className={`btn-search web-search ${isHorizontal ? "" : ""} `}
                >
                  <i className="fa fa-search pr-2"></i> Search
                </a>
                <a
                  className={`btn-search mobile-search ${isHorizontal ? "" : ""
                    } `}
                >
                  <i className="fa fa-search pr-2"></i>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBox;
