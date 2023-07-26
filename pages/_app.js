import Router from "next/router";
import NProgress from "nprogress";
import { ToastContainer } from "react-toastify";
import { wrapper } from "../store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-upload-gallery/dist/style.css";
import "react-image-lightbox/style.css";
import "react-datepicker/dist/react-datepicker.css";
import "antd/dist/antd.css";
import "react-day-picker/lib/style.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer></ToastContainer>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
