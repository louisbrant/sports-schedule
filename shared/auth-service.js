import Cookies from "js-cookie";
const userData = "userData";

let storageData;
let sessionData;

const AuthService = {
  setUserDataToLocalStorage(data) {
    Cookies.set(userData, data);
  },
  removeUserDataFromLocalStorage() {
    Cookies.remove(userData);
  },
  setUserDataToSessionStorage(data) {
    Cookies.set(userData, data);
  },
  removeUserDataFromSessionStorage() {
    Cookies.remove(userData);
  },
  getUserData() {
    getStorageData();
    const data = storageData ? storageData : sessionData;
    if (!data) return;

    return data;
  },
  isAthenticated() {
    getStorageData();
    return storageData || (sessionData && sessionData.length);
  },
  removeUserData() {
    getStorageData();
    Cookies.remove(userData);
    Cookies.remove(userData);
    return true;
  },
  getToken() {
    const uData = JSON.parse(Cookies.get(userData));
    return `bearer ${uData.token}`;
  },
};

const getStorageData = () => {
  storageData = Cookies.get(userData);
  sessionData = Cookies.get(userData);
};

export default AuthService;
