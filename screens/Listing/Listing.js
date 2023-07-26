import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// import { Row, Col, Pagination, Form, Select } from "antd";
import { Pagination } from "antd";
import Select from "../../components/common/select";

import Layout from "../../components/layout/layout";
import Listingcardcomp from "../../components/Listingcardcomp/Listingcardcomp";
import Googlemapcomp from "../../components/Googlemapcomp/Googlemapcomp";

import { getSports } from "../../store/sport/actions";
import { searchFacilities } from "../../store/facility/actions";
import { SearchModel } from "../../helpers/validationModels";
import MapSearchAddress from "../../components/map/map-address-search";
import Button from "../../components/common/button";
import ListingCard from "../../components/cards/ListingCard";
import EmptyComponent from "../../components/empty_component";

// const { Option } = Select;

// function SelectDownArrow() {
//   return (
//     <span
//       role="img"
//       aria-label="down"
//       className="anticon anticon-down ant-select-suffix"
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         stroke="currentcolor"
//         strokeWidth="5.333"
//         aria-hidden="true"
//         display="block"
//         overflow="visible"
//         viewBox="0 0 32 32"
//         style={{ height: 12, width: 12 }}
//       >
//         <path d="M28 12L16.707 23.293a1 1 0 01-1.414 0L4 12"></path>
//       </svg>
//     </span>
//   );
// }

