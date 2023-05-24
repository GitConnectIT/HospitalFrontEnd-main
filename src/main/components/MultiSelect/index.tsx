import { useEffect, useState } from "react";
import Select from "react-select";
import ISelectOption from "../../interfaces/controllers/ISelectOption";
import "./style.scss";

export interface IMultiSelectProps {
  totalOptions: ISelectOption[];
  onChange: (val: any) => void;
  value?: any;
  defaultValue?: any;
  id?: string;
  readOnly?: boolean;
  selectInputRef?: any;
  optionsRendered?: any[];
  isMulti?: boolean;
  error?: any;
}

const MultiSelect = (props: IMultiSelectProps) => {
  const {
    onChange,
    value,
    id,
    readOnly,
    defaultValue,
    selectInputRef,
    totalOptions,
    optionsRendered,
    isMulti,
    error,
  } = props;

  const getSameValues = (array1: any, array2: any) => {
    return array1.filter((object1: any) => {
      return array2.some((object2: any) => {
        return object1.value === object2.id;
      });
    });
  };

  useEffect(() => {
    getSameValues(totalOptions, optionsRendered);
  }, [optionsRendered]);

  const [selected, setSelected] = useState(
    getSameValues(totalOptions, optionsRendered)
  );

  const brandColor = "#8fc4f2";

  const costumStyles = {
    control: (base: any, state: any) => ({
      ...base,
      boxShadow: state.isFocused ? 0 : 0,
      borderColor: state.isFocused
        ? brandColor
        : selected.length == 0
        ? "red"
        : base.borederColor,
      "&:hover": {
        borderColor: state.isFocused
          ? brandColor
          : selected.length == 0
          ? "red"
          : base.borederColor,
        outline: 0,
        backgroundColor: "initial",
        boxShadow: "0 0 0 0.2rem transparent",
      },
    }),
    menu: (base: any) => ({ ...base, zIndex: 9999 }),
    singleValue: (base: any) => ({
      ...base,
      color: "#67757c",
    }),
    option: (base: any) => ({
      ...base,
      padding: 5,
    }),
  };

  return (
    <Select
      inputId={id}
      ref={selectInputRef}
      menuPlacement="auto"
      value={isMulti == false ? value : selected}
      closeMenuOnSelect={false}
      onChange={(event: any) => {
        setSelected(event);
        onChange(event);
      }}
      styles={costumStyles}
      isMulti={isMulti}
      options={totalOptions}
    />
  );
};
export default MultiSelect;
