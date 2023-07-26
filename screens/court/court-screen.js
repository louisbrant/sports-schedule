import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Form from "../../components/common/form";
import Input from "../../components/common/input";
import DashboardLayout from "../../components/layout/dashboard-layout.jsx";
import LookupService from "../../shared/lookup-service";
import CourtService from "./court-service";
import NotifyService from "../../shared/notify-service";
import CourtModel from "./court-model";
import Select from "../../components/common/select";

import { getFacilityById } from "../../store/facility/actions";
import { getFeatures } from "../../store/feature/actions";
import { getSports } from "../../store/sport/actions";
import ModalCloseBtn from "../../components/common/svg_icons/close_modal_btn";
import ButtonFrom from "../../components/common/button-form";

const CourtScreen = ({ facilityData, courtData, modalOnAddNew, exitModal, handleAddNewBtn }) => {
  const router = useRouter();
  const [courtTypes] = useState(LookupService.courtTypes);
  const [selectedCourtType, setSelectedCourtType] = useState({});
  const [selectedSportType, setSelectedSportType] = useState({});
  const [courtModel, setCourtModel] = useState(new CourtModel());

  const dispatch = useDispatch();

  const { facility, features, sports } = useSelector((store) => ({
    facility: store.facility.facility,
    features: store.feature.features.map((x) => ({
      key: x.name,
      value: x.name,
      label: x.name,
    })),
    sports: store.sport.sports.map((x) => ({
      key: x.name,
      value: x.name,
      label: x.name,
    })),
  }));

  useEffect(() => {
    /**
     * get facility detail by id
     */
    dispatch(getFacilityById(facilityData.id));

    /**
     * get sports list
     */
    dispatch(getSports());

    /**
     * get features list
     */
    dispatch(getFeatures());
    console.log("Specific Court Data====", courtData)
  }, []);

  useEffect(() => {
    if (courtData) {
      const cModel = { ...courtModel };
      cModel.name = courtData.name;
      cModel.activities = courtData.activities;
      cModel.features = courtData.features;
      cModel.fee = courtData.fee;
      cModel.type = courtData.type;
      cModel.facilityId = courtData.facilityId;
      cModel.id = courtData.id;
      setCourtModel(cModel);

      setSelectedCourtType({
        key: courtData.type,
        label: courtData.type === "in" ? "Indoor" : "Outdoor",
        value: courtData.type === "in" ? "Indoor" : "Outdoor",
      });

      setSelectedSportType({
        key: courtData.activities[0],
        label: courtData.activities[0],
        value: courtData.activities[0],
      });
    }
    console.log(courtData)
    
  }, []);

  const onTypeChanged = (list) => {
    if (list) {
      const obj = { ...courtModel };
      setSelectedCourtType(list);
      obj.type = list.key;
      setCourtModel(obj);
    }
  };

  const onSportChanged = (list) => {
    if (list) {
      const obj = { ...courtModel };
      setSelectedSportType(list);
      obj.activities = [list.key];
      setCourtModel(obj);
    }
  };

  /**
   * get selected options from available options
   */
  const getSelectedOptions = (list, options) => {
    let selectedList = [];
    [...new Set(list)].map((item) => {
      options.map((option) => {
        if (option.value == item) {
          selectedList.push(option);
        }
      });
    });

    return selectedList;
  };

  const handleSave = async () => {
    try {
      if (!courtModel.id) {
        let obj = { ...courtModel };
        obj.facilityId = facilityData.id;
        await CourtService.add(obj);
        //setRecentCourts(courtModel);
      } else { await CourtService.update(courtModel); } 
      NotifyService.success("Court Saved Successfully!");
      router.push(`/facility/${facilityData.id}/courts`);
    } catch (error) {
      NotifyService.fail("Court Not Saved!");
    }
  };

  const Separator = ({flex, top}) => (
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

  return (
    // <DashboardLayout pageTitle="Court">
      <div className="d-flex">
        <Form className="form p-3 col-12">
          {/* header */}
          {/* <h3 className="black ml-3 mt-3 mb-3">
            Add Court {facility && <span>- {facility.name}</span>}
          </h3> */}
           <div className='d-flex w-100 justify-content-between'>
              <p className='secondary h3' style={{fontWeight: 600}}> {modalOnAddNew ? 'Add Court': 'Edit Court'} </p>
              <ModalCloseBtn onClick={()=> {exitModal(); modalOnAddNew===true ? handleAddNewBtn() : null;}}/>
              {/* <p className='h4 secondary' style={{cursor: 'pointer'}} onClick={exitModal}> X </p>   */}
          </div>
          <Separator flex={1} top={12}/>
          <div className="d-flex block-items flex-column m-0 m-md-3">
            {/* basic information */}
            <div className="block-items-header px-0 px-md-3">
              <h3 onClick={()=> console.log(courtModel.name)}>Basic Information</h3>
            </div>
            <div className="col-12 d-flex flex-wrap p-2">
              {/* court name */}
              <div className="col-lg-6 col-12 px-0 px-md-3">
                <Input
                  type="text"
                  onChange={(e) =>
                    setCourtModel({ ...courtModel, name: e.target.value })
                  }
                  value={modalOnAddNew === false ? (courtModel?.name || "") : undefined}
                  className="form-control"
                  name="name"
                  label="Name"
                  placeholder="Type court name"
                />
              </div>

              {/* court type */}
              <div className="col-lg-6 col-12 px-0 px-md-3">
                <label htmlFor="type">Court type</label>
                <Select
                  className="multi__select"
                  name="type"
                  optionList={courtTypes}
                  selectedOptions={selectedCourtType}
                  onOptionsChanged={onTypeChanged}
                  placeholder="Select court type"
                  multi={false}
                ></Select>
              </div>

              {/* sport select box */}
              <div className="col-lg-6 col-12 px-0 px-md-3">
                <div className="form-group">
                  <label>Sport</label>
                  <Select
                    className="multi__select"
                    optionList={sports}
                    selectedOptions={selectedSportType}
                    onOptionsChanged={onSportChanged}
                    placeholder="Select sport"
                  ></Select>
                </div>
              </div>

              {/* features */}
              <div className="col-lg-6 col-12 px-0 px-md-3">
                <div className="form-group">
                  <label>Features</label>
                  <Select
                    className="multi__select"
                    optionList={features}
                    selectedOptions={
                      getSelectedOptions(courtModel.features, features)  
                      //&&
                      // ((modalOnAddNew===true && courtModel.features.length < 0) && getSelectedOptions(courtModel.features, features))
                      //getSelectedOptions(courtModel.features, features)
                    }
                    onOptionsChanged={(data) =>
                      setCourtModel({
                        ...courtModel,
                        features: data.map((x) => x.value),
                      })
                    }
                    placeholder="Select features"
                    multi={true}
                  ></Select>
                </div>
              </div>

              {/* fee */}
              <div className="col-lg-6 col-12 px-0 px-md-3">
                <Input
                  type="number"
                  min={0}
                  onChange={(e) =>
                    setCourtModel({ ...courtModel, fee: e.target.value })
                  }
                  value={modalOnAddNew === false ? (courtModel?.fee || "") : undefined}
                  className="form-control"
                  name="fee"
                  label="Fee"
                  placeholder="Fee"
                />
              </div>
            </div>
          </div>

          {/* action btns */}
          <div className="d-lg-flex d-md-flex d-sm-block d-block justify-content-end col-12 w-auto float-lg-right float-md-right float-sm-none float-none">
          <button 
                type={"button"} 
                id="view_court_btn01"
                className='my-lg-5 my-md-5 my-sm-2 my-3 align-items-center justify-content-center 
                           bg-white'
                style={{
                    background: 'rgba(255, 124, 83, 0.1)',  
                    border: '2px solid #D81C67', 
                    borderRadius: 16, 
                    //padding: '10px 30px',
                    //width: 140
                    width: '-webkit-fill-available'
                }}
                //onClick={() => router.push(`/facility/${facilityData.id}/courts`)}
                onClick={()=> {exitModal(); modalOnAddNew===true ? handleAddNewBtn() : null}}
            >
                <ButtonFrom
                    isDisabled={false}
                    className='align-items-center linkCourtBtn'
                    isCourtCard
                    btnStyle={{
                        color: '#D81C67', 
                        fontSize: 18, 
                        fontWeight: 600, 
                        textDecoration: 'none'
                    }}
                    label="Cancel"
                    notForSubmit={false}
                    doSubmit={exitModal}
                    btnTxtStyle={{textDecoration : 'none'}}
                />
            </button>
            <button 
                type={"button"} 
                id="view_court_btn02"
                className='d-flex border-0 ml-lg-3 ml-md-3 ml-sm-0 ml-0 my-lg-5 my-md-5 my-sm-2 my-3
                           align-items-center justify-content-center'
                style={{
                    background: '#EE2E2A',  
                    //border: '2px solid #D81C67', 
                    borderRadius: 16, 
                    //padding: '10px 60px',
                    //width: 140
                    width: '-webkit-fill-available'
                }}
                onClick={()=> {handleSave(); exitModal(); modalOnAddNew===true ? handleAddNewBtn() : null}}
            >
                <ButtonFrom
                    isDisabled={false}
                    className='align-items-center'
                    btnStyle={{
                        color: '#fff', 
                        fontSize: 18, 
                        fontWeight: 600, 
                        borderRadius: 16,  
                    }}
                    label={modalOnAddNew ? "Create" : "Save"}
                    btnTxtStyle={{color: '#fff', textDecoration : 'none'}}
                />
            </button>
            {/* <button
              className="btn btn-success btn-lg mr-4"
              
              type="button"
            >
              Save
            </button>
            <button
              className="btn btn-danger btn-lg"
              onClick={() => router.push(`/facility/${facilityData.id}/courts`)}
              type="button"
            >
              Cancel
            </button> */}
          </div>
        </Form>
      </div>
    // </DashboardLayout>
  );
};

export default CourtScreen;