const Listing = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { facilities, totalRecords, sports } = useSelector((state) => ({
    facilities: state.facility.facilities,
    totalRecords: state.facility.totalRecords,
    sports: state.sport.sports,
  }));

  // page
  const [page, setPage] = useState(1);
  // limit
  const [limit, setLimit] = useState(5);

  // search object
  const [searchObj, setsearchObj] = useState({});

  const [searchModal, setsearchModal] = useState(new SearchModel());

  const [searchData, setSearchData] = useState();

  const onOptionsChanged = (list) => {
    if (list) {
      const obj = { ...searchModal };
      obj.selectedSports = list.label;
      obj.sportId = list;
      setsearchModal(obj);
    }
  };

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      const { search } = router.query;
      console.log("SEARCH ======>", search)
      setSearchData(search)
      if (search) {
        const tempSearch = JSON.parse(search);
        const tempSearchObj = {
          ...searchObj,
          page,
          limit,
          sport: tempSearch?.sportId?.value || tempSearch?.sportId,
          // tempSearch?.sportId.value || tempSearch?.sportId,
          latlong: tempSearch?.location || null,
          date: tempSearch?.date || null,
          locationText: tempSearch?.locationText || null,
          time: `${tempSearch?.from}-${tempSearch?.to}` || null,
          // tempSearch.from ? `${tempSearch.from}-${tempSearch.to}` : null,
        };

        setsearchObj(tempSearchObj);

        // get search
        dispatch(searchFacilities(tempSearchObj));
      }
    }
  }, [router.query, page]);

  useEffect(() => {
    // get search
    dispatch(searchFacilities(searchObj));
  }, [searchObj]);

  useEffect(() => {
    dispatch(getSports()); // get sports
  }, []);

  useEffect(() => {
    console.log("ROUTER QUERY", searchObj);
  }, []);

  // handle select change
  const handleSelectChange = (val, name) => {
    setsearchObj({ ...searchObj, [name]: val });
    setPage(1);
  };

  const handleLocationChange = async (data) => {
    const obj = { ...searchModal };
    const latLng = await getLatLng(data);
    obj["locationText"] = data.formatted_address;
    obj["location"] = `${latLng.lat}-${latLng.lng}`;
    setsearchModal(obj);
  };

  return (
    <Layout
      className="ListingPageWrapper"
      pageTitle="Listing"
      footerAtHome={false}
      isHome={true}
    >
      <div className="ListingStyles">
        <div className="ListingRow container">
          <div className="ListingDetailsCol">
            {/* search filters */}
            <div className="Listing__title">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="secondary mb-0 mt-md-3">Facilities (3)</h3>
                <div className="mob-filter">
                  <Button label={"Filters"} primary={false} />
                </div>
              </div>
              {/* <div className="red-line"></div> */}
              <div className="filters d-flex w-100 mt-4">
                {/* <Form>
                  <Row gutter={[30, 0]}>
                    <Col xs={24} sm={8} md={8} span={8}>
                      <div className="form-group">
                        <label>Sport</label>
                        <Select
                          suffixIcon={<SelectDownArrow />}
                          dropdownClassName="filterDropdown"
                          value={searchObj.sport}
                          onChange={(val) => handleSelectChange(val, "sport")}
                          placeholder="Select Sport"
                        >
                          {sports.map((x) => {
                            return (
                              <Option key={x.name} value={x.sports_id}>
                                {x.name}
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                    </Col>
                    <Col xs={24} sm={8} md={8} span={8}>
                      <div className="form-group">
                        <label>Court Type</label>
                        <Select
                          suffixIcon={<SelectDownArrow />}
                          dropdownClassName="filterDropdown"
                          defaultValue={searchObj.type}
                          onChange={(val) => handleSelectChange(val, "type")}
                          placeholder="Select Court"
                        >
                          <Option value={null}>All</Option>
                          <Option value="in">In-Door</Option>
                          <Option value="out">Out-Door</Option>
                        </Select>
                      </div>
                    </Col>
                    <Col xs={24} sm={8} md={8} span={8}>
                      <div className="form-group">
                        <label>Facility Type</label>
                        <Select
                          suffixIcon={<SelectDownArrow />}
                          dropdownClassName="filterDropdown"
                          defaultValue={searchObj.facilityType}
                          onChange={(val) =>
                            handleSelectChange(val, "facilityType")
                          }
                          placeholder="Select Facility"
                        >
                          <Option value={null}>All</Option>
                          <Option value="public">Public</Option>
                          <Option value="private">Private</Option>
                        </Select>
                      </div>
                    </Col>
                  </Row>
                </Form> */}
                {/* <div className="slider__contant shadow -mt-5" style={{width: 'calc(100% - 80%)',}}>
                  <div className="d-flex align-items-center">
                    <img
                      src={"/assets/icons/category.svg"}
                      className="label-img"
                    />
                    <div className="w-100">
                      <p className="label grey mb-0">Location</p>
                      <MapSearchAddress getAddressLatLng={handleLocationChange}  />
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
                </div>
                <div className="slider__contant shadow -mt-5" style={{width: 'calc(100% - 80%)', marginLeft: -124}}>
                  <div className="d-flex align-items-center">
                    <img
                      src={"/assets/icons/category.svg"}
                      className="label-img"
                    />
                    <div className="w-100">
                      <p className="label grey mb-0">Type</p>
                      {console.log("SEARCH OBJ", facilities[0]?.sports[0])}
                      <Select
                        name="sport"
                        className={"search-select ipt listing-ipt"}
                        optionList={facilities[0]?.sports}
                        selectedOptions={facilities[0]?.sports[0]}
                        onOptionsChanged={onOptionsChanged}
                        placeholder="Select your sport"
                      ></Select>
                    </div>
                  </div>
                </div>
                <div className="slider__contant shadow -mt-5 mr-5 "style={{width: 'calc(100% - 80%)', marginLeft: -124}}>
                  <div className="d-flex align-items-center">
                    <img
                      src={"/assets/icons/category.svg"}
                      className="label-img"
                    />
                    <div className="w-100">
                      <p className="label grey mb-0">Price</p>
                      <Select
                        name="price"
                        className={"search-select ipt listing-ipt"}
                        optionList={['Highest to Lowest', 'Lowest to highest']}
                        selectedOptions={'Highest to Lowest'}
                        onOptionsChanged={onOptionsChanged}
                        placeholder="Select price"
                      ></Select>
                    </div>
                  </div>
                </div>
                <div className="slider__contant shadow -mt-5 ml-5" style={{width: 'calc(100% - 80%)'}}>
                  <div className="d-flex align-items-center">
                    <img
                      src={"/assets/icons/category.svg"}
                      className="label-img"
                    />
                    <div className="w-100">
                      <p className="label grey mb-0">Sort By</p>
                      <Select
                        name="sort"
                        className={"search-select ipt listing-ipt"}
                        optionList={['Availability']}
                        selectedOptions={searchModal.sportId}
                        onOptionsChanged={onOptionsChanged}
                        placeholder="Sort By"
                      ></Select>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="d-flex wrapper__listings">
              {/* search results */}
              <div className="Listingcard__block my-5">
                {facilities.length > 0 &&
                  facilities.map((d, index) => {
                    return (
                      <ListingCard
                        key={index}
                        list={d}
                        width={300}
                        height={200}
                        searchData={searchData}
                      />
                      // <Listingcardcomp
                      //   key={index}
                      //   id={d.id}
                      //   imgList={d.images.length ? d.images : []}
                      //   ListAddressText={d.address}
                      //   ListName={d.name}
                      //   Listratingcount="4.7"
                      //   ListPrice={
                      //     d.item.length > 0 ? `$ ${d.item[0].fee}` : "N/A"
                      //   }
                      // />
                    );
                  })}
                {/* <div className="d-flex my-5 mobile-listing">
                  <ListingCard width={300} height={200}/>
                  <ListingCard width={300} height={200}/>
                </div>
                <div className="d-flex my-5 mobile-listing">
                  <ListingCard width={300} height={200}/>
                  <ListingCard width={300} height={200}/>
                </div> */}

              </div>

              {/* pagination */}
              {facilities.length > 0 && facilities.length > limit && (
                <div className="Listing__Pagination">
                  <Pagination
                    current={page}
                    total={totalRecords}
                    onChange={(e) => {
                      setPage(e);
                    }}
                    defaultPageSize={limit}
                  />
                </div>
              )}

              {/* google map */}
              {facilities.length > 0 && (
                <div className="ListingMapCol">
                  <Googlemapcomp
                    locations={facilities}
                    handleSelectChange={handleSelectChange}
                  />
                </div>
              )}
            </div>
            {facilities.length === 0 && (
              <EmptyComponent title={"No Facility Found!"} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Listing;
