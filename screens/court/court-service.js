import HttpService from "../../shared/http-service";

const CourtService = {
  add: (obj) => {
    return HttpService.post("courts", obj);
  },
  update: (obj) => {
    return HttpService.put(`courts/${obj.id}`, obj);
  },
  getById: (id, token) => {
    return HttpService.serverGet(`/courts/${id}`, token);
  },
  serverGetByFacilityId: (id, token) => {
    return HttpService.serverGet(`/courts/facility/${id}`, token);
  },
  getByFacilityId: (id) => {
    return HttpService.get(`/courts/facility/${id}`);
  },
  serverGetById: (id, token) => {
    return HttpService.serverGet(`/courts/${id}`, token);
  },
};

export default CourtService;
