import axios from "axios";
import AuthService from "./auth-service";
import ConfigService from "./config-service";

const apiUrl = ConfigService.getBaseUrl();

// // Add a request interceptor
// axios.interceptors.request.use(
//   function (config) {
//     const loginedUser = AuthService.getUserData();
//     if (loginedUser && loginedUser.token) {
//       config.headers.authorization = `Bearer ${loginedUser.token}`;
//     }
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axios.interceptors.response.use(
//   function (response) {
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // Do something with response error
//     const exceptionToThrow = {};
//     if (error.response) {
//       // error has response.
//       exceptionToThrow.message = error.response.data.message;
//       exceptionToThrow.statusCode = error.response.data.statusCode;
//       exceptionToThrow.serverCode = error.response.status;
//     } else {
//       // error not has response , error in server or timeout.
//       exceptionToThrow.message = "Error in server , try again later";
//       exceptionToThrow.statusCode = "";
//       exceptionToThrow.serverCode = 500;
//     }

//     return Promise.reject(exceptionToThrow);
//   }
// );

const HttpService = {
  post: (serviceUrl, data, withToken = true) => {
    return axios.post(`${apiUrl}/${serviceUrl}`, data, {
      headers: _getHeaders(withToken),
    });
  },
  postForm: (serviceUrl, data) => {
    return axios.post(`${apiUrl}/${serviceUrl}`, data, {
      headers: {
        Authorization: AuthService.getToken(),
      },
    });
  },
  put: (serviceUrl, data, withToken = true) => {
    return axios.put(`${apiUrl}/${serviceUrl}`, data, {
      headers: _getHeaders(withToken),
    });
  },
  delete: (serviceUrl, data, withToken = true) => {
    return axios.delete(`${apiUrl}/${serviceUrl}`, data, {
      headers: _getHeaders(withToken),
    });
  },
  get: (serviceUrl, withToken = true) => {
    return axios.get(`${apiUrl}/${serviceUrl}`, {
      headers: _getHeaders(withToken),
    });
  },
  serverGet: (serviceUrl, token = null) => {
    return axios.get(`${apiUrl}/${serviceUrl}`, {
      headers: token
        ? {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          }
        : {
            "Content-Type": "application/json",
          },
    });
  },

  // get request - with params
  serverGetReq: (serviceUrl, payload, token = null) => {
    return axios.get(
      `${apiUrl}/${serviceUrl}`,
      {
        params: payload,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
  },
};

const _getHeaders = (withToken) => {
  return withToken
    ? {
        "Content-Type": "application/json",
        Authorization: AuthService.getToken(),
      }
    : {
        "Content-Type": "application/json",
      };
};

export default HttpService;
