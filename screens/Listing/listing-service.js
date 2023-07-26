import HttpService from "../../shared/http-service";

const listingService = {
  serverGet: (obj) => {
    return HttpService.serverGetReq(`/search`, {
      ...obj,
      time: `${obj.from}-${obj.to}`,
    }); //
  },
};

export default listingService;
