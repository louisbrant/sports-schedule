import HttpService from "../../shared/http-service";

const FeatureService = {
  add: (obj) => {
    return HttpService.post("/feature", obj);
  },
  update: (obj) => {
    return HttpService.put(`/feature`, obj);
  },
  getAll: () => {
    return HttpService.get("/feature", false);
  },
  serverGet: (token) => {
    return HttpService.serverGet("/feature", token);
  },
  deleteById: (id) => {
    return HttpService.delete(`/feature/${id}`);
  },
};

export default FeatureService;
