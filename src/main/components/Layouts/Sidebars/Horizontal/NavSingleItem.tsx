import { NavLink, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  title: string;
  className: string;
  route: string;
  icon: string;
}

const NavSingleItem = ({ title, className, route, icon }: Props) => {
  return (
    <NavItem className={className}>
      <NavLink tag={Link} to={route}>
        <span className="sidebarIcon d-flex align-items-center"></span>
        <div className="d-flex flex-grow-1 align-items-center gap-2">
          <span>
            <FontAwesomeIcon icon={`${icon}` as any} />
          </span>
          <span>{title}</span>
        </div>
      </NavLink>
    </NavItem>
  );
};
NavSingleItem.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.node,
  toggle: PropTypes.func,
  className: PropTypes.string,
  suffix: PropTypes.any,
  suffixColor: PropTypes.string,
};

export default NavSingleItem;
