import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthService from "../../shared/auth-service";
import LoginService from "../../screens/login/login-service";
import { ADMIN } from "../../helpers/roles";

const NavBar = ({ isHome = false }) => {
  const router = useRouter();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const data = AuthService.getUserData();
    if (!data) return;
    const uData = JSON.parse(data);
    setUserData(uData);
  }, []);

  const handleLogout = () => {
    const isLoggedOut = LoginService.logout();
    if (isLoggedOut) {
      setUserData({});
      router.push("/");
    }
  };

  const showSideMenu = () => {
    const sideMenuContainer = document.getElementById("sidemenu-container");
    sideMenuContainer.style.display = "block";
  };

  const containerType = isHome ? "container" : "container-fluid";

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setSticky(window.pageYOffset > 80)
      );
    }
  }, []);

  return (
    <>
      <header
        style={
          !isHome
            ? { backgroundColor: "#fff", borderBottom: "1px solid #e6ebf1" }
            : {paddingBottom: 72}
        }
        className={
          (!isHome ? "inside-header" : "", `${sticky ? "sticky" : ""}`)
        }
      >
        <div
          className={`${containerType} d-lg-block d-md-none d-sm-none d-none`}
        >
          <div className="nav-head d-flex bd-highlight align-items-center">
            <div className="header__logo mr-60">
              <Link href="/">
                <img src="/assets/logo.png" />
              </Link>
            </div>
            <div className="d-flex">
              <div className="mr-20">
                <Link href="/" passHref>
                  <a className="nav-link text-dark font-bold" href="/">
                    Home
                  </a>
                </Link>
              </div>
              <div className="mr-20 ml-20">
                <Link href="/" passHref>
                  <a className="nav-link text-secondary font-medium" href="/">
                    Features
                  </a>
                </Link>
              </div>
              <div className="mr-20 ml-20">
                <Link href="/" passHref>
                  <a className="nav-link text-secondary font-medium" href="/">
                    Support
                  </a>
                </Link>
              </div>
            </div>
            {userData?.token && (
              <div className="dropdown round-border d-flex bd-highlight ml-auto align-items-center header__right__col"
                   style={{cursor: 'pointer'}}
              >
                {/* user profile image */}
                
                <span className="mr-2">{userData.email}</span>

                <div className="avatar-img mr-2"></div>

                {/* dropdown */}
                {/* <div className="dropdown round-border bg-babyblue mr-4"> */}
                  <a
                    className="dropdown-toggle black"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    <i className="fa fa-angle-down m-2 blue"></i>
                  </a>

                  <div
                    className="dropdown-menu dropdownOnHover dropdown-menu-right"
                    aria-labelledby="dropdownMenuLink"
                  >
                    {/* dashboard */}
                    {userData.roleId === ADMIN && (
                      <div className="dropdown-item">
                        <Link href="/dashboard">
                          <a>Dashboard</a>
                        </Link>
                      </div>
                    )}

                    {/* facility management */}
                    {userData.roleId === ADMIN && (
                      <div className="dropdown-item">
                        <Link href="/facility-management">
                          <a>Facility Management</a>
                        </Link>
                      </div>
                    )}

                    {/* booking management */}
                    {userData.roleId === ADMIN && (
                      <div className="dropdown-item">
                        <Link href="/booking-management">
                          <a>Booking Management</a>
                        </Link>
                      </div>
                    )}

                    {/* booking details */}
                    <div className="dropdown-item">
                      <Link href="/booking-details">
                        <a>Booking Details</a>
                      </Link>
                    </div>

                    {/* feature management */}
                    {userData.roleId === ADMIN && (
                      <div className="dropdown-item">
                        <Link href="/feature">
                          <a>Feature Management</a>
                        </Link>
                      </div>
                    )}

                    {/* sport management */}
                    {userData.roleId === ADMIN && (
                      <div className="dropdown-item">
                        <Link href="/sports">
                          <a>Sports Management</a>
                        </Link>
                      </div>
                    )}

                    {/* logout */}
                    <div
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      {/* <i className="fa fa-sign-out mr-2"></i> */}
                      <a>Logout</a>
                    </div>
                  </div>
                {/* </div> */}
              </div>
            )}
            {!userData?.token && (
              <>
                <Link href="/login">
                  <a className="login-btn ml-auto bd-highlight px-4 rounded-pill py-1 mr-20">
                    Login
                  </a>
                </Link>
                <Link href="/register">
                  <a className="login-btn signup-btn ml-3 bd-highlight px-4 rounded-pill py-1 font-semibold">
                    Create Account
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="header__mobile">
          <nav className="navbar navbar-expand-lg d-lg-none">
            <div className="nav-head d-flex bd-highlight align-items-center">
              <div className="menu-btn mr-1">
                <a onClick={showSideMenu} className="d-lg-none grid-icon">
                  &equiv;
                </a>
              </div>
              {userData?.token && (
                <div className="d-flex bd-highlight ml-auto align-items-center header__right__col">
                  {/* user profile image */}
                  <div className="avatar-img mr-2"></div>

                  {/* dropdown */}
                  <div className="dropdown round-border bg-babyblue mr-4">
                    <a
                      className="dropdown-toggle black"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      <i className="fa fa-angle-down m-2 blue"></i>
                    </a>

                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="dropdownMenuLink"
                    >
                      {/* dashboard */}
                      {userData.roleId === ADMIN && (
                        <div className="dropdown-item">
                          <Link href="/dashboard">
                            <a>Dashboard</a>
                          </Link>
                        </div>
                      )}

                      {/* facility management */}
                      {userData.roleId === ADMIN && (
                        <div className="dropdown-item">
                          <Link href="/facility-management">
                            <a>Facility Management</a>
                          </Link>
                        </div>
                      )}

                      {/* booking management */}
                      <div className="dropdown-item">
                        <Link href="/booking-management">
                          <a>Booking Management</a>
                        </Link>
                      </div>

                      {/* booking details */}
                      <div className="dropdown-item">
                        <Link href="/booking-details">
                          <a>Booking Details</a>
                        </Link>
                      </div>

                      {/* feature management */}
                      {userData.roleId === ADMIN && (
                        <div className="dropdown-item">
                          <Link href="/feature">
                            <a>Feature Management</a>
                          </Link>
                        </div>
                      )}

                      {/* sport management */}
                      {userData.roleId === ADMIN && (
                        <div className="dropdown-item">
                          <Link href="/sports">
                            <a>Sports Management</a>
                          </Link>
                        </div>
                      )}

                      {/* logout */}
                      <div
                        className="dropdown-item logout"
                        onClick={handleLogout}
                      >
                        {/* <i className="fa fa-sign-out mr-2"></i> */}
                        <a>Logout</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {!userData?.token && (
                <>
                  <Link href="/login">
                    <a className="login-btn ml-auto bd-highlight rounded-pill">Login</a>
                  </Link>
                  <Link href="/register">
                    <a className="login-btn ml-1 bd-highlight rounded-pill">Sign Up</a>
                  </Link>
                </>
              )}
            </div>
            <Link href="/">
              <img className="header__logo" src="/assets/logo.png" />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavBar;
