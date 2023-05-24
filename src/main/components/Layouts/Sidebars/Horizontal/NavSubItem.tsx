import React from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  title: string;
  items?: {
    id: number;
    title: string;
    route: string;
    icon: string;
    collapisble?: boolean;
  }[];
  suffix: string;
  activeBck: string;
  isUrl: boolean;
  icon: string;
}
const NavSubItem = ({ title, items, suffix, activeBck, icon }: Props) => {
  const location = useLocation();

  return (
    <NavItem>
      <NavLink>
        <span className="sidebarIcon d-flex align-items-center"></span>
        <div className="d-flex flex-grow-1 align-items-center gap-2">
          <span>
            <FontAwesomeIcon icon={`${icon}` as any} />
          </span>
          <span>{title}</span>
          {suffix ? (
            <span className={`badge fs-6 fw bold rounded bg-primary`}>
              {suffix}
            </span>
          ) : (
            ""
          )}
        </div>
      </NavLink>
      <Nav vertical className={`firstDD shadow-lg w-75 bg-${activeBck}`}>
        {items.map((item) => (
          <NavItem
            key={item.title}
            className={`${
              location.pathname === item.route ? "activeLink" : ""
            }`}
          >
            <NavLink tag={Link} to={item.route}>
              <span className="sidebarIcon"></span>
              <span className="">
                <span>{item.title}</span>
              </span>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </NavItem>
  );
};

NavSubItem.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.node,
  items: PropTypes.array,
  suffix: PropTypes.any,
  activeBck: PropTypes.string,
  suffixColor: PropTypes.string,
  ddType: PropTypes.string,
};
export default NavSubItem;
