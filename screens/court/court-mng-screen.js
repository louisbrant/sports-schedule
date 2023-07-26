import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Pagination } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import WideCard from '../../components/common/wide_card'
import MobileWideCard from "../../components/common/wide_card_mobile";
import AddNewIcon from "../../components/common/svg_icons/add_icon";

import DashboardLayout from "../../components/layout/dashboard-layout.jsx";
import { getFacilityById } from "../../store/facility/actions.js";
import { deleteCourt, deleteCourtSuccess, getCourtsByFacility } from "../../store/court/actions.js";
import { useRouter } from "next/router";
import ReactModal from 'react-modal';
import CourtScreen from "./court-screen";
import EmptyComponent from "../../components/empty_component";

const CourtMng = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { confirm } = Modal;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalOnAddNewClick, setModalOnAddNewClick] = useState(false);
  const [winWidth, setWinWidth] = useState('');
  const [clickedCardId, setClickedCardId] = useState('');
  const [clickedIdx, setClickedIdx] = useState('');
  

  // page number
  const [page, setPage] = useState(1);

  const { facility, courts, totalResults } = useSelector((store) => ({
    facility: store.facility.facility,
    courts: store.court.courts,
    totalResults: store.court.totalResults,
  }));

  //console.log(facility)
  console.log("=======", courts)
  //const [recentCourts, setRecentCourts] = useState([]);

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      const { facilityId } = router.query;
      dispatch(getCourtsByFacility(facilityId, page, 10));
      dispatch(getFacilityById(facilityId));
    }
    if (typeof window !== "undefined") {
      setWinWidth(window.innerWidth);
    }
    console.log(window.innerWidth);
    //setRecentCourts(courts)

    return () => {};
  }, [router.query]);

  /**
   * delete court confirmation
   */
  const handleDeleteCourtConfirmation = (id) => {
    confirm({
      title: "Do you Want to delete this court?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDeleteCourt(id);
        
      },
    });
  };

  /**
   * handle delete court
   */
  const handleDeleteCourt = async(id) => {
    dispatch(deleteCourt(id, facility.id));
    // router.push(`/facility/${facility.id}/courts`);
    //dispatch(deleteCourtSuccess(facility.id));
    //let editedCourts = recentCourts.filter(court=> court.id !== id);
    //setRecentCourts(editedCourts);
  };

  /**
   * handle page change
   */
  const handlePageChange = (page) => {
    const { facilityId } = router.query;
    setPage(page);
    // get booking list
    dispatch(getCourtsByFacility(facilityId, page, 10));
  };

  const handleModal =()=> {
    setModalVisible(true);
  }

  const closeModal =()=> {
    setModalVisible(false);
  }

  const handleAddNew =()=> {
    setModalOnAddNewClick(!modalOnAddNewClick);
  }

  const customStyles = {
    content: {
      width: '80%',
      height: ((winWidth < 820 || winWidth==820) && '72%' || (winWidth < 1000 && winWidth > 820) && '48%' || winWidth > 1000 && 'fit-content'),
      padding: 16,
      margin: 'auto',
      background: '#fff',
      border: 0,
      borderRadius: 16,
      boxShadow: '1px 2px 16px 4px rgba(26,26,26,0.1)',
    },
  };

  return (
    <DashboardLayout pageTitle="Court Management">
      <div className="d-flex flex-column block-items">
        <div className="block-items-header d-flex align-items-center">
          <h3 className="secondary px-3" id="facility_mng_heading">Court Management 
            {/* {facility && <span>- {facility.name}</span>} */}
          </h3>
          {/* <div className="ml-auto">
            <Link
              href="/facility/[facilityId]/add-court"
              as={`/facility/${facility.id}/add-court`}
            >
              <a className="btn btn-dark ml-auto">
                {" "}
                <i className="fa fa-plus mr-2"></i> Add Court/Field
              </a>
            </Link>
          </div> */}
          {/* New Add Button */}
          <div className="ml-auto mr-2 align-items-center" onClick={()=> {handleModal(); handleAddNew()}}>
            <div>
              <a className="add_new_btn ml-auto d-lg-flex d-md-flex d-sm-block d-block align-items-center 
                            px-lg-4 px-md-3 px-sm-2 px-2 py-lg-3 py-md-2 py-sm-2 py-2" 
                 //style={{background: '#EE2E2A', borderRadius: 16, color: '#fff', fontSize: 16, fontWeight: 600}}
              >
                {" "}
                <AddNewIcon/>
                <p className='add_new_btnText pl-3 text-white'>Add New</p>
              </a>
            </div>
          </div>
        </div>
        {/* <div className="d-flex flex-column list-setting">
          {courts?.map((court, index) => (
            <div
              key={index}
              className="d-flex justify-content-between flex-sm-row flex-column col-12"
            >
              <div className="d-flex">
                <div className="image__block mr-3">
                  <img
                    className="facility-image"
                    src={
                      court.images && court.images.length && court.images[0]
                        ? court.images[0]
                        : "/assets/avatar-comp.png"
                    }
                  />
                </div>
                <div className="d-flex flex-column justify-content-center align-items-start">
                  <h4>{court.name}</h4>
                  <span className="facility__address">
                    {court.type ? "Indoor" : "Outdoor"}
                  </span>
                </div>
              </div>
              <div className="action__btns d-flex align-items-center">
                <Link
                  href="/facility/[facilityId]/court/[courtId]"
                  as={`/facility/${facility.id}/court/${court.id}`}
                >
                  <a className="btn btn-light no-wrap-btn mr-3">
                    {" "}
                    <i className="fa fa-edit"></i>Edit
                  </a>
                </Link> */}

                {/* delete court */}
                {/* <button
                  className="btn btn-danger no-wrap-btn"
                  onClick={() => handleDeleteCourtConfirmation(court.id)}
                >
                  <i className="fa fa-trash"></i>Delete
                </button>
              </div>
            </div>
          ))}
        </div> */}

        {/* pagination */}
        {totalResults > 10 && (
          <Pagination
            current={page}
            size="small"
            onChange={handlePageChange}
            total={totalResults}
          />
        )}

        {/* New Court Section */} 
        <div className="wide_card_container px-4 py-3 align-items-center" style={{marginLeft: 10}}>
          { courts?.length > 0 ? courts?.map((item, index)=> (
            <WideCard court={item} itemKey={index} isCourtCard openModal={handleModal} setClickedId={setClickedCardId} setClickedIndex={setClickedIdx} handleDeleteCourtConfirmation={handleDeleteCourtConfirmation}/>
          ))
          :
            <EmptyComponent title={'No Courts Found!'} />
          }
        </div>
        {/* New Facilities Mobile Section */}
        <div className="mobile_wide_card_container p-3 align-items-center">
          { courts?.length > 0 ? courts?.map((item, index)=> (
            <MobileWideCard court={item} itemKey={index} isCourtCard openModal={handleModal} setClickedId={setClickedCardId} setClickedIndex={setClickedIdx} handleDeleteCourtConfirmation={handleDeleteCourtConfirmation}/>
          ))
          :
            <EmptyComponent title={'No Courts Found!'} />
          }
        </div>
      </div>
      {console.log("COURTS", courts)}
      <ReactModal isOpen={modalVisible} onRequestClose={closeModal} style={customStyles} preventScroll={true} ariaHideApp={false}>
        <CourtScreen facilityData={facility} courtData={modalOnAddNewClick===false && courts[clickedIdx]} exitModal={closeModal} handleAddNewBtn={handleAddNew} modalOnAddNew={modalOnAddNewClick} isCourtCard/>
        {/* <EditCourt exitModal={closeModal} handleAddNewBtn={handleAddNew} modalOnAddNew={modalOnAddNewClick} courtData={courts} clickedCourt={clickedCardId} isCourtCard/> */}
      </ReactModal>
    </DashboardLayout>
  );
};

export default CourtMng;
