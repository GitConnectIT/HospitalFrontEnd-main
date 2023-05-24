import React from "react";
import { useDispatch } from "react-redux";
import { NavItem } from "reactstrap";
import PropTypes from "prop-types";
import { ToggleInnerRightPart } from "../../../../main/store/stores/customizer/customizer.store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CompanyListItem = ({
  onContactClick,
  onDeleteClick,
  handleEdit,
  id,
  name,
  active,
}: any) => {
  const dispatch = useDispatch();
  return (
    <NavItem
      onClick={onContactClick}
      className={`w-100 cursor-pointer m-2 ${
        active === id ? "bg-light rounded" : ""
      }`}
    >
      <div
        className="d-flex align-items-center p-3 mb-1"
        onClick={() => dispatch(ToggleInnerRightPart())}
      >
        <div className="mx-2 flex-grow-1">
          <h5 className="mb-0 text-truncate" style={{ width: "140px" }}>
            {name} &nbsp;
          </h5>
        </div>
        <div className="d-flex flex-shrink-0" style={{ gap: "1rem" }}>
          <FontAwesomeIcon
            className="px-1 my-auto i-icon cursor-pointer"
            icon={"fa-solid fa-pen-to-square" as any}
            size="lg"
            color="primary"
            onClick={handleEdit}
          />

          <FontAwesomeIcon
            className="px-1 my-auto i-icon cursor-pointer"
            icon={"fa-regular fa-trash-can" as any}
            size="lg"
            color="red"
            onClick={onDeleteClick}
          />
        </div>
      </div>
    </NavItem>
  );
};

CompanyListItem.propTypes = {
  name: PropTypes.string,
  starred: PropTypes.bool,
  id: PropTypes.number,
  active: PropTypes.any,
  handleEdit: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onContactClick: PropTypes.func,
};

export default CompanyListItem;
