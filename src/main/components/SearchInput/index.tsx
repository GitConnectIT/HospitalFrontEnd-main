import { useState } from "react";
import "./style.scss";
import InputIcon from "../InputIcon";
import eColorOptions from "../../assets/enums/colors/eColorOptions";
import ReactDOMServer from "react-dom/server";

interface ISearchInputProps {
  size?: string;
  color?: eColorOptions | string;
  placeholder?: string;
  onSearch?: (value: string) => void;
  iconPosition?: "left" | "right";
  className?: any;
  onChange?: (value: string) => void;
  value?: string;
  backgroundColor?: string;
}

const SearchInput = (props: ISearchInputProps) => {
  const {
    size,
    onSearch,
    iconPosition,
    className,
    onChange,
    value,
    backgroundColor,
    color,
  } = props;
  const [srchText, setSearchTxt] = useState("");
  const handleOnKeyUp = (e: any) => {
    if (e.key === "Enter") {
      onSearch(e.target.value);
    }
  };
  return (
    <InputIcon
      className={className}
      onInputChange={(val) => {
        onChange(val);
        setSearchTxt(val);
      }}
      onIconClick={() => onSearch(srchText)}
      type="search"
      onKeyUp={handleOnKeyUp}
      iconName="fa-solid fa-magnifying-glass"
      size={size as any}
      color={color}
      placeholder="Search"
      iconPosition={iconPosition}
      value={value}
      backgroundColor={backgroundColor}
    />
  );
};
export default SearchInput;
