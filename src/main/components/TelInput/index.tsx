import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput from "react-phone-input-2";
import "./style.scss";
interface ITelInput {
  value: string;
  onChange: (value: string) => void;
  error?: any;
  id?: string;
}
const TelInput = (props: ITelInput) => {
  const { value, onChange, error, id } = props;

  return (
    <PhoneInput
      inputProps={{
        id: id,
      }}
      inputStyle={{ width: "100%" }}
      enableSearch={false}
      disableSearchIcon={false}
      autocompleteSearch={true}
      //preferredCountries={["it", "al"]}
      disableDropdown={true}
      country={"it"}
      onlyCountries={["it"]}
      placeholder="Phone number"
      value={value}
      onChange={(value, data, event, formattedValue) => {
        console.log("test");
        onChange(
          formattedValue.split(" ")[0] +
            value.slice(formattedValue.split(" ")[0].length - 1)
        );
      }}
      isValid={error === undefined}
    />
  );
};
export default TelInput;
