import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthService from "../../shared/auth-service";
import LoginService from "../../screens/login/login-service";

const SideMenu = () => {
  const [userData, setUserData] = useState({});
  const router = useRouter();
  useEffect(() => {
    const data = AuthService.getUserData();
    if (data) setUserData(JSON.parse(data));
  }, []);

  const handleLogout = () => {
    const isLoggedOut = LoginService.logout();
    if (isLoggedOut) {
      setUserData({});
      router.push("/");
    }
  };

  const hideSideMenu = () => {
    const sidemenuContainer = document.getElementById("sidemenu-container");
    sidemenuContainer.style.display = "none";
  };

  return (
    <div className="sidemenu-box-container" id="sidemenu-container">
      <div className="container-fluid sidemenu-box-bg">
        <div className="d-flex flex-column">
          <div className="container mb-4">
            <nav className="navbar navbar-expand-lg mt-4">
              <a onClick={hideSideMenu} className="d-lg-none x-icon">
                <i className="fa fa-times"></i>
              </a>
              <Link href="/">
                <img className="sidemenu__logo" src="/assets/logo.png" />
              </Link>
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarSupportedContent"
              ></div>
              <a></a>
            </nav>
            <div className="side-menu-list d-flex flex-column justify-content-center align-content-center">
              <Link href="/">
                <a className="nav-link m-2 text-uppercase">Home</a>
              </Link>
              <Link href="/">
                <a className="nav-link m-2 text-uppercase">Features</a>
              </Link>
              <Link href="/">
                <a className="nav-link m-2 text-uppercase">Support</a>
              </Link>
              <div className="mt-4">
                <img
                  src="/assets/icon-phone.png"
                  className="icon mr-2"
                  alt="phone"
                />
                <span className="white m-2">0420 573 123</span>
              </div>
              <div className="mt-2">
                <img
                  src="/assets/icon-email.png"
                  className="icon m-2"
                  alt="email"
                />
                <span className="white mb-4"> info@webroo.com.au</span>
              </div>
              <hr className="m-4" />
              {userData?.token && (
                <>
                  <div className="mt-2">
                    <span className="white mb-4">
                      <i className="fa fa-user m-2"></i>
                      {userData?.email}
                    </span>
                  </div>

                  <a
                    onClick={handleLogout}
                    className="login-btn white m-3 black"
                  >
                    LOGOUT
                  </a>
                </>
              )}
              {!userData?.token && (
                <Link href="/login">
                  <a className="login-btn px-4 rounded-pill m-3">Login</a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={hideSideMenu}
        className="container-fluid search-box-container-bg"
      ></div>
    </div>
  );
};

export default SideMenu;
