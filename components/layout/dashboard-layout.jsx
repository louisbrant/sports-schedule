import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthService from "../../shared/auth-service";
import Layout from "./layout";
import { ADMIN } from "../../helpers/roles";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import DashboardMenu from "../common/dashboard_menu";
// import Modal from 'react-modal';
import AddCourt from "../common/add_court";

const DashboardLayout = ({ pageTitle, children }) => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [activeItem, setActiveItem] = useState("");
  const [collapsedMenu, setcollapsedMenu] = useState(false);
  // const [modalVisible, setModalVisible] = useState(false);
  const [winWidth, setWinWidth] = useState('');

  useEffect(() => {
    checkUserData();
    //document.body.style.overflow="hidden";
    if (typeof window !== "undefined") {
      setWinWidth(window.innerWidth);
    }
    console.log(window.innerWidth);
  }, []);

  const checkUserData = () => {
    const data = AuthService.getUserData();
    const uData = JSON.parse(data);
    if (!uData || !uData.token) {
      return router.push("/");
    }
    setUserData(uData);
  };
  const toggleMenu = () => {
    setcollapsedMenu(!collapsedMenu);
  };

  // const handleModal =()=> {
  //   setModalVisible(true);
  // }

  // const closeModal =()=> {
  //   setModalVisible(false);
  // }

  // const customStyles = {
  //   content: {
  //     width: '80%',
  //     height: ((winWidth < 820 || winWidth==820) && '64%' || (winWidth < 1000 && winWidth > 820) && '48%' || winWidth > 1000 && '86%'),
  //     padding: 20,
  //     margin: 'auto',
  //     background: '#fff',
  //     border: 0,
  //     borderRadius: 16,
  //     boxShadow: '1px 2px 16px 4px rgba(26,26,26,0.1)',
  //   },
  // };

  return (
    userData && (
      <Layout footerInMng showHeaderInFacilityMng={false} pageTitle={pageTitle}>
        <main className="container-fluid layout__main">
          <div className="d-flex fullheight">
            <div
              className={`m-0 side-menu pt-0 ${collapsedMenu ? "open" : ""}`}
            >
              <Button
                type="danger"
                onClick={toggleMenu}
                className="sidemenu-btn"
              >
                {React.createElement(
                  collapsedMenu ? MenuUnfoldOutlined : MenuFoldOutlined
                )}
              </Button>

              {/* Original Dashboard Layout */}
              {/* dashboard */}
              {/* {userData.roleId === ADMIN && (
                <div className="menu-item-row">
                  <Link href="/dashboard">
                    <a
                      className={
                        router.pathname == ""
                          ? "side-menu-item active-menu-item"
                          : "side-menu-item"
                      }
                    >
                      <i className="fa fa-bar-chart pl-1"></i>Dashboard
                    </a>
                  </Link>
                </div>
              )} */}

              {/* facility management */}
              {/* {userData.roleId === ADMIN && (
                <div className="menu-item-row">
                  <Link href="/facility-management">
                    <a
                      className={
                        router.pathname.indexOf("facility") != -1
                          ? "side-menu-item active-menu-item"
                          : "side-menu-item"
                      }
                    >
                      <i className="fa fa-building pl-1"></i>Facility Management
                    </a>
                  </Link>
                </div>
              )} */}

              {/* booking management */}
              {/* {userData.roleId === ADMIN ? (
                <div className="menu-item-row">
                  <Link href="/booking-management">
                    <a
                      className={
                        router.pathname.indexOf("booking") != -1
                          ? "side-menu-item active-menu-item"
                          : "side-menu-item"
                      }
                    >
                      <i className="fa fa-clipboard pl-1"></i>Booking Management
                    </a>
                  </Link>
                  <div className="subchild">
                    {(activeItem === "booking" ||
                      router.pathname.indexOf("booking") > -1) && (
                      <ul>
                        <li>
                          {userData.roleId === ADMIN && (
                            <Link href="/booking-details">
                              <a
                                className={`booking-details-item ${
                                  router.pathname.indexOf("booking-details") >
                                  -1
                                    ? "subitem-active"
                                    : ""
                                }`}
                              >
                                <i className="fa fa-bookmark pl-1"></i>Booking
                                Details
                              </a>
                            </Link>
                          )}
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              ) : (
                <div className="menu-item-row">
                  <Link href="/booking-details">
                    <a
                      className={router.pathname.indexOf("booking") != -1
                          ? "side-menu-item active-menu-item"
                          : "side-menu-item"}
                    >
                      <i className="fa fa-bookmark pl-1"></i>Booking Details
                    </a>
                  </Link>
                </div>
              )} */}

              {/* feature management */}
              {/* {userData.roleId === ADMIN && (
                <div className="menu-item-row">
                  <Link href="/feature">
                    <a
                      className={
                        router.pathname.indexOf("feature") != -1
                          ? "side-menu-item active-menu-item"
                          : "side-menu-item"
                      }
                    >
                      <i className="fa fa-sitemap pl-1"></i>Feature Management
                    </a>
                  </Link>
                </div>
              )} */}

              {/* sport management */}
              {/* {userData.roleId === ADMIN && (
                <div className="menu-item-row">
                  <Link href="/sports">
                    <a
                      className={
                        router.pathname.indexOf("sport") != -1
                          ? "side-menu-item active-menu-item"
                          : "side-menu-item"
                      }
                    >
                      <i className="fa fa-table pl-1"></i>Sports Management
                    </a>
                  </Link>
                </div>
              )} */}

              {/* New Dashboard Layout Section */}
              <div className='dashboard_menu p-4'
                style={{
                  //background: 'rgba(152, 181, 255, 0.06)'
                  background: 'rgba(229, 236, 255)'
                }}
              >
                <img
                  src={'/assets/logo.png'}
                  style={{ width: '94%', height: '100%', overflow: 'hidden', transform: 'scale(0.8)', cursor: 'pointer' }}
                  onClick={() => router.push('/')}
                />
                <div className='menu_list pt-5 pl-4'>
                  <DashboardMenu
                    //showModal={handleModal} modalVisible={modalVisible}
                    admin={ADMIN} router={router} userData={userData} setUserData={setUserData}
                  />
                </div>
              </div>
            </div>

            {/* children */}
            <div className="main__content">{children}</div>
          </div>
          {/* <Modal isOpen={modalVisible} onRequestClose={closeModal} style={customStyles} preventScroll={true} ariaHideApp={false}>
            <AddCourt exitModal={closeModal}/>
          </Modal> */}
        </main>
      </Layout>
    )
  );
};

export default DashboardLayout;
