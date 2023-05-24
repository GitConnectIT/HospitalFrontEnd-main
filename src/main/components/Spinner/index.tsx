import React from "react";
import { Spinner as PageSpinner } from "reactstrap";
import "./style.scss";
interface ISpinner {
  color?: string;
}
const Spinner = (props: ISpinner) => {
  const { color } = props;
  return (
    <div className="spinner-container bg-white bg-opacity-50">
      <PageSpinner type="grow" color={color} />
    </div>
  );
};
export default Spinner;
