import { useEffect } from "react";
import withRouter from "next/dist/client/with-router";
import AuthService from "../../shared/auth-service";

function GuestGuard({ children }) {
  useEffect(function () {
    // check if user logined prevent him from access this page.
    if (AuthService.isAthenticated()) {
      props.router.replace("/");
    }
  }, []);

  return <>{children}</>;
}

export default withRouter(GuestGuard);
