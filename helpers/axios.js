import axios from "axios";
import Cookies from "js-cookie";
import ConfigService from "../shared/config-service";
const apiUrl = ConfigService.getBaseUrl();

const user = Cookies.get("userData");

export const axiosApi = axios.create({
  baseURL: apiUrl,
});

axiosApi.defaults.headers.common["Authorization"] = `Bearer ${
  user ? JSON.parse(user).token : null
}`;

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  return await axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}
