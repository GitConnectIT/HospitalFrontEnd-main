import { Input } from "reactstrap";
import { useEffect } from "react";
import ISelectOption from "../../interfaces/controllers/ISelectOption";
import PropertyManager from "../../utils/propertyManager";

interface ISelectProps {
  value?: any;
  options: ISelectOption[];
  error?: any;
  autoResolve?: boolean;
  onChange: (value: any) => void;
}

const Select = (props: ISelectProps) => {
  const {
    value,
    options,
    error,
    autoResolve: autoResolveProp,
    onChange,
  } = props;
  const autoResolve = PropertyManager.getValueOrDefault(autoResolveProp, true);
  useEffect(() => {
    if (!value && options && options.length > 0 && autoResolve) {
      onChange(options[0].value);
    }
  }, [options]);

  return (
    <Input
      type="select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      invalid={error !== undefined}
    >
      {options.map((option) => (
        <option key={option.value} defaultValue={value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Input>
  );
};

export default Select;
