import HttpService from "../../shared/http-service";

const SportsService = {
  add: (obj) => {
    return HttpService.post("/sports", obj);
  },
  update: (obj) => {
    return HttpService.put(`/sports`, obj);
  },
  getAll: () => {
    return HttpService.get("/sports", false);
  },
  serverGet: (token) => {
    return HttpService.serverGet("/sports", token);
  },
  deleteById: (id) => {
    return HttpService.delete(`/sports/${id}`);
  },
};

export default SportsService;
