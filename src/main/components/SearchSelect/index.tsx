import Select from "react-select";
import ISelectOption from "../../interfaces/controllers/ISelectOption";
import "./style.scss";
export interface ISearchSelect {
  options: ISelectOption[];
  onChange: (val: any) => void;
  value?: any;
  defaultValue?: any;
  id?: string;
  readOnly?: boolean;
  selectInputRef?: any;
}

const SearchSelect = (props: ISearchSelect) => {
  const {
    options,
    onChange,
    value,
    id,
    readOnly,
    defaultValue,
    selectInputRef,
  } = props;
  const brandColor = "#8fc4f2";
  const costumStyles = {
    control: (base: any, state: any) => ({
      ...base,
      boxShadow: state.isFocused ? 0 : 0,
      borderColor: state.isFocused ? brandColor : base.borderColor,
      "&:hover": {
        borderColor: state.isFocused ? brandColor : base.borderColor,
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
      isDisabled={readOnly}
      styles={costumStyles}
      value={value}
      defaultValue={defaultValue}
      options={options}
      onChange={onChange}
      ref={selectInputRef}
      menuPlacement="auto"
    />
  );
};
export default SearchSelect;
