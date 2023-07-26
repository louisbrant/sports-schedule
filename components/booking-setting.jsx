import { useEffect, useState } from "react";
import Time from "./../components/common/time";
import moment from "moment";

const BookingSetting = ({ onBookingSettingChanged, defaultTimeSetting }) => {
  const [format] = useState("HH:mm");
  const defaultStartTime = "10:00";
  const defaultEndTime = "21:30";
  const [settingTimes, setSettingTimes] = useState(
    defaultTimeSetting.length
      ? defaultTimeSetting
      : [
          {
            day: "sat",
            times: [{ from: defaultStartTime, to: defaultEndTime }],
          },
          {
            day: "sun",
            times: [{ from: defaultStartTime, to: defaultEndTime }],
          },
          {
            day: "mon",
            times: [{ from: defaultStartTime, to: defaultEndTime }],
          },
          {
            day: "tue",
            times: [{ from: defaultStartTime, to: defaultEndTime }],
          },
          {
            day: "wed",
            times: [{ from: defaultStartTime, to: defaultEndTime }],
          },
          {
            day: "thu",
            times: [{ from: defaultStartTime, to: defaultEndTime }],
          },
          {
            day: "fri",
            times: [{ from: defaultStartTime, to: defaultEndTime }],
          },
        ]
  );

  useEffect(() => {
    if (onBookingSettingChanged) onBookingSettingChanged(settingTimes);
  }, [settingTimes])

  useEffect(() => {
    if (onBookingSettingChanged) onBookingSettingChanged(settingTimes)
  }, [])

  /**
   * handle on change time setting
   */
  const onTimeChanged = (day, index, x, y, source) => {
    let dayTimes = settingTimes.filter((ele) => {
      if (ele.day === day) {
        ele.times[index][source] = y;
      }
      return ele;
    });

    setSettingTimes(dayTimes);
  };

  /**
   * add new time slot
   */
  const addNewTime = (ele) => {
    const list = [...settingTimes];
    const eleIndex = list.indexOf(ele);
    const times = list[eleIndex]["times"];
    times?.push({ from: defaultStartTime, to: defaultEndTime });
    setSettingTimes(list);
  };

  /**
   * remove time slot
   */
  const removeTime = (parentIndex, childIndex) => {
    const list = [...settingTimes];
    list[parentIndex].times.splice(childIndex, 1);
    setSettingTimes(list);
  };

  return (
    <div className="d-flex flex-column booking-setting">
      {settingTimes.map((element, index) => (
        <div key={index} className="d-flex flex-wrap col-12">
          <div className="col-12 col-md-3 col-lg-2 d-flex flex-column justify-content-start pt-2 align-items-center">
            <div
              style={{ width: "100%" }}
              className="d-flex flex-row justify-content-center p-1 bg-black white"
            >
              {element.day.toUpperCase()}
            </div>
            <a
              style={{ width: "100%" }}
              className="d-flex flex-row justify-content-center p-2 bg-green white small"
              onClick={() => addNewTime(element)}
            >
              Add more time
            </a>
          </div>
          <div className="col-12 col-md-9 col-lg-10">
            <table className="table table-borderless">
              <tbody>
                {element.times.map((ele, i) => (
                  <tr key={i}>
                    <td width="47%">
                      <Time
                        defaultValue={moment(ele.from, format)}
                        onTimeChanged={(x, y) =>
                          onTimeChanged(element.day, i, x, y, "from")
                        }
                      ></Time>
                    </td>
                    <td width="47%">
                      <Time
                        defaultValue={moment(ele.to, format)}
                        onTimeChanged={(x, y) =>
                          onTimeChanged(element.day, i, x, y, "to")
                        }
                      ></Time>
                    </td>
                    <td className="d-flex justify-content-center align-items-center">
                      {element.times.length > 1 && (
                        <a className="red ico__delete" onClick={() => removeTime(index, i)}>
                          <i className="fa fa-trash-o"></i>
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingSetting;
