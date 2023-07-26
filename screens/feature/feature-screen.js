import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Pagination } from "antd";

import DashboardLayout from "../../components/layout/dashboard-layout.jsx";
import NotifyService from "../../shared/notify-service";
import FeatureService from "./feature-service";
import FeatureModel from "./feature-modal.js";
import AddFeaterModal from "./addFeaterModal.js";
import { getFeatures } from "../../store/feature/actions";
import EmptyComponent from "../../components/empty_component.jsx";

const FeatureScreen = () => {
  const dispatch = useDispatch();

  // page number
  const [page, setPage] = useState(1);

  const [featureModal, setFeatureModal] = useState(new FeatureModel());
  const [isAddFeatureModalShow, setAddModalStat] = useState(false);

  const { features, totalResults } = useSelector((store) => ({
    features: store.feature.features,
    totalResults: store.feature.totalResults,
  }));

  useEffect(() => {
    // get all feature list
    getAllFeature(page);
  }, []);

  // get feature list
  const getAllFeature = async (page, limit = 10) => {
    dispatch(getFeatures(page, limit));
  };

  // handle delete
  const handleDelete = async (params) => {
    try {
      await FeatureService.deleteById(params);
      NotifyService.success("Feature Delete Successfully!");
      getAllFeature(page);
    } catch (error) {
      NotifyService.fail("Feature Not Deleted!");
    }
  };

  // handle edit
  const handleEdit = (params) => {
    setFeatureModal(params);
    setAddModalStat(true);
  };

  // show add feature modal
  const handleShowAddFeatureModal = () => {
    setAddModalStat(true);
  };

  // hide add feature modal
  const handleCloseAddFeatureModal = () => {
    setAddModalStat(false);
    setFeatureModal(new FeatureModel());
  };

  /**
   * handle page change
   */
  const handlePageChange = (page) => {
    setPage(page);
    // get booking list
    dispatch(getAllFeature(page));
  };

  return (
    <DashboardLayout pageTitle="Feature Managment">
      {/* header */}
      <div className="page-header d-lg-flex d-md-flex d-sm-block d-block justify-content-between">
        <h3 className="secondary" id="facility_mng_heading">Add/Update Feature</h3>
        <button
          className="btn btn-lg"
          onClick={handleShowAddFeatureModal}
          type="button"
          style={{background: '#243358', color: '#fff'}}
        >
          Add Feature
        </button>
      </div>

      {/* feature list */}
      <div className="form col-12">
        <div className="d-flex block-items flex-column update-feature-list">
          {features?.length > 0
            ? features.map((feature) => {
                return (
                  <Row key={feature.feature_id} className="update-feature-row">
                    <Col span={18} className="update-feature-name-col">
                      {feature.name}
                    </Col>
                    <Col span={6} className="update-feature-action-col">
                      <div className="feature-action-row">
                        <button
                          className="btn del-btn"
                          onClick={() => handleDelete(feature.feature_id)}
                          type="button"
                        >
                          Delete
                        </button>
                        <button
                          className="btn edit-btn"
                          onClick={() => handleEdit(feature)}
                          type="button"
                        >
                          Edit
                        </button>
                      </div>
                    </Col>
                  </Row>
                );
              })
            : 
            <EmptyComponent title={'No Features Found!'} />
            }
        </div>
      </div>

      {/* pagination */}
      {totalResults > 10 && (
        <Pagination
          current={page}
          size="small"
          onChange={handlePageChange}
          total={totalResults}
        />
      )}

      {/* add feature modal */}
      <AddFeaterModal
        isModalShow={isAddFeatureModalShow}
        handleCloseModal={handleCloseAddFeatureModal}
        editData={featureModal}
      />
    </DashboardLayout>
  );
};

export default FeatureScreen;
