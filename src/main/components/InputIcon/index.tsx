import "./style.scss";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import eColorOptions from "../../assets/enums/colors/eColorOptions";
// import { Iconly } from "react-iconly";
// import useDeviceDetect from "../../hooks/useDeviceDetect";

export interface IInputIcon {
  error?: any;
  type: string;
  name?: string;
  id?: string;
  value?: string;
  size?: "lg" | "md" | "sm";
  iconName: string;
  placeholder?: string;
  border?: boolean;
  color?: eColorOptions | string;
  onInputChange?: (value: any) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onIconClick?: () => void;
  onClick?: (value: any) => void;
  onFocus?: (value: any) => void;
  onBlur?: (value: any) => void;
  onKeyUp?: (value: any) => void;
  invalid?: any;
  iconPosition?: "left" | "right";
  backgroundColor?: string;
  className?: string;
  iconSource?: "FontAwesome" | "Iconly";
  iconlySize?: number | "small" | "large" | "medium" | "xlarge";
  disabled?: boolean;
  minLength?: any;
  innerRef?: any;
  maxLength?: any;
  secondIcon?: string;
  onSaveIcon?: () => void;
  iconSize?: any;
  inputClassName?: string;
}
const InputIcon = (props: IInputIcon) => {
  const {
    error,
    onFocus,
    onKeyUp,
    type,
    name,
    id,
    value,
    placeholder,
    iconName,
    onBlur,
    size,
    color,
    onClick,
    onChange,
    onInputChange,
    onIconClick,
    invalid,
    iconPosition,
    backgroundColor,
    className,
    iconSource,
    disabled,
    minLength,
    innerRef,
    maxLength,
    secondIcon,
    onSaveIcon,
    iconSize,
    inputClassName,
  } = props;
  // const { isMobile } = useDeviceDetect();

  const handleIconClick = () => {
    if (onIconClick) {
      onIconClick();
    }
  };
  const handleChange = (e: any) => {
    if (onChange) {
      onChange(e);
    }
    if (onInputChange) {
      onInputChange(e.target.value);
    }
  };
  return (
    <InputGroup
      className={`${error !== undefined && "is-invalid"} form-control ${
        iconPosition === "left" ? "" : "flex-row-reverse"
      } 
       ${className} py-2`}
      size={size}
      style={disabled ? { opacity: "0.65" } : null}
    >
      <InputGroupText
        style={{ background: "unset", border: "unset", padding: "0 0" }}
        className="input-icon"
      >
        {iconSource === "Iconly" ? (
          <>
            <span className={`text-${color}`} onClick={() => handleIconClick()}>
              {/* <Iconly name={iconName} size={20} />  */}
              SOMETHING
            </span>
          </>
        ) : (
          <>
            {secondIcon && (
              <span
                className={`text-primary me-2`}
                onClick={() => onSaveIcon()}
              >
                {/* <Iconly name={secondIcon} size={iconSize} /> */}
                SDAWDAW D
              </span>
            )}
            {iconName && (
              <FontAwesomeIcon
                id={id + "icon"}
                icon={iconName as any}
                size={iconSize}
                className={`text-${color}`}
                onClick={() => handleIconClick()}
              />
            )}
          </>
        )}
      </InputGroupText>
      <Input
        innerRef={innerRef}
        type={`${type}` as any}
        name={name}
        maxLength={maxLength}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        id={id}
        disabled={disabled}
        onFocus={onFocus}
        color="danger"
        onClick={onClick}
        value={value === null ? "" : value}
        onBlur={onBlur}
        className={`costumize-input-icon ${inputClassName} ${
          iconPosition === "left" ? "ms-2" : ""
        }  text-black`}
        onChange={handleChange}
        invalid={invalid}
        minLength={minLength}
      />
      {iconName === "Wallet" && (
        <InputGroupText
          style={{
            background: "unset",
            border: "unset",
            padding: "0 0",
          }}
          className="input-icon pe-none"
          onClick={() => handleIconClick()}
        >
          <FontAwesomeIcon
            id={id + "icon"}
            icon={"fa-euro-sign" as any}
            className={`text-${color}`}
          />
        </InputGroupText>
      )}
    </InputGroup>
  );
};
export default InputIcon;
