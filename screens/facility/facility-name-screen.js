import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Layout from "../../components/layout/layout";
import OpenHours from "../../components/open-hours";
import SideBooking from "../../components/side-booking";
import Googlemapcomp from "../../components/Googlemapcomp/Googlemapcomp";
import { getFacilityByName } from "../../store/facility/actions";

const FacilityNameScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { facility } = useSelector((state) => ({
    facility: state.facility.facility,
  }));

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      const { facilityName } = router.query;

      dispatch(getFacilityByName(facilityName));
    }
  }, [router.query]);

  return (
    <>
      <Layout pageTitle={facility.name} isHome={true}>
        <main className="container mt-4 pt-4">
          <div className="d-flex flex-row mt-4">
            <div className="col-8">
              <h2 className="black">{facility.name}</h2>
              <h4 className="gray">
                <i className="fa fa-map-marker mr-2"></i>
                {facility.address}
              </h4>

              <img
                className="w-100 mt-2"
                src={
                  facility.images && facility.images.length
                    ? facility.images[0]
                    : "/assets/field1.jpg"
                }
              />

              <div className="mt-4">
                <h4 className="mt-4">Overview</h4>
                <div dangerouslySetInnerHTML={{ __html: facility.overview }} />
              </div>
              <hr />
              <div className="mt-4">
                <h4 className="mt-4">Features</h4>
                <hr />
                <ul>
                  {facility.features?.map((ele, index) => (
                    <li key={index}>{ele}</li>
                  ))}
                </ul>
              </div>
              <hr />
              <div className="mt-4 mb-4">
                <h4 className="mt-4">Location</h4>
                <hr />
                <div className="locationMapWrapper">
                  <Googlemapcomp />
                </div>
              </div>
            </div>
            <div
              style={{ paddingTop: "70px" }}
              className="d-flex flex-column col-4"
            >
              <SideBooking></SideBooking>
              <OpenHours timeSetting={facility.timeSetting}></OpenHours>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default FacilityNameScreen;
