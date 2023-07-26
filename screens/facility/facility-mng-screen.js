import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Pagination } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import WideCard from "../../components/common/wide_card";
import MobileWideCard from "../../components/common/wide_card_mobile";

import DashboardLayout from "../../components/layout/dashboard-layout.jsx";

import {
  deleteFacility,
  getAddedFacilities,
} from "../../store/facility/actions.js";
import Input from "../../components/common/input";
import AddNewIcon from "../../components/common/svg_icons/add_icon";
import EmptyComponent from "../../components/empty_component";

const FacilityMng = () => {
  const dispatch = useDispatch();
  const { confirm } = Modal;

  // page number
  const [page, setPage] = useState(1);

  const { facilities, totalResults } = useSelector((store) => ({
    facilities: store.facility.facilities,
    totalResults: store.facility.totalRecords,
  }));

  useEffect(() => {
    dispatch(getAddedFacilities(page, 10));
  }, []);

  /**
   * delete facility confirmation
   */
  const handleDeleteFacilityConfirmation = (id) => {
    confirm({
      title: "Do you Want to delete these facility?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDeleteFacility(id);
      },
    });
  };

  /**
   * handle delete facility
   */
  const handleDeleteFacility = (id) => {
    dispatch(deleteFacility(id));
  };

  /**
   * handle page change
   */
  const handlePageChange = (page) => {
    setPage(page);
    // get booking list
    dispatch(getAddedFacilities(page, 10));
  };

  return (
    <DashboardLayout showHeaderinFacilityMng={false} pageTitle="Facility Management">
      <div className="d-flex flex-column block-items">
        <div className="block-items-header d-flex align-items-center">
          <h3 className="secondary" id="facility_mng_heading">Facilities Management ({`${facilities?.length}`})</h3>
            {/* Search Box */}
            {/* <div className="slider__contant" style={{width: 'calc(100% - 80%)', border: '1px solid rgba(36, 51, 88, 0.37)'}}>
              <div className="d-flex align-items-center">
                <div className="w-100">
                  <p className="label grey mb-0">Search Facility</p>
                  <Input searchByName={searchByNameStyles}/>
                </div>
                <div className="button-listings">
                  <a className={`btn-search web-search`}>
                    <i className="fa fa-search pr-2"></i>
                  </a>
                  <a className={`btn-search mobile-search`}>
                    <i className="fa fa-search pr-2"></i>
                  </a>
                </div>
              </div>
            </div> */}

          {/* <div className="ml-auto">
            <Link href="/facility">
              <a className="btn btn-dark ml-auto">
                {" "}
                <i className="fa fa-plus mr-2"></i> Add Facility
              </a>
            </Link>
          </div> */}

          {/* New Add Button */}
          <div className="ml-auto mr-n2 align-items-center">
            <Link href="/facility">
              <a className="add_new_btn ml-auto d-lg-flex d-md-flex d-sm-block d-block align-items-center 
                            px-lg-4 px-md-3 px-sm-2 px-2 py-lg-3 py-md-2 py-sm-2 py-2" 
                 //style={{background: '#EE2E2A', borderRadius: 16, color: '#fff', fontSize: 16, fontWeight: 600}}
              >
                {" "}
                <AddNewIcon />
                <p className="add_new_btnText pl-3 text-white">Add New</p>
              </a>
            </Link>
          </div>
        </div>

        {/* <div className="d-flex flex-column list-setting">
          {facilities?.map((facility, index) => (
            <div
              key={index}
              className="d-flex justify-content-between flex-sm-row flex-column col-12"
            >
              <div className="d-flex">
                <div className="image__block mr-3">
                  <img
                    className="facility-image"
                    src={
                      facility.logo ? facility.logo : "/assets/avatar-comp.png"
                    }
                  />
                </div>
                <div className="d-flex flex-column justify-content-center align-items-start">
                  <h4>{facility.name}</h4>
                  <span className="facility__address">{facility.address}</span>
                </div>
              </div>

              <div
                className="action__btns d-flex align-items-center"
                style={{ border: "none !important" }}
              > */}
        {/* facility courts */}
        {/* <Link
                  href="/facility/[facilityId]/courts"
                  as={`/facility/${facility.id}/courts`}
                >
                  <a className="btn btn-light mr-3 no-wrap-btn">
                    {" "}
                    <i className="fa fa-edit"></i> Courts
                  </a>
                </Link> */}

        {/* edit facility */}
        {/* <Link
                  href="/facility/[facilityId]"
                  as={`/facility/${facility.id}`}
                >
                  <a className="btn btn-danger mr-3 no-wrap-btn">
                    <i className="fa fa-edit"></i> Edit
                  </a>
                </Link> */}

        {/* delete facility */}
        {/* <button
                  className="btn btn-danger no-wrap-btn"
                  onClick={() => handleDeleteFacilityConfirmation(facility.id)}
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
      </div>

      {/* New Facilities Section */} 
      <div className="wide_card_container px-4 py-3 align-items-center" style={{marginLeft: 10}}>
          { facilities?.length > 0 ? facilities.map(item=> (
            <WideCard facility={item} itemKey={item.id} handleDeleteFacilityConfirmation={handleDeleteFacilityConfirmation}/>
          ))
          :
            <EmptyComponent title={'No Facility Found!'} />
          }
          
      </div>
      {/* New Facilities Mobile Section */}
      <div className="mobile_wide_card_container p-3 align-items-center">
          { facilities?.length > 0 ? facilities.map(item=> (
            <MobileWideCard facility={item} itemKey={item.id} handleDeleteFacilityConfirmation={handleDeleteFacilityConfirmation}/>
          ))
          :
            <EmptyComponent title={'No Facility Found!'} />
          }
      </div>

    </DashboardLayout>
  );
};

export default FacilityMng;

