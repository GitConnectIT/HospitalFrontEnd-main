import DatePicker from "react-datetime";
import moment from "moment";
import "moment/locale/it";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, InputGroup } from "reactstrap";
import "./style.scss";
import { useRef } from "react";

interface IDateProps {
  timeformat?: any;
  blockeddates?: string[];
  value: string;
  onChange: (value: any) => void;
  error?: any;
  id?: string;
  offDays?: number[];
}

const DateInput = (props: IDateProps) => {
  const {
    blockeddates,
    onChange,
    timeformat = false,
    value,
    error,
    id,
    offDays,
  } = props;
  // const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef(null);
  // useEffect(() => {
  //   document.addEventListener("click", handleBodyClick);
  //   return () => {
  //     document.removeEventListener("click", handleBodyClick);
  //   };
  // }, []);

  let disableCustomDt;
  if (blockeddates || offDays?.length > 0) {
    disableCustomDt = (current: any) => {
      var yesterday = moment().subtract(1, "day");
      return (
        !blockeddates.includes(current.format("DD/MM/YYYY")) &&
        current.isAfter(yesterday) &&
        !offDays.includes(current.day())
      );
    };
  }
  // const handleBodyClick = (e: MouseEvent) => {
  //   let result = datePickerRef?.current?.contains(e.target);
  //   if (!result) {
  //     setIsOpen(false);
  //   }
  // };

  // const handleOpenDateTime = () => {
  //   setIsOpen(!isOpen);
  // };

  // const scrollToNearest = (ref: any, position?: string) => {
  //   console.log(ref);
  //   if (ref)
  //     ref?.current?.scrollIntoView({
  //       behavior: "smooth",
  //       inline: position,
  //       block: "end",
  //     });
  // };

  const renderInput = (
    props: any,
    openCalendar: Function,
    closeCalendar: Function
  ) => {
    return (
      <>
        <InputGroup>
          <Input {...props}></Input>
          <FontAwesomeIcon
            className="px-1 my-auto i-icon cursor-pointer"
            icon={"fa-regular fa-calendar" as any}
            size="lg"
            onClick={() => {
              let last = datePickerRef?.current?.state.open;
              if (!last) {
                openCalendar();
              } else {
                closeCalendar();
              }
            }}
          />
        </InputGroup>
      </>
    );
  };
  return (
    <div>
      <InputGroup
        className={`form-control justify-content-between flex-nowrap ${
          error ? "border border-danger" : ""
        } `}
      >
        <DatePicker
          ref={datePickerRef}
          dateFormat={"DD/MM/YYYY"}
          locale="it"
          onChange={(date: any) => {
            const dateString = moment(date).toISOString(true);
            onChange(dateString);
            // setIsOpen(false);
          }}
          renderInput={renderInput}
          inputProps={{
            style: {
              border: "none",
              padding: 0,
            },
            id: id,
            placeholder: "DD/MM/YYYY",
            // onClick: () => {
            //   setIsOpen(!isOpen);
            // },
            inputMode: "none",
            onKeyDown: (e: any) => {
              e.preventDefault();
            },
          }}
          closeOnSelect={true}
          closeOnClickOutside={true}
          timeFormat={timeformat}
          value={new Date(value)}
          isValidDate={disableCustomDt}
          // open={isOpen}
        />
      </InputGroup>
    </div>
  );
};

export default DateInput;
