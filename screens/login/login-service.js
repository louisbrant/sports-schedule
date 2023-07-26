import AuthService from "../../shared/auth-service";
import HttpService from "../../shared/http-service";
import SessionService from "../../network/sesssion-service";

const LoginService = {
  login(data) {
    return HttpService.post("users/login", data, false);
  },

  // forgot password
  forgotPassword(data) {
    return HttpService.post("users/forget_password", data, false);
  },

  // get logged user permission
  getUserPermission() {
    return HttpService.get("/role-permissions");
  },

  logout() {
    return AuthService.removeUserData();
  },
};

export default LoginService;
