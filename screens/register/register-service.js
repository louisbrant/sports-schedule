import HttpService from "../../shared/http-service";

const RegisterService = {
  register(data) {
    return HttpService.post("/users/register", data, false);
  },
};

export default RegisterService;
