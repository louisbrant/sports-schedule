import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getLatLng } from "react-places-autocomplete";

import Form from "../../components/common/form";
import Input from "../../components/common/input";
import DashboardLayout from "../../components/layout/dashboard-layout.jsx";
import FavilityService from "./facility-service";
import UploadGallery from "../../components/upload/upload-gallery";
import UploadProfileImage from "../../components/upload/upload-profile-image";
import NotifyService from "../../shared/notify-service";
import BookingSetting from "../../components/booking-setting";
import FacilityModel from "./facility-model";
import Select from "../../components/common/select";
import Days from "../../components/common/days";
import MapSearchAddress from "../../components/map/map-address-search";

import { getSports } from "../../store/sport/actions";
import { getFeatures } from "../../store/feature/actions";
import { getFacilityById } from "../../store/facility/actions";

import Button from '../../components/common/button';

import Calendar from '../../components/react-calendar/CalendarComponent/Calendar'
import { Modal } from "react-bootstrap";

const MapPicker = dynamic(() => import("../../components/map/map-picker"), {
  ssr: false,
});

const TextEditor = dynamic(
  () => import("../../components/common/text-editor"),
  { ssr: false }
);

const FacilityScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // default position
  const [defaultPosition, setDefaultPoistion] = useState({
    lat: -23,
    lng: 134,
  });
  const [facilityModel, setFacilityModel] = useState(new FacilityModel());

  const { facilityData, features, sports } = useSelector((store) => ({
    facilityData: store.facility.facility,
    features: store.feature.features.map((x) => ({
      key: x.name,
      label: x.name,
      value: x.feature_id,
    })),
    sports: store.sport.sports.map((x) => ({
      key: x.name,
      label: x.name,
      value: x.sports_id,
    })),
  }));

  useEffect(() => {
    if (facilityData.id) {
      // set default position
      setDefaultPoistion({
        lat: facilityData.lat || -23,
        lng: facilityData.lng || 134,
      });

      // set facility model
      setFacilityModel({
        ...facilityData,
        features: facilityData.features.reduce((acc, item) => {
          features.map((x) => {
            if (x.key === item) {
              acc.push(x.value);
            }
          });

          return acc;
        }, []),
        sports: facilityData.sports.reduce((acc, item) => {
          sports.map((x) => {
            if (x.key === item) {
              acc.push(x.value);
            }
          });

          return acc;
        }, []),
        timeSetting: facilityData.timesettings.map((x) => ({
          day: x?.day,
          times: [{ from: x?.from, to: x?.to }],
        })),
      });
    }
  }, [facilityData]);

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      /**
       * get facility by id
       */
      dispatch(getFacilityById(router.query.facilityId));
    }

    /**
     * get feature list
     */
    dispatch(getFeatures());
    /**
     * get sport list
     */
    dispatch(getSports());
  }, [router.query]);

  const handleChangeLatLong = async (data) => {
    const latLng = await getLatLng(data);
    setDefaultPoistion({ lat: latLng.lat, lng: latLng.lng });
  };

  const onUploadGalleryChange = (imageName) => {
    const obj = { ...facilityModel };
    if (!obj.images) obj.images = [];
    obj.images.push(imageName);
    setFacilityModel(obj);
  };

  const onGalleryImageDeleted = (imageName) => {
    const obj = { ...facilityModel };
    const list = [...obj.images];
    const newList = list.filter((image) => image != imageName);
    obj.images = newList;
    setFacilityModel(obj);
  };

  const onTextEditorChanged = (txt) => {
    const obj = { ...facilityModel };
    obj.overview = txt;
    setFacilityModel(obj);
  };

  /**
   * handle feature change
   */
  const onOptionsChanged = (list) => {
    if (list) {
      const obj = { ...facilityModel };
      let selectedOptionsTxt = [];
      list.map((option) => {
        selectedOptionsTxt.push(option.value);
      });
      obj.features = selectedOptionsTxt;
      setFacilityModel(obj);
    }
  };

  /**
   * handle sport change
   */
  const onOptionsSportsChanged = (list) => {
    if (list) {
      const obj = { ...facilityModel };
      let selectedOptionsTxt = [];
      list.map((option) => {
        selectedOptionsTxt.push(option.value);
      });
      obj.sports = selectedOptionsTxt;
      setFacilityModel(obj);
    }
  };

  const handleNameChange = ({ currentTarget: input }) => {
    const obj = { ...facilityModel };
    obj[input.name] = input.value;
    const publicName = getPublicName(input.value);
    obj.publicName = publicName;
    setFacilityModel(obj);
  };

  const getPublicName = (name) => {
    return name.toString().replaceAll(" ", "-");
  };

  const handleChange = ({ currentTarget: input }) => {
    const obj = { ...facilityModel };
    obj[input.name] = input.value;
    setFacilityModel(obj);
  };

  const handleChkBoxChange = ({ currentTarget: input }) => {
    const obj = { ...facilityModel };
    obj[input.name] = input.checked;
    setFacilityModel(obj);
  };

  const onLogoUploaded = (imageName) => {
    const obj = { ...facilityModel };
    obj.logo = imageName;
    setFacilityModel(obj);
  };

  const onLocationChanged = (address, position) => {
    const obj = { ...facilityModel };
    obj.lat = position?.lat;
    obj.lng = position?.lng;
    obj.address = address;
    obj.friendlyAddress = address;
    setFacilityModel(obj);
  };

  const [mapPicker, setMapPicker] = useState(
    <MapPicker
      onLocationChanged={onLocationChanged}
      defaultPosition={defaultPosition}
    ></MapPicker>
  );

  useEffect(() => {
    setMapPicker(
      <MapPicker
        onLocationChanged={onLocationChanged}
        defaultPosition={defaultPosition}
      ></MapPicker>
    );
  }, [defaultPosition]);

  const onBookingSettingChanged = (timeSetting) => {
    const obj = { ...facilityModel };
    obj.timeSetting = timeSetting;
    setFacilityModel(obj);
  };

  const onOffDaySelected = (offDays) => {
    const obj = { ...facilityModel };
    obj.offDays = offDays;
    setFacilityModel(obj);
  };

  const getSelectedOptions = (list, options) => {
    let selectedList = [];
    [...new Set(list)].map((item) => {
      options.map((option) => {
        if (option.value === item) {
          selectedList.push(option);
        }
      });
    });

    return selectedList;
  };

  const handleSave = async () => {
    try {
      delete facilityModel.timesettings;
      if (!facilityModel.id) await FavilityService.add(facilityModel);
      else await FavilityService.update(facilityModel);
      NotifyService.success("Facility Saved Successfully!");
      router.push("/facility-management");
    } catch (error) {
      NotifyService.fail("Facility Not Saved!");
    }
  };

  const [selectedDate, setSelectedDate] = useState([]);
  const [eventModalVisible, setEventModalVisible] = useState(false);

  const handleSelectedDate = (value) => {
    console.log("SE ===========",value)
   selectedDate.length > 0 ? selectedDate?.map((item, idx) => {
    if(item.dayOfMonth === value.dayOfMonth){
      console.log("DELETE ITEM ====",item)
      setSelectedDate(selectedDate.filter(item => item.dayOfMonth !== value.dayOfMonth))
    }else{
      setSelectedDate([...selectedDate, value])
    }
   })
   : setSelectedDate([value])
  }

  const handleModalOpen = () => {
    setEventModalVisible(!eventModalVisible)
  }

  return (
    <DashboardLayout footerInMng={false} pageTitle="Facility">
      <div className="d-flex">
        <Form className="form col-12 p-0">
          <h3 className="ml-3 mt-3 mb-3 secondary">
            {facilityData.id ? "Edit Facility" : "Add Facility"}
          </h3>
          <div className="d-flex block-items white__bg flex-column">
            <div className="d-flex align-items-center block-items-header title__item__header">
              <h3 className="secondary-light fs-18" style={{width: '11%'}}>Basic Information</h3>
              <div style={{borderBottomWidth: 1, borderBottomStyle:'solid', borderBottomColor: "#efefef", height: 1, width: '100%', marginLeft: 16}} />
              {/* {facilityData && facilityData.id && (
                <Link
                  href="/facility/[facilityId]/add-court"
                  as={`/facility/${facilityData.id}/add-court`}
                >
                  <a className="btn btn-dark ml-auto">
                    {" "}
                    <i className="fa fa-plus mr-2"></i> Add Court/Field
                  </a>
                </Link>
              )} */}
            </div>
            <div className="col-12 d-flex flex-wrap">
              <div className="col-lg-2 col-12">
                <div className="upload__profileimg">
                  {/* <label>Facility Logo</label> */}
                  <UploadProfileImage
                    src={facilityModel.logo}
                    onImageUploaded={onLogoUploaded}
                  ></UploadProfileImage>
                </div>
                <div className="checkbox__block">
                  {/* <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      name="councilOperated"
                      value={facilityModel.councilOperated}
                      checked={facilityModel.councilOperated}
                      className="custom-control-input"
                      id="councilOperated"
                      onChange={handleChkBoxChange}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="councilOperated"
                    >
                      Council Operated
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      name="publicFacility"
                      value={facilityModel.publicFacility}
                      checked={facilityModel.publicFacility}
                      className="custom-control-input"
                      id="publicFacility"
                      onChange={handleChkBoxChange}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="publicFacility"
                    >
                      Public Facility
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      name="needBooking"
                      value={facilityModel.needBooking}
                      checked={facilityModel.needBooking}
                      className="custom-control-input"
                      id="needBooking"
                      onChange={handleChkBoxChange}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="needBooking"
                    >
                      Need Booking
                    </label>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-9 col-12 basic__information__inputs">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-6">
                    <div className="input-group">
                      <Input
                        type="text"
                        onChange={handleNameChange}
                        value={facilityModel.name}
                        className="form-control"
                        name="name"
                        label="Facility title"
                        placeholder="Type ficility title"
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6">
                    <div className="form-group">
                      <label>Features</label>
                      <Select
                        className="multi__select"
                        optionList={features}
                        selectedOptions={getSelectedOptions(
                          facilityModel.features,
                          features
                        )}
                        onOptionsChanged={onOptionsChanged}
                        placeholder="Select features"
                        multi={true}
                      ></Select>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="d-flex flex-column col-xs-12 col-sm-12 col-md-6">
                    <label className="">Sports</label>
                    <Select
                      optionList={sports}
                      selectedOptions={getSelectedOptions(
                        facilityModel.sports,
                        sports
                      )}
                      onOptionsChanged={onOptionsSportsChanged}
                      placeholder="Select Sports"
                      multi={true}
                    ></Select>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6">
                    <div className="input-group">
                      <Input
                        type="text"
                        onChange={handleNameChange}
                        // value={facilityModel.name}
                        className="form-control"
                        name="name"
                        label="Share Facility"
                        placeholder="https://webroo.com/facility1"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-xs-12 col-sm-12 col-md-6">
                    <div className="input-group">
                      <Input
                        type="text"
                        onChange={handleNameChange}
                        value={facilityModel.email}
                        className="form-control"
                        name="email"
                        label="Email"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6">
                    <div className="input-group">
                      <Input
                        type="text"
                        onChange={handleNameChange}
                        value={facilityModel.phone}
                        className="form-control"
                        name="phone"
                        label="Phone"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="custom-control custom-checkbox" style={{paddingLeft: '2.5rem'}}>
                    <input
                      type="checkbox"
                      name="publicFacility"
                      value={facilityModel.publicFacility}
                      checked={facilityModel.publicFacility}
                      className="custom-control-input"
                      id="publicFacility"
                      onChange={handleChkBoxChange}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="publicFacility"
                    >
                      Public Facility
                    </label>
                  </div>
                </div>
                <div className="row mt-5">
                <div className="col-12">
                <label>Features Description</label>
                <TextEditor
                state={facilityModel.overview}
                onTextChanged={onTextEditorChanged}
              ></TextEditor>
                  </div>
                </div>

                {/* select features */}
                
              </div>

              {/* select sports */}
              
            </div>
          </div>

          {/* facility location */}
          <div className="d-flex block-items white__bg flex-column">
            <div className="d-flex align-items-center block-items-header title__item__header">
              <h3 className="secondary-light fs-18">Location</h3>
              <div style={{borderBottomWidth: 1, borderBottomStyle:'solid', borderBottomColor: "#efefef", height: 1, width: '100%', marginLeft: 16}} />
            </div>
            <div className="col-lg-6 pb-0 facilityScreenLocation">
              <MapSearchAddress isAddFacility fromFacility getAddressLatLng={handleChangeLatLong} facAddress={facilityModel.address || ""} />
            </div>
            <div className="col-12">{mapPicker}</div>
            {/* <div className="col-12 d-flex flex-wrap p-2">
              <div className="col-lg-6 col-12">
                <Input
                  type="text"
                  onChange={handleChange}
                  value={facilityModel.address || ""}
                  className="form-control"
                  name="address"
                  label="Facility address"
                  placeholder="Type ficility address"
                />
              </div>
              <div className="col-lg-6 col-12">
                <Input
                  type="text"
                  onChange={handleChange}
                  value={facilityModel.friendlyAddress || ""}
                  className="form-control"
                  name="friendlyAddress"
                  label="Friendly address"
                  placeholder="Type friendly address"
                />
              </div>
            </div> */}
          </div>

          {/* facility images */}
          <div className="d-flex block-items white__bg flex-column">
          <div className="d-flex align-items-center block-items-header title__item__header">
              <h3 className="secondary-light fs-18">Gallery</h3>
              <div style={{borderBottomWidth: 1, borderBottomStyle:'solid', borderBottomColor: "#efefef", height: 1, width: '100%', marginLeft: 16}} />
            </div>
            <div className="col-12">
              <UploadGallery
                data={facilityModel.images}
                onDeleted={onGalleryImageDeleted}
                onChanged={onUploadGalleryChange}
              ></UploadGallery>
            </div>
          </div>

          {/* facility details */}
          {/* <div className="d-flex block-items flex-column">
            <div className="block-items-header title__item__header">
              <h3>Details</h3>
            </div>
            <div className="col-12">
              <TextEditor
                state={facilityModel.overview}
                onTextChanged={onTextEditorChanged}
              ></TextEditor>
            </div>
            <div className="d-flex flex-column p-2">
              <div className="d-flex flex-wrap">
                <div className="col-lg-4 col-12">
                  <Input
                    onChange={handleChange}
                    value={facilityModel.phone}
                    className="form-control"
                    name="phone"
                    label="Phone"
                    placeholder="Type a phone"
                  />
                </div>
                <div className="col-lg-4 col-12">
                  <Input
                    onChange={handleChange}
                    value={facilityModel.email}
                    className="form-control"
                    name="email"
                    label="Email"
                    placeholder="Type an email"
                  />
                </div>
                <div className="col-lg-4 col-12">
                  <Input
                    onChange={handleChange}
                    value={facilityModel.website}
                    className="form-control"
                    name="website"
                    label="Website"
                    placeholder="Type a website"
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap">
                <div className="col-lg-4 col-12">
                  <Input
                    onChange={handleChange}
                    value={facilityModel.facebook}
                    className="form-control"
                    name="facebook"
                    label="Facebook"
                    placeholder="Facebook"
                  />
                </div>
                <div className="col-lg-4 col-12">
                  <Input
                    onChange={handleChange}
                    value={facilityModel.twitter}
                    className="form-control"
                    name="twitter"
                    label="Twitter"
                    placeholder="Twitter"
                  />
                </div>
                <div className="col-lg-4 col-12">
                  <Input
                    onChange={handleChange}
                    value={facilityModel.youtube}
                    className="form-control"
                    name="youtube"
                    label="Youtube"
                    placeholder="Youtube"
                  />
                </div>
              </div>
            </div>
          </div> */}

          {/* facility timing setting */}

          <div className="d-flex flex-column white__bg block-items">
          <div className="d-flex align-items-center block-items-header title__item__header">
              <h3 className="secondary-light fs-18">Availability & Events</h3>
              <div style={{borderBottomWidth: 1, borderBottomStyle:'solid', borderBottomColor: "#efefef", height: 1, width: '88%', marginLeft: 12}} />
            </div>
          <div className="d-flex justify-content-start align-items-start mr-auto flex-wrap">
                <div className="mx-3">
                  <Calendar current={0} selectedDate={selectedDate} handleSelectedDate={handleSelectedDate}/>
                </div>
                {/* <div className="border_left px-3">
                  <Calendar current={1}/>
                </div> */}
                <div className="event__manager mt-3 pt-3 pl-4 ml-2">
                  <h3>Availability</h3>
                  <div style={{height: '78%'}}>
                    <div className="mb-4">
                      <h4 className="mb-0">11:00 AM - 2:00 PM</h4>
                      <h5>Working</h5>
                    </div>
                    <div className="mb-4">
                      <h4 className="mb-0">11:00 AM - 2:00 PM</h4>
                      <h5>Break</h5>
                    </div>
                    <div className="mb-4">
                      <h4 className="mb-0">11:00 AM - 2:00 PM</h4>
                      <h5>Working</h5>
                    </div>
                  </div>
                  <div className="new_event" style={{backgroundColor: '#243358', color: "#fff", width: 'fit-content', padding: 12, borderRadius: 8}} onClick={() => handleModalOpen()}>
                    Add New Event
                  </div>
                </div>
                
              </div>
          </div>

          {/* <Modal show={eventModalVisible} onHide={handleModalOpen} className="image-dialog">
            <Modal.Header closeButton className="secondary card-text">Add Event</Modal.Header>
            <Modal.Body>
              <div className="container" style={{width: '100%'}}>
                <div className="row">
                  <div className="col-12">
                    <div className="input-group">
                      <Input
                        type="text"
                        onChange={handleNameChange}
                        value={facilityModel.name}
                        className="form-control"
                        name="name"
                        label="Event Name"
                        placeholder="Type ficility title"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="input-group">
                      <Input
                        type="text"
                        onChange={handleNameChange}
                        value={facilityModel.name}
                        className="form-control"
                        name="name"
                        label="Time In"
                        placeholder="Type ficility title"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group">
                      <Input
                        type="text"
                        onChange={handleNameChange}
                        value={facilityModel.name}
                        className="form-control"
                        name="name"
                        label="Time Out"
                        placeholder="Type ficility title"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button label={"Save Event"} primary onClick={() => handleModalOpen()}/>
              <Button label={"Cancel"} primary={false} onClick={() => handleModalOpen()}/>
            </Modal.Footer>
          </Modal> */}

          {/* <div className="d-flex flex-column block-items">
            <div className="block-items-header title__item__header">
              <h3>Booking Setting</h3>
            </div>
            <div className="d-flex flex-column col-12">
              <BookingSetting
                defaultTimeSetting={
                  facilityData?.timeSetting ? facilityData.timeSetting : false
                }
                onBookingSettingChanged={onBookingSettingChanged}
              ></BookingSetting>
            </div>
          </div> */}

          {/* facility off days */}
          {/* <div className="d-flex flex-column block-items mb-4">
            <div className="block-items-header title__item__header">
              <h3>Off Days</h3>
            </div>
            <div className="d-flex flex-column col-12">
              <Days
                defaultSelectedDays={
                  facilityData?.offDays ? facilityData.offDays : []
                }
                onDaySelected={onOffDaySelected}
              ></Days>
            </div>
          </div> */}

          <div className="float-right mr-3 mt-3">
          <Button label={'Save'} primary onClick={handleSave}/>
          </div>
          {/* action btns */}
          {/* <div className="d-flex justify-content-end col-12">
            <button
              className="btn btn-success btn-lg mr-4"
              onClick={handleSave}
              type="button"
            >
              Save
            </button>
            <button
              className="btn btn-danger btn-lg"
              onClick={() => router.push("/facility-management")}
              type="button"
            >
              Cancel
            </button>
          </div> */}
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default FacilityScreen;
