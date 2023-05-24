import { NavLink, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useDispatch } from "react-redux";
// import { ToggleMobileSidebar } from "../../../../store/stores/customizer/customizer.store";
// import useDeviceDetect from "../../../../hooks/useDeviceDetect";

interface Props {
  to: string;
  title: string;
  className: string;
  suffix: string;
  icon: string;
  suffixColor: string;
  onClick?: () => void;
}
const NavItemContainer = ({
  to,
  title,
  icon,
  className,
  suffix,
  suffixColor,
  onClick,
}: Props) => {
  // const dispatch = useDispatch();
  // const { isMobile } = useDeviceDetect();
  return (
    <NavItem
      className={className}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <NavLink
        // onClick={() => {
        //   isMobile && dispatch(ToggleMobileSidebar());
        // }}
        tag={Link}
        to={to}
        className="gap-3"
      >
        <span className="sidebarIcon d-flex align-items-center">
          <FontAwesomeIcon
            style={{ fontSize: "1.4rem" }}
            icon={`${icon}` as any}
          />
        </span>
        <span className="hide-mini w-100">
          <div className="d-flex align-items-center">
            <span>{title}</span>
            <span className={`badge ms-auto ${suffixColor}`}>{suffix}</span>
          </div>
        </span>
      </NavLink>
    </NavItem>
  );
};

NavItemContainer.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.node,
  toggle: PropTypes.func,
  className: PropTypes.string,
  suffix: PropTypes.any,
  suffixColor: PropTypes.string,
};

export default NavItemContainer;
