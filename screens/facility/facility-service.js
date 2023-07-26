import HttpService from "../../shared/http-service";

const FailityService = {
  add: (obj) => {
    return HttpService.post("/facilities", obj);
  },
  update: (obj) => {
    return HttpService.put(`facilities/${obj.id}`, obj);
  },
  get: () => {
    return HttpService.get("/facilities");
  },
  getAll: () => {
    return HttpService.get("/facilities/all", false);
  },
  getById: (id) => {
    return HttpService.get(`/facilities/${id}`);
  },
  getByPublicName: (facilityName) => {
    return HttpService.get(`/facilities/name/${facilityName}`, false);
  },
  serverGet: (token) => {
    return HttpService.serverGet("/facilities", token);
  },
  serverGetById: (id, token) => {
    return HttpService.serverGet(`/facilities/${id}`, token);
  },
};

export default FailityService;
