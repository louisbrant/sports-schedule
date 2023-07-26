import config from "../config/config.json";
import TimeService from "./time-service";

const ConfigService = {
  getConfig: () => {
    return config;
  },
  getBaseUrl: () => {
    return config[config.ENV_MODE]["API_URL"];
  },
  getImagePreviewUrl: () => {
    return ConfigService.getBaseUrl() + "/file";
  },
  getDefaultDateList: () => {
    const today = new Date();
    let list = [];
    list.push(today);
    for (let i = 1; i <= 30; i++) {
      const newDate = TimeService.addDaysToADate(today, i);
      list.push(newDate);
    }
    return list;
  },
  getDefaultTimeList: () => {
    return [
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
    ];
  },
};

export default ConfigService;
