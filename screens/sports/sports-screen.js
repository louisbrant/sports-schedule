import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Pagination } from "antd";
import DashboardLayout from "../../components/layout/dashboard-layout.jsx";
import NotifyService from "../../shared/notify-service";
import SportsService from "./sports-service";
import SportsModel from "./sports-modal.js";
import AddSportModal from "./addSportModal.js";
import { getSports } from "../../store/sport/actions.js";
import EmptyComponent from "../../components/empty_component.jsx";

const SportsScreen = () => {
  const dispatch = useDispatch();

  // page number
  const [page, setPage] = useState(1);

  const [sportsModal, setSportsModal] = useState(new SportsModel());
  const [isAddSportModalShow, setAddModalStat] = useState(false);

  const { sports, totalResults } = useSelector((store) => ({
    sports: store.sport.sports,
    totalResults: store.sport.totalResults,
  }));

  useEffect(() => {
    // get all sport list
    getAllSports(page);
  }, []);

  // get sport list
  const getAllSports = async (page, limit = 10) => {
    dispatch(getSports(page, limit));
  };

  // handle delele
  const handleDelete = async (params) => {
    try {
      await SportsService.deleteById(params);
      NotifyService.success("Sport Delete Successfully!");
      getAllSports(page);
    } catch (error) {
      NotifyService.fail("Sport Not Deleted!");
    }
  };

  // handle edit
  const handleEdit = (params) => {
    setSportsModal(params);
    setAddModalStat(true);
  };

  // show add sport modal
  const handleShowAddSportModal = () => {
    setAddModalStat(true);
  };

  // hide add sport modal
  const handleCloseAddSportModal = () => {
    setAddModalStat(false);
  };

  /**
   * handle page change
   */
  const handlePageChange = (page) => {
    setPage(page);
    // get booking list
    dispatch(getAllSports(page));
  };

  return (
    <DashboardLayout pageTitle="Sports Managment">
      {/* header */}
      <div className="page-header d-lg-flex d-md-flex d-sm-block d-block justify-content-between">
        <h3 className="secondary" id="facility_mng_heading">Add/Update Sports</h3>
        <button
          className="btn btn-lg"
          onClick={handleShowAddSportModal}
          type="button"
          style={{background: '#243358', color: '#fff'}}
        >
          Add Sport
        </button>
      </div>

      {/* sport list */}
      <div className="form col-12">
        <div className="d-flex block-items flex-column update-feature-list">
          {sports?.length > 0
            ? sports.map((sport) => {
                return (
                  <Row key={sport.sports_id} className="update-feature-row">
                    <Col span={18} className="update-feature-name-col">
                      {sport.name}
                    </Col>
                    <Col span={6} className="update-feature-action-col">
                      <div className="feature-action-row">
                        <button
                          className="btn del-btn"
                          onClick={() => handleDelete(sport.sports_id)}
                          type="button"
                        >
                          Delete
                        </button>
                        <button
                          className="btn edit-btn"
                          onClick={() => handleEdit(sport)}
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
            <EmptyComponent title={'No Sports Found!'} />}
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

      {/* add sport modal */}
      <AddSportModal
        isModalShow={isAddSportModalShow}
        handleCloseModal={handleCloseAddSportModal}
        editData={sportsModal}
      />
    </DashboardLayout>
  );
};

export default SportsScreen;
