import { InputGroup } from "reactstrap";
// import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import "./style.scss";
import { useEffect, useState } from "react";
import moment from "moment";

interface IDateTimeInputProps {
  minDate?: any;
  value: any;
  onChange: (value: any) => void;
  error?: any;
}

const DateTimeInput = (props: IDateTimeInputProps) => {
  const { minDate, value, onChange, error } = props;

  const [open, setOpen] = useState(false);

  const removeDecoration = () => {
    const abbr = document.getElementsByTagName("abbr");
    for (var i = 0; i < abbr.length; i++) {
      abbr[i].style.textDecoration = "unset";
    }
  };

  useEffect(() => {
    if (open) removeDecoration();
  }, []);

  removeDecoration();

  return (
    <div>
      <InputGroup
        className={`form-control justify-content-between flex-nowrap ${
          error ? "border border-danger" : ""
        } `}
      >
        <DateTimePicker
          format={"dd-MM-y h:mm a"}
          minDate={new Date()}
          className="w-100 border-0"
          onChange={onChange}
          disableClock={true}
          onCalendarOpen={() => setOpen(true)}
          value={value}
          //   closeOnSelect={true}
        />
      </InputGroup>
    </div>
  );
};

export default DateTimeInput;
