import { useMemo, useState } from "react";
import {
  Input,
  InputGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Label,
  InputGroupText,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Iconly } from "react-iconly";
import eColorOptions from "../../assets/enums/colors/eColorOptions";
import "./style.scss";
import _ from "lodash";
import ISelectOption from "../../interfaces/controllers/ISelectOption";
export interface ISelectCheckbox {
  error?: any;
  name?: string;
  id?: string;
  value?: any;
  size?: "lg" | "md" | "sm";
  iconName?: string;
  placeholder?: string;
  color?: eColorOptions;
  onChange?: (value: any) => void;
  onIconClick?: () => void;
  onClick?: (value: any) => void;
  onFocus?: (value: any) => void;
  onBlur?: (value: any) => void;
  onKeyUp?: (value: any) => void;
  invalid?: any;
  iconPosition?: "left";
  backgroundColor?: string;
  className?: string;
  iconSource?: "FontAwesome" | "Iconly";
  options?: ISelectOption[];
  multiSelect?: boolean;
  iconlySize?: number | "medium" | "small" | "large" | "xlarge";
  disabled?: boolean;
  addCategoryComponent?: boolean;
}

const SelectCheckbox = (props: ISelectCheckbox) => {
  const {
    error,
    id,
    placeholder,
    iconName,
    size,
    color,
    onChange,
    onIconClick,
    iconPosition,
    backgroundColor,
    className,
    iconSource,
    options,
    value,
    multiSelect,
    disabled,
    addCategoryComponent,
  } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  const handleIconClick = () => {
    if (onIconClick) {
      onIconClick();
    }
  };
  const handleChange = (val: any) => {
    //if only one option is allowed to be selected
    if (multiSelect === false) {
      setDropdownOpen(false);
      if (onChange) {
        onChange(val);
      }
    } else {
      const currentValues = [...value];
      const valueCheckedIndex = currentValues.findIndex((x) => x === val);
      if (valueCheckedIndex !== -1) {
        currentValues.splice(valueCheckedIndex, 1);
        onChange(currentValues);
      } else {
        currentValues.push(val);
        onChange(currentValues);
      }
    }
  };
  const memoPlaceHolder = useMemo(() => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return (
        <span style={{ color: "#9e9595" }} className="mx-2">
          {placeholder}
        </span>
      );
    } else {
      if (multiSelect === false) {
        const foundedOption = options.find((opt: any) => opt.value === value);
        if (foundedOption) {
          return <span className="ms-2 text-black">{foundedOption.label}</span>;
        }
        return "";
      } else {
        const currentValues = [...value];
        const labels = currentValues.map((x) => {
          const label = options.find((opt: any) => opt.value === x);
          return label.label;
        });
        return (
          <span
            //TODO: check for 100 px
            style={{ maxWidth: "100px" }}
            className="ms-2 text-black text-truncate"
          >
            {labels.length} selezionato
          </span>
        );
      }
    }
  }, [value, options]);
  const renderValue = (fuoriOrario: boolean, occupato: boolean) => {
    if (fuoriOrario && occupato) {
      return "Fuori Orario";
    }
    if (fuoriOrario) {
      return "Fuori Orario";
    }
    if (occupato) {
      return "Occupato";
    }
  };
  return (
    <InputGroup
      className={`${
        error !== undefined ? "is-invalid" : "border-0"
      } form-control ${
        iconPosition === "left" ? "" : "flex-row-reverse"
      } ${backgroundColor} ${className} py-2`}
      size={size}
      style={disabled ? { opacity: "0.65" } : null}
    >
      <Dropdown isOpen={dropdownOpen} toggle={toggle} disabled={disabled}>
        <InputGroupText
          style={{ background: "unset", border: "unset", padding: "0 0" }}
          id={id + "icon"}
          className="w-100"
        >
          <DropdownToggle
            className={`border-0 w-100 p-0 d-flex justify-content-between w-100 text-black ${backgroundColor}`}
            disabled={disabled}
            style={{ zIndex: "0" }}
          >
            <div className="d-flex align-items-center" role="button">
              {iconSource === "Iconly" ? (
                <span className={`text-${color}`}>
                  ICON
                  {/* <Iconly name={iconName} size={20} /> */}
                </span>
              ) : (
                <span>
                  <FontAwesomeIcon
                    style={{ marginRight: "5px" }}
                    id={id + "icon"}
                    icon={iconName as any}
                    className={`text-${color}`}
                  />
                </span>
              )}
              {memoPlaceHolder}
            </div>
            {!addCategoryComponent ? (
              <span className="text-primary">
                <FontAwesomeIcon
                  icon={"fa-solid fa-chevron-down" as any}
                  onClick={handleIconClick}
                />
              </span>
            ) : (
              <span
                className="text-primary"
                onClick={(e: any) => {
                  e.stopPropagation();
                  handleIconClick();
                }}
              >
                {/* <Iconly name="Edit" size={20} /> */}
                ICON
              </span>
            )}
          </DropdownToggle>
        </InputGroupText>
        <DropdownMenu
          style={{
            borderRadius: "10px",
            overflowY: `${options.length > 6 ? "scroll" : "hidden"}`,
            //overflowY: "scroll",
            width: "100%",
            maxHeight: "200px",
            minWidth: "11.5rem",
            //padding: "0.5rem 0.5rem 0.5rem 1rem",
          }}
          className={`${options.length > 6 ? "list" : ""}  bg-white`}
          //className="list bg-white"
        >
          {options.length !== 0 ? (
            options.map((itemData: ISelectOption, index: any) => {
              const uniqueId = _.uniqueId("unique");
              return (
                <div key={index}>
                  <Label
                    htmlFor={`${itemData.value}${uniqueId}`}
                    className="mb-0 gap-2 w-100 cursor-pointer fs-6 px-3 py-1 d-flex align-items-center text-black"
                  >
                    <div>
                      <Input
                        className="mt-0 cursor-pointer"
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          overflow: "hidden",
                        }}
                        invalid={error}
                        checked={
                          multiSelect
                            ? value?.some((x: any) => x === itemData.value)
                            : itemData.value === value
                        }
                        value={itemData.value}
                        id={`${itemData.value}${uniqueId}`}
                        type="checkbox"
                        onChange={() => handleChange(itemData.value)}
                        disabled={disabled}
                      />
                    </div>
                    <span className="text-truncate text-black">
                      {itemData.label}
                    </span>
                    {(itemData.hasOwnProperty("fuoriOrario") ||
                      itemData.hasOwnProperty("occupato")) && (
                      <span className="ms-auto fs-7 text-muted text-truncate">
                        {/* {renderValue(itemData.fuoriOrario, itemData.occupato)}  */}
                        VALUE
                      </span>
                    )}
                  </Label>
                </div>
              );
            })
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault();
              }}
              style={{ borderRadius: "unset", cursor: "auto" }}
              className="text-primary w-100 bg-light border-0"
            >
              Asnje opsion i gjetur
            </Button>
          )}
        </DropdownMenu>
      </Dropdown>
    </InputGroup>
  );
};

export default SelectCheckbox;
