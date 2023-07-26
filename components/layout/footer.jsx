import Link from "next/link";
import { ADMIN } from '../../helpers/roles'

const Footer = ({ footerAtHome, footerInMng }) => {
    return (
      <main style={footerAtHome ? {background: '#fff'}: {background: '#F9FBFF', position: 'relative', zIndex: 0}}>
        <footer className="container-fluid inside-footer" style={footerAtHome ? {background: '#fff'} : {background: '#F9FBFF'}}>
          <div className={(footerAtHome || footerAtHome!==undefined) ? 
                          "container d-flex flex-column footer-top-container"
                          :
                          "d-none"
                         } 
          >
            <div className="col-12 d-flex flex-lg-row flex-column pt-141 mb-4 pl-5">
              <div className="col-lg-5 col-12 d-flex flex-column">
                <Link href="/">
                  <img className="logo-bg" src="/assets/logo.png" />
                </Link>
                <div className="my-4 ml-3" style={{ fontSize: 16, fontWeight: 500, color: 'rgba(36, 51, 88, 0.7)' }}>
                  Realize your potential
                </div>
                <div className="row social">
                  <a href="https://www.facebook.com/" target="_blank" style={{color: '#EE2E2A'}}>
                    <img
                      src="/assets/fb_icon.png"
                      className="icon ml-lg-3 ml-md-2"
                      alt="Facebook"
                    />
                  </a>
                  <a href="https://www.instagram.com/" target="_blank" style={{color: '#EE2E2A'}}>
                    <img
                      src="/assets/insta_social_icon.png"
                      width='120%'
                      height='100%'
                      className="icon ml-3"
                      alt="Instagram"
                    />
                  </a>
                  <a href="https://twitter.com/" target="_blank">
                    <img
                      src="/assets/tweet_icon.png"
                      className="icon ml-3"
                      alt="Twitter"
                    />
                  </a>
                  <a href="https://www.linkedin.com/" target="_blank">
                    <img
                      src="/assets/linked_icon.png"
                      className="icon ml-3"
                      alt="LinkedIn"
                    />
                  </a>
                </div>
              </div>

              {/* Helping Links */}
              <div className="col-lg-2 col-12 d-flex flex-column align-items-lg-start align-items-center mt-lg-4 mt-md-5 mt-sm-5 mt-5 order-3 col-offset-lg-2">
                <h4 className="secondary" style={{fontSize: 24, fontWeight: 600}}>Links</h4>
                <Link href="/">
                  <a>
                    <div className="footer-items secondary-light py-3" style={{fontSize: 16, fontWeight: 500}}>Home</div>
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <div className="footer-items secondary-light py-3" style={{fontSize: 16, fontWeight: 500}}>Support</div>
                  </a>
                </Link>
                <Link href={ADMIN ? "/booking-management" : "/login"}>
                  <a>
                    <div className="footer-items secondary-light py-3" style={{fontSize: 16, fontWeight: 500}}>Booking</div>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <div className="footer-items secondary-light py-3" style={{fontSize: 16, fontWeight: 500}}>Login</div>
                  </a>
                </Link>
              </div>
              {/* Our Locations */}
              <div className="col-lg-2 col-12 d-flex flex-column align-items-lg-start align-items-center  mt-4 order-3 col-offset-lg-2">
                <h4 className="secondary" style={{fontSize: 24, fontWeight: 600}}>Locations</h4>
                <Link href="/">
                  <a>
                    <div className="footer-items secondary-light py-3" style={{fontSize: 16, fontWeight: 500}}>Location 1</div>
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <div className="footer-items secondary-light py-3" style={{fontSize: 16, fontWeight: 500}}>Location 2</div>
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <div className="footer-items secondary-light py-3" style={{fontSize: 16, fontWeight: 500}}>Location 3</div>
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <div className="footer-items secondary-light py-3" style={{fontSize: 16, fontWeight: 500}}>Location 4</div>
                  </a>
                </Link>
              </div>

              <div className="col-lg-3 col-12 d-flex flex-column align-items-lg-start align-items-center  mt-4 order-3 col-offset-lg-2">
                <h4 className="secondary" style={{fontSize: 24, fontWeight: 600}}>Contact</h4>
                <div className="footer-items  secondary-light py-3" style={{fontSize: 16, fontWeight: 500}}>
                  70 Pitt Street, Sydney 2000
                </div>
                <div className="footer-items secondary-light" style={{fontSize: 16, fontWeight: 500}}>Phone: 0420 573 123</div>
                <div className="footer-items secondary-light py-3" style={{fontSize: 16, fontWeight: 500}}>
                  E-Mail: info@webroo.com.au
                </div>
              </div>
            </div>
          </div>
          <div 
            className="col-12 d-lg-flex d-md-block d-sm-block d-block flex-lg-row flex-md-column flex-sm-column 
            flex-column justify-content-center align-items-center container-fluid px-5" 
            style={((footerAtHome && footerAtHome!==undefined) ? {background: '#fff'} : {background: '#F9FBFF'}) && (footerInMng && {background: 'rgb(248 248 252)'})}
          >  
            <div 
              className="copyrights border border-bottom-0 border-right-0 border-left-0 pt-3 pb-3 m-auto pl-4 
              d-lg-flex d-md-flex d-sm-flex d-block justify-content-between"
              style={{background: 'transparent', width: '92%'}
                //footerAtHome ? {background: '#fff', width: '90%'} : {background: '#F9FBFF', width: '90%'}
              }
            > 
              <div>
                <ul className="d-flex p-0">
                  <li className="secondary-light terms_link pr-lg-5 pr-md-5 pr-sm-4 pr-4" 
                      style={{fontSize: 14, fontWeight: 500}}
                  >Terms of Use</li>
                  <li className="secondary-light privacy_link" 
                      style={{fontSize: 14, fontWeight: 500}}
                  >Privacy Policy</li>
                </ul>
              </div>
              <h6 className="secondary float-lg-right text-center" 
                  style={{fontSize: 16, fontWeight: 600}}
              >© Webroo. All Rights Reserved.</h6>
            </div>
          </div>

        </footer>
      </main>
    );
};

export default Footer;
