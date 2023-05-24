import { Collapse, NavItem, NavLink } from "reactstrap";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import { useEffect } from "react";
interface Props {
  title: string;
  id?: number;
  expand?: boolean;
  setExpand?: (id: number) => void;
  items: {
    title: string;
    route: string;
    icon: string;
    id?: number;
    collapisble?: boolean;
  }[];
  icon: string;
  isUrl: boolean;
  suffixColor: string;
  suffix: string;
}
const NavSubMenu = ({
  title,
  items,
  icon,
  isUrl,
  suffixColor,
  suffix,
  id,
  expand,
  setExpand,
}: Props) => {
  const location = useLocation();
  const getActive = document.getElementsByClassName("activeLink");

  const toggle = () => {
    if (expand) {
      setExpand(null);
    } else {
      setExpand(id);
    }
  };
  useEffect(() => {
    if (isUrl) {
      setExpand(id);
    }
  }, []);

  return (
    <NavItem
      // onClick={() => {}}
      className={expand && getActive ? "activeParent" : ""}
    >
      <NavLink
        className="cursor-pointer gap-3"
        onClick={() => {
          toggle();
        }}
      >
        <span className="sidebarIcon d-flex align-items-center ">
          <FontAwesomeIcon
            style={{ fontSize: "1.4rem" }}
            icon={`${icon}` as any}
          />
        </span>
        <span className="hide-mini w-100">
          <div className="d-flex align-items-center">
            <span className={`d-block ${expand ? "" : "truncate"}`}>
              {title}
            </span>
            <span className="ms-auto">
              <span className={`badge me-2 ${suffixColor}`}>{suffix}</span>
              <FontAwesomeIcon
                icon={
                  `${
                    expand ? "fa-solid fa-chevron-down" : "fa-chevron-right"
                  }` as any
                }
                size="xs"
              />
            </span>
          </div>
        </span>
      </NavLink>

      <Collapse isOpen={expand} navbar tag="ul" className="subMenu">
        {items.map((item) => (
          <NavItem
            key={item.title}
            className={`hide-mini ms-3 ${
              location.pathname === item.route ? "activeLink" : ""
            }`}
          >
            <NavLink tag={Link} to={item.route} className="gap-3">
              <FontAwesomeIcon size="lg" icon={`${item.icon}` as any} />
              <span className="hide-mini text-truncate">
                <span>{item.title}</span>
              </span>
            </NavLink>
          </NavItem>
        ))}
      </Collapse>
    </NavItem>
  );
};
NavSubMenu.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  icon: PropTypes.node,
  isUrl: PropTypes.bool,
  suffix: PropTypes.any,
  suffixColor: PropTypes.string,
};
export default NavSubMenu;
