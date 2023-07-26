import HttpService from "./http-service";

const UplaodService = {
  uplaodImage: (obj) => {
    return HttpService.postForm("/uploader", obj);
  },
};

export default UplaodService;
