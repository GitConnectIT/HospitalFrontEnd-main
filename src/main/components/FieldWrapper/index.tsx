import { FormGroup, Label } from "reactstrap";
import formValidationManager from "../../utils/formValidationManager";

export interface IFieldWraperProps {
  label: string;
  error?: any;
  children: any;
}

const FieldWrapper = (props: IFieldWraperProps) => {
  const { label, error, children } = props;

  return (
    <FormGroup
      className={` ${label === "Data" || label === "Ora" ? "w-50" : "w-100"} ${
        label === "Ora" ? "ps-3 ps-lg-0" : ""
      }`}
    >
      <Label for={children.props.name} className="text-dark mb-1">
        {label}
      </Label>
      {children}
      {error && (
        <div className="ps-1 text-danger">
          {formValidationManager.extractError(error)}
        </div>
      )}
    </FormGroup>
  );
};

export default FieldWrapper;
