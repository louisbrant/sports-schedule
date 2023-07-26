import { TimePicker } from "antd";

const Time = ({ onTimeChanged, defaultValue, minStep = 30, ...rest }) => {
  function onChange(time, timeString) {
    if (onTimeChanged) onTimeChanged(time, timeString);
  }

  return (
    <TimePicker
      {...rest}
      defaultValue={defaultValue}
      className="form-control"
      format="HH:mm"
      onChange={onChange}
      minuteStep={minStep}
    />
  );
};

export default Time;
