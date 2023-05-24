import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Input, InputGroup } from "reactstrap";
import "./index.scss";
interface IFileInputProps {
  min?: string;
  max?: string;
  value: any;
  onChange: (value: any) => void;
  error: any;
}

const TimeInput = (props: IFileInputProps) => {
  const { min, max, value, onChange, error } = props;
  const [isOpen, setIsOpen] = useState(false);
  const handleTimeChange = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <>
      <InputGroup onClick={() => setIsOpen(!isOpen)}>
        <div className="inputTime">
          <Input
            className="form-control"
            onChange={handleTimeChange}
            invalid={error !== undefined}
            value={value}
            type="time"
            min={min}
            max={max}
          />
          <div className={error ? "iconInputTimeError" : "iconInputTime"}>
            <FontAwesomeIcon icon={"fa-regular fa-clock" as any} />
          </div>
        </div>
      </InputGroup>
    </>
  );
};

export default TimeInput;
