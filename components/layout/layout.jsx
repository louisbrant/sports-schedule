import Head from "next/head";
import NavBar from "./navbar";
import Footer from "./footer";
import SideMenu from "./side-menu";
const Layout = ({
  pageTitle,
  showHeaderAndFooter = true,
  showHeaderInFacilityMng,
  isHome = false,
  footerAtHome,
  footerInMng,
  lineColor,
  children,
  className
}) => (
  <>
    <Head>
      <title>{`${pageTitle}`}</title>
    </Head>
    <div className="container-fluid">
      {(showHeaderAndFooter && showHeaderInFacilityMng===undefined) && <NavBar lineColor={lineColor} isHome={isHome} />}
      <div className={className} style={{ position: "relative", paddingTop: "0", zIndex: "1" }}>
        {children}
      </div>
      {showHeaderAndFooter && <Footer isHome={isHome} footerAtHome={footerAtHome} footerInMng={footerInMng}/>}
    </div>
    <SideMenu />
  </>
);

export default Layout;
