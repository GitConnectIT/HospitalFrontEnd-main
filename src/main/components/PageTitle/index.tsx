import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

interface IPageTitle {
  children: React.ReactNode;
  backIcon?: boolean;
}
const PageTitle = (props: IPageTitle) => {
  const navigate = useNavigate();
  const { children, backIcon } = props;

  const handleBackButton = () => {
    navigate(-1);
  };
  return (
    <div
      className={`p-2 d-flex ${
        backIcon ? "justify-content-between" : "justify-content-center"
      } align-items-center`}
    >
      {backIcon && (
        <>
          <Button className="py-1" color="primary" onClick={handleBackButton}>
            <FontAwesomeIcon
              className="me-2"
              icon={"fa-solid fa-arrow-left" as any}
            />
            Back
          </Button>
        </>
      )}
      <h4 className={`m-0`}>{children}</h4>
      <div className="right"></div>
    </div>
  );
};
export default PageTitle;
